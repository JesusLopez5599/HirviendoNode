import bcryptjs from "bcryptjs";

import User from "../models/User.js";

const defaultUser = [
    {
        user: "admin",
        email: "pruebahirviendo1@gmail.com",
        dni: "12345678A",
        password: "admin123",
        rol: "admin",
        telefono: "123456789",
        categoria: "administracion",
        subcategoria: "general",
        verified: true,
    }
]

export const initializeUser = async () => {
    try {
        console.log("🔄 Inicializando usuario predeterminado...");
        // Verificar si ya existe un usuario admin
        const existingUsersCount = await User.countDocuments();
        if (existingUsersCount > 0) {
            console.log("🟢 Ya existen ${existingUsersCount} usuarios en la base de datos, no se creará un usuario admin predeterminado.");
            return;
        }        
        for (const userData of defaultUser) {
            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ 
                $or: [{ user: userData.user }, { email: userData.email }]
            });

        if (!existingUser) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(userData.password, salt);
            const newUser = new User({
                ...userData,
                password: hashedPassword
            });
            await newUser.save();
            console.log("🟢 Usuario admin creado correctamente: ${userData.user} (${userData.email}");
        } else {
            console.log("🟢 Usuario ${UserData.user} admin ya existe, no se creará uno nuevo.");
        }
        }

        console.log("🟢 Usuario predeterminado inicializado correctamente.");
    }   catch (error) {
        console.error("🔴 Error al inicializar el usuario:", error);
        throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
    }
};

export const getDefaultUsersInfo = () => {
    return defaultUser.map(user => ({
        user: user.user,
        email: user.email,
        dni: user.dni,
        telefono: user.telefono,
        categoria: user.categoria,
        subcategoria: user.subcategoria,
        rol: user.rol
    }));
}