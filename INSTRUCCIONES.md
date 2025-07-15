# 🔥 Hirviendo - Sistema de Registro y Login

## 📋 Descripción
Sistema completo de registro y autenticación de usuarios con verificación por email, desarrollado con Node.js, Express y MongoDB.

## 🚀 Características
- ✅ Registro de usuarios con campos personalizados
- ✅ Verificación por email
- ✅ Sistema de login seguro con JWT
- ✅ Panel de administración
- ✅ Interfaz web moderna y responsiva
- ✅ Validación de datos
- ✅ Encriptación de contraseñas

## 🛠️ Tecnologías Utilizadas
- **Backend**: Node.js, Express.js
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Email**: Nodemailer con Gmail
- **Seguridad**: bcryptjs para encriptación
- **Frontend**: HTML, CSS, JavaScript vanilla

## 📦 Instalación

### 1. Prerequisitos
Asegúrate de tener instalado:
- Node.js (versión 14 o superior)
- MongoDB (local o MongoDB Atlas)
- Una cuenta de Gmail para el envío de emails

### 2. Instalación de dependencias
```bash
npm install
```

### 3. Configuración del archivo .env
Edita el archivo `.env` con tus datos reales:

```env
# Configuración del servidor
PORT=4001

# Base de datos MongoDB
MONGO_URI=mongodb://localhost:27017/hirviendo_db
# O para MongoDB Atlas:
# MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/hirviendo_db

# JWT Configuration
JWT_SECRET=tu_clave_secreta_jwt_super_segura_aqui_cambiala_por_una_real
JWT_EXPIRATION=7d
JWT_COOKIE_EXPIRES=7

# Email Configuration (Gmail)
EMAIL_FROM=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_gmail

# Environment
NODE_ENV=development
```

### 4. Configuración de Gmail
Para usar Gmail como servidor SMTP:

1. Ve a tu cuenta de Google
2. Activa la verificación en 2 pasos
3. Genera una "contraseña de aplicación" para tu aplicación
4. Usa esta contraseña en `EMAIL_PASS`

### 5. Iniciar MongoDB
Si usas MongoDB local:
```bash
mongod
```

Si usas MongoDB Atlas, asegúrate de tener la URL correcta en `MONGO_URI`.

## 🏃‍♂️ Ejecución

### Modo desarrollo
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4001`

## 📁 Estructura del Proyecto

```
├── backend/
│   ├── controllers/
│   │   └── authentication.controller.js  # Lógica de autenticación
│   ├── model/
│   │   └── User.js                       # Modelo de usuario
│   ├── routes/
│   │   └── authRoutes.js                 # Rutas de autenticación
│   ├── utils/
│   │   └── db.js                         # Configuración de base de datos
│   └── index.js                          # Servidor principal
├── frontend/
│   ├── index.html                        # Página de login/registro
│   └── admin.html                        # Panel de administración
├── .env                                  # Variables de entorno
├── package.json                          # Dependencias
└── README.md                             # Documentación
```

## 🔧 Funcionalidades

### Registro de Usuario
- Formulario completo con validación
- Campos: usuario, email, DNI, teléfono, categoría, subcategoría, rol, contraseña
- Verificación por email obligatoria
- Encriptación de contraseñas

### Login
- Autenticación segura con JWT
- Verificación de estado de cuenta
- Cookies seguras para sesión

### Panel de Administración
- Acceso después del login exitoso
- Estadísticas de usuarios
- Interfaz moderna y responsive

## 🧪 Cómo Probar

### 1. Registrar un nuevo usuario
1. Ve a `http://localhost:4001`
2. Haz clic en "Registrarse"
3. Completa todos los campos requeridos
4. Envía el formulario
5. Revisa tu email para verificar la cuenta

### 2. Verificar email
1. Abre el email recibido
2. Haz clic en el enlace de verificación
3. Tu cuenta quedará verificada

### 3. Iniciar sesión
1. Ve a `http://localhost:4001`
2. Ingresa tu usuario y contraseña
3. Serás redirigido al panel de administración

## 📧 Configuración de Email

### Gmail
1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Activa "Verificación en 2 pasos"
3. Ve a "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Correo"
5. Usa esta contraseña en `EMAIL_PASS`

### Otros proveedores
Puedes configurar otros proveedores de email modificando el objeto `transporter` en `authentication.controller.js`.

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT seguros
- Validación de entrada de datos
- Sanitización de inputs
- Cookies HTTPOnly para sesiones

## 🐛 Troubleshooting

### Error de conexión a MongoDB
```
❌ Error al conectar a MongoDB
```
**Solución**: Verifica que MongoDB esté ejecutándose y que la URI sea correcta.

### Error de email
```
Error al enviar email
```
**Solución**: Verifica las credenciales de Gmail y que hayas generado una contraseña de aplicación.

### Error de JWT
```
Token inválido
```
**Solución**: Verifica que `JWT_SECRET` esté configurado correctamente.

## 📝 Personalización

### Modificar campos del usuario
Edita `backend/model/User.js` para agregar o modificar campos.

### Cambiar plantilla de email
Edita el HTML en `authentication.controller.js` función `register`.

### Modificar estilos
Edita los estilos CSS en `frontend/index.html` y `frontend/admin.html`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisa la sección de troubleshooting
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que el archivo `.env` esté configurado correctamente
4. Revisa los logs del servidor para errores específicos

---

¡Ahora tienes un sistema completo de registro y login funcionando! 🎉