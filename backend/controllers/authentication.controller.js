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

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ status: "Error", message: "Token no proporcionado" });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).send({ status: "Error", message: "Token inválido" });
  }
};  

async function verifyAdmin(req, res) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({ status: "Error", message: "Token no proporcionado" });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ user: decoded.user });
    if (!user || user.rol !== 'admin') {
      return res.status(403).send({ status: "Error", message: "Acceso denegado" });
    }
    res.json({ status:"ok", message: "Admin verificado" });
  } catch (error) {
    res.status(401).json({ status: "Error", message: "Token inválido o expirado" });
  }
}

async function getUsers(req, res) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ status: "Error", message: "Token no valido" });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const adminUser = await User.findOne({ user: decoded.user });
    if (!adminUser || adminUser.rol !== 'admin') {
      return res.status(403).json({ status: "Error", message: "Acceso denegado" });
    }
    const users = await User.find({}, {password:0, verificationToken:0});
    res.json({ status: "ok", users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ status: "Error", message: "Error en el servidor" });
  }
} 
// Middleware para verificar si el usuario es admin
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
  let { user, password, email, dni, telefono, categoria, subcategoria, rol } = req.body;
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
  // Validar email
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).send({ status: "Error", message: "Formato de email inválido" });
  }
  // Validar que el usuario no exista
  try {
    const usuarioExistente = await User.findOne({ user, email, dni });
    if (usuarioExistente) {
      return res.status(400).send({ status: "Error", message: "Este usuario, email o dni ya existe" });
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

  
    const verificationLink = `http://localhost:4001/api/auth/verify-email?token=${verificationToken}`;

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
      message: `Usuario ${nuevoUsuario.user} agregado`,
      redirect: "/"
    });
  } catch (error) {
  console.error("❌ Error en registro:", error);
  res.status(500).json({
    status: "Error",
    message: "Error en el servidor",
    detail: error.message,
  });
}
}

// POST /api/auth/reseat-request
async function requestPasswordReset(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 3600000; // 1 hora
  await user.save();

  const link = `http://localhost:4001/reset-password.html?token=${token}`;

  await transporter.sendMail({
    from: `"Recuperación Hirviendo" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Restablece tu contraseña",
    html: `
      <h3>¿Olvidaste tu contraseña?</h3>
      <p>Haz clic aquí para restablecerla:</p>
      <a href="${link}">${link}</a>
    `
  });

  res.json({ message: "Correo enviado con el enlace para restablecer la contraseña" });
}

// POST /api/auth/reset-password
async function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(newPassword, salt);
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();
  res.json({ message: "Contraseña actualizada correctamente" });
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
  verifyJWT,
  verifyAdmin,
  getUsers, 
  requestPasswordReset,  
  resetPassword 
};
