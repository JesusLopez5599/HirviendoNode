import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://jesuslopezguerrero38:Juan9596.@jesus5599.15meuat.mongodb.net/usuariosDB?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🟢 Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  }
};
export default connectDB;
export { connectDB };  