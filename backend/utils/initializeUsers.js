import bcryptjs from "bcryptjs";
import User from '../model/User.js';

// Usuarios predeterminados para inicializar la plataforma
const defaultUsers = [
  {
    user: "admin",
    email: "admin@hirviendo.com",
    dni: "12345678",
    telefono: "555-0001",
    password: "admin123",
    verified: true,
    categoria: "Administración",
    subcategoria: "Sistema",
    rol: "administrador"
  },
  {
    user: "supervisor",
    email: "supervisor@hirviendo.com",
    dni: "87654321",
    telefono: "555-0002",
    password: "supervisor123",
    verified: true,
    categoria: "Supervisión",
    subcategoria: "Operaciones",
    rol: "supervisor"
  },
  {
    user: "trabajador1",
    email: "trabajador1@hirviendo.com",
    dni: "11111111",
    telefono: "555-0003",
    password: "trabajador123",
    verified: true,
    categoria: "Construcción",
    subcategoria: "Plomería",
    rol: "trabajador"
  }
];

export const initializeUsers = async () => {
  try {
    console.log("🔄 Inicializando usuarios predeterminados...");
    
    // Verificar si ya existen usuarios en la base de datos
    const existingUsersCount = await User.countDocuments();
    
    if (existingUsersCount > 0) {
      console.log(`✅ Ya existen ${existingUsersCount} usuarios en la base de datos. Omitiendo inicialización.`);
      return;
    }
    
    // Crear usuarios predeterminados
    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ 
        $or: [{ user: userData.user }, { email: userData.email }] 
      });
      
      if (!existingUser) {
        // Encriptar contraseña
        const salt = await bcryptjs.genSalt(5);
        const hashedPassword = await bcryptjs.hash(userData.password, salt);
        
        const newUser = new User({
          ...userData,
          password: hashedPassword
        });
        
        await newUser.save();
        console.log(`✅ Usuario creado: ${userData.user} (${userData.email})`);
      } else {
        console.log(`⚠️ Usuario ${userData.user} ya existe, omitiendo...`);
      }
    }
    
    console.log("🎉 Usuarios predeterminados inicializados correctamente");
    
  } catch (error) {
    console.error("❌ Error al inicializar usuarios predeterminados:", error);
    throw error;
  }
};

// Función para obtener información de los usuarios predeterminados (útil para documentación)
export const getDefaultUsersInfo = () => {
  return defaultUsers.map(user => ({
    usuario: user.user,
    email: user.email,
    rol: user.rol,
    categoria: user.categoria,
    subcategoria: user.subcategoria
  }));
};