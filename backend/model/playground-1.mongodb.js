// Selecciona la base de datos
use('miBaseDeDatos');

// Insertar un usuario con la estructura de tu modelo User.js
db.usuarios.insertOne({
  user: 'jesuslopez',
  email: 'jesus@example.com',
  dni: '12345678A',
  telefono: '612345678',
  password: 'hashed_password_123',
  verified: false,
  verificationToken: null,
  categoria: 'Electricista',
  subcategoria: 'Madrid',
  rol: 'trabajador',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Consultar todos los usuarios
db.usuarios.find().pretty();

// Actualizar un usuario (ejemplo)
// db.usuarios.updateOne(
//   { user: 'jesuslopez' },
//   { $set: { verified: true, verificationToken: null, updatedAt: new Date() } }
// );

// Eliminar un usuario (ejemplo)
// db.usuarios.deleteOne({ user: 'jesuslopez' });

