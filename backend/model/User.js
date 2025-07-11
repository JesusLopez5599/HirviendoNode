import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique:true },       // Nombre de usuario
  email: { type: String, required: true, unique: true },      // Correo
  dni: { type: String },                        // DNI (opcional, pero puedes poner "required: true")
  telefono: { type: String },                   // Teléfono (opcional también)
  password: { type: String, required: true },   // Contraseña encriptada
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  categoria: {type: String, required: true},  //tipo de trabajo
  subcategoria: {type: String, required:true},  // lugar
  rol:{type: String, required:true}, // rol del trabajador
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;