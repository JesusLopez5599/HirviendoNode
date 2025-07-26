import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/usuariosDB';


export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("🟢 Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    console.log("⚠️  Continuando sin base de datos...");
  }
};
