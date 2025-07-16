# Plataforma Web con MongoDB Atlas

Esta es una plataforma web completa con sistema de registro y login de usuarios, desarrollada con Node.js, Express, MongoDB Atlas y una interfaz web moderna.

## Características

- ✅ Registro de usuarios con validación de campos
- ✅ Sistema de login con JWT
- ✅ Verificación de email obligatoria
- ✅ Panel de administración
- ✅ Interfaz web moderna y responsive
- ✅ Conexión a MongoDB Atlas
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Envío de emails de verificación

## Estructura del Proyecto

```
/
├── backend/
│   ├── controllers/
│   │   └── authentication.controller.js
│   ├── model/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── db.js
│   └── index.js
├── frontend/
│   ├── index.html (registro)
│   ├── login.html
│   ├── admin.html
│   ├── styles.css
│   ├── script.js
│   ├── login.js
│   └── admin.js
├── .env.example
├── .env
├── package.json
└── README.md
```

## Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd registro-y-login-en-vivo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar MongoDB Atlas

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un nuevo cluster
3. Crear un usuario de base de datos
4. Obtener la cadena de conexión

### 4. Configurar variables de entorno

Copiar `.env.example` a `.env` y configurar:

```bash
cp .env.example .env
```

Editar `.env` con tus datos:

```env
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://tu_usuario:tu_contraseña@cluster0.mongodb.net/hirviendo?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=tu_clave_secreta_jwt_muy_larga_y_segura
JWT_EXPIRATION=7d
JWT_COOKIE_EXPIRES=7

# Email Configuration (Gmail)
EMAIL_FROM=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicación

# Server Configuration
PORT=4001
```

### 5. Configurar Gmail para emails

1. Activar autenticación de 2 factores en Gmail
2. Crear contraseña de aplicación
3. Usar la contraseña de aplicación en `EMAIL_PASS`

## Uso

### Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4001`

### Páginas disponibles

- **/** - Página de registro
- **/login.html** - Página de login
- **/admin** - Panel de administración (solo para admins)

### Roles de usuario

- **cliente** - Usuario normal
- **proveedor** - Proveedor de servicios
- **administrador** - Acceso al panel de administración

### Flujo de registro

1. Usuario llena el formulario de registro
2. Se guarda en MongoDB Atlas
3. Se envía email de verificación
4. Usuario hace clic en el enlace de verificación
5. Cuenta se activa
6. Usuario puede hacer login

## API Endpoints

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify-email` - Verificar email
- `GET /api/auth/verify-admin` - Verificar si es admin
- `GET /api/auth/users` - Obtener usuarios (solo admin)

## Esquema de Usuario

```javascript
{
  user: String,        // Nombre de usuario
  email: String,       // Correo electrónico
  dni: String,         // DNI
  telefono: String,    // Teléfono
  password: String,    // Contraseña encriptada
  categoria: String,   // Categoría de trabajo
  subcategoria: String, // Subcategoría
  rol: String,         // Rol del usuario
  verified: Boolean,   // Estado de verificación
  verificationToken: String // Token de verificación
}
```

## Dependencias

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **nodemailer** - Envío de emails
- **cors** - Middleware CORS
- **dotenv** - Variables de entorno
- **cookie-parser** - Manejo de cookies

## Desarrollo

Para desarrollo, usa:

```bash
npm run dev
```

Esto inicia el servidor con `nodemon` para recarga automática.

## Notas Importantes

- La verificación de email es obligatoria para activar la cuenta
- Solo usuarios con rol "administrador" pueden acceder al panel de admin
- Las contraseñas se encriptan con bcrypt
- Los tokens JWT tienen una duración de 7 días por defecto
- Los emails se envían a través de Gmail SMTP

## Troubleshooting

### Error de conexión a MongoDB
- Verificar que la cadena de conexión sea correcta
- Comprobar que la IP esté en la whitelist de MongoDB Atlas
- Verificar usuario y contraseña

### Error de envío de email
- Verificar que Gmail tenga autenticación de 2 factores
- Usar contraseña de aplicación, no la contraseña normal
- Verificar que el EMAIL_FROM y EMAIL_PASS sean correctos

### Error de JWT
- Verificar que JWT_SECRET esté configurado
- Asegurar que la cookie se esté enviando correctamente
