# Instrucciones de Configuración - Plataforma Web con MongoDB Atlas

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- Una cuenta de Gmail
- Una cuenta de MongoDB Atlas

## 🚀 Configuración Paso a Paso

### 1. Configurar MongoDB Atlas

1. **Crear cuenta en MongoDB Atlas**
   - Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea una cuenta gratuita

2. **Crear un nuevo cluster**
   - Selecciona "Build a Database"
   - Elige "M0 Sandbox" (gratuito)
   - Selecciona tu región preferida
   - Haz clic en "Create Cluster"

3. **Crear usuario de base de datos**
   - Ve a "Database Access"
   - Haz clic en "Add New Database User"
   - Elige "Password" como método de autenticación
   - Crea un usuario y contraseña (¡guárdalos!)
   - Asigna el rol "Atlas admin"

4. **Configurar IP whitelist**
   - Ve a "Network Access"
   - Haz clic en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirma

5. **Obtener cadena de conexión**
   - Ve a "Database" > "Connect"
   - Selecciona "Connect your application"
   - Copia la cadena de conexión
   - Reemplaza `<password>` con tu contraseña

### 2. Configurar Gmail para envío de emails

1. **Activar autenticación de 2 factores**
   - Ve a tu cuenta de Google
   - Seguridad > Verificación en dos pasos
   - Actívala

2. **Crear contraseña de aplicación**
   - Ve a Seguridad > Contraseñas de aplicaciones
   - Selecciona "Correo" y "Otros"
   - Genera la contraseña
   - Guarda la contraseña de 16 caracteres

### 3. Configurar variables de entorno

1. **Copiar archivo ejemplo**
   ```bash
   cp .env.example .env
   ```

2. **Editar archivo .env**
   ```env
   # MongoDB Atlas Connection String
   MONGO_URI=mongodb+srv://tu_usuario:tu_contraseña@cluster0.mongodb.net/hirviendo?retryWrites=true&w=majority
   
   # JWT Configuration
   JWT_SECRET=mi_clave_secreta_muy_larga_y_segura_12345
   JWT_EXPIRATION=7d
   JWT_COOKIE_EXPIRES=7
   
   # Email Configuration (Gmail)
   EMAIL_FROM=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña_de_aplicación_16_caracteres
   
   # Server Configuration
   PORT=4001
   ```

### 4. Instalar dependencias e iniciar

```bash
# Instalar dependencias
npm install

# Iniciar servidor en modo desarrollo
npm run dev
```

### 5. Probar la aplicación

1. **Abrir en navegador**
   - Ve a `http://localhost:4001`

2. **Registrar primer usuario**
   - Llena el formulario de registro
   - Usa rol "administrador" para el primer usuario
   - Verifica tu email

3. **Verificar email**
   - Revisa tu bandeja de entrada
   - Haz clic en el enlace de verificación

4. **Hacer login**
   - Ve a `http://localhost:4001/login.html`
   - Inicia sesión con tus credenciales

5. **Acceder al panel de admin**
   - Después del login serás redirigido a `/admin`
   - Haz clic en "Ver Usuarios" para ver todos los usuarios registrados

## 🔧 Resolución de Problemas

### ❌ Error de conexión a MongoDB
```
MongoServerError: bad auth Authentication failed
```
**Solución**: Verifica tu usuario y contraseña en MongoDB Atlas

### ❌ Error de envío de email
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```
**Solución**: Usa la contraseña de aplicación de Gmail, no tu contraseña normal

### ❌ Error de JWT
```
Error: please set JWT_SECRET environment variable
```
**Solución**: Asegúrate de que JWT_SECRET esté configurado en tu archivo .env

### ❌ Error de puerto
```
Error: listen EADDRINUSE: address already in use :::4001
```
**Solución**: Cambia el puerto en el archivo .env o mata el proceso que usa el puerto 4001

## 🎯 Próximos Pasos

1. **Personalizar categorías**: Edita las opciones en `frontend/index.html`
2. **Modificar estilos**: Edita `frontend/styles.css`
3. **Agregar validaciones**: Modifica `backend/controllers/authentication.controller.js`
4. **Configurar dominio**: Cambia `localhost` por tu dominio en producción

## 📝 Notas Adicionales

- El servidor reinicia automáticamente con `nodemon`
- Los emails se envían en tiempo real
- La verificación de email es obligatoria
- Solo los administradores pueden ver todos los usuarios
- Las contraseñas se encriptan automáticamente con bcrypt

## 🔒 Seguridad

- Nunca compartas tu archivo `.env`
- Usa contraseñas fuertes para JWT_SECRET
- En producción, restringe las IPs en MongoDB Atlas
- Usa HTTPS en producción