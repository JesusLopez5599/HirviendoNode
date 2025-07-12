import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from '../model/User.js';
import crypto from "crypto";

dotenv.config();

// Regex para validar email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para sanitizar entradas
const sanitizeInput = input =>
  typeof input === 'string' ? input.replace(/[\r\n\t]/g, '').trim() : input;
// Configuración del transportador de nodemaile

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM, // Usa EMAIL_FROM como estándar
    pass: process.env.EMAIL_PASS
  }
});

async function login(req, res) {
  const { user, password } = req.body; 

  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    const usuarioDB = await User.findOne({ user });
    if (!usuarioDB) {
      return res.status(400).send({ status: "Error", message: "Usuario no encontrado" });
    }

    if (!usuarioDB.verified) {
      return res.status(401).send({ status: "Error", message: "Cuenta no verificada. Revisa tu correo." });
    }
    
    const loginCorrecto = await bcryptjs.compare(password, usuarioDB.password);
    if (!loginCorrecto) {
      return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
    }

    const token = jsonwebtoken.sign(
      { user: usuarioDB.user },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      path: "/"
    };

    res.cookie("jwt", token, cookieOption);
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
  } catch (error) {
    res.status(500).send({ status: "Error", message: "Error en el servidor" });
  }
}

async function register(req, res) {
  const { user, password, email, dni, telefono, categoria, subcategoria, rol } = req.body;
  // Sanitizar entradas
  user = sanitizeInput(user);
  email = sanitizeInput(email);
  dni = sanitizeInput(dni);
  telefono = sanitizeInput(telefono);
  categoria = sanitizeInput(categoria);
  subcategoria = sanitizeInput(subcategoria);
  rol = sanitizeInput(rol);

  if (!user || !password || !email || !dni || !telefono || !categoria || !subcategoria || !rol) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }
  
  // Validate email format
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).send({ status: "Error", message: "Formato de email inválido" });
  }
  try {
    const usuarioExistente = await User.findOne({ user});
    if (usuarioExistente) {
      return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
    }

    const emailExistente = await User.findOne({ email });
    if (emailExistente) {
      return res.status(400).send({ status: "Error", message: "Este email ya está registrado" });
    }
  
    // Generar token único para verificación
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);

    const nuevoUsuario = new User({
      user,
      email,
      password: hashPassword,
      dni,
      telefono,
      categoria,
      subcategoria,
      rol,
      verificationToken
    });

    await nuevoUsuario.save();
  
    const verificationLink = `http://localhost:4001/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"Tu Plataforma" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verifica tu cuenta",
      html: `
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #e63946;">👋 ¡Bienvenido/a a Hirviendo!</h2>
        <p>Hola ${user},</p>
        <p>Gracias por registrarte en <strong>Hirviendo</strong>, la comunidad donde las ideas hierven y se convierten en acción.</p>

        <p>Antes de comenzar, necesitamos que verifiques tu correo electrónico para activar tu cuenta.</p>

        <p style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}">Verificar cuenta</a>
        </p>
        <p>¡Nos alegra tenerte con nosotros!</p>

        <p style="margin-top: 40px;">— El equipo de <strong>Hirviendo</strong></p>
        <p>Este enlace expirará en 24 horas.</p>
      </body>
      `
    });

    return res.status(201).send({
      status: "ok",
      message: `Usuario ${user} agregado`,
      redirect: "/"
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).send({ status: "Error", message: "Error en el servidor" });
  }
}
// Verificación de cuenta por email
export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const usuario = await User.findOne({ verificationToken: token });

    if (!usuario) {
      return res.status(400).send("Token inválido o expirado.");
    }

    usuario.verified = true;
    usuario.verificationToken = undefined;
    await usuario.save();

    return res.redirect("/"); // o donde quieras redirigir tras la verificación
  } catch (error) {
    console.error("❌ Error en verifyEmail:", error);
    res.status(500).send("Error al verificar el correo.");
  }
}

export const methods = {
  login,
  register,
  //registrarUsuario,
};
