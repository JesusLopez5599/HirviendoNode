# Inicialización de Usuarios Predeterminados

## Descripción

El sistema incluye una funcionalidad de inicialización automática que crea usuarios predeterminados cuando la plataforma se inicia por primera vez. Esta funcionalidad solo se ejecuta si la base de datos está vacía (sin usuarios existentes).

## Funcionamiento

### Cuándo se ejecuta
- **Al iniciar el servidor**: La función `initializeUsers()` se ejecuta automáticamente después de conectar a la base de datos.
- **Solo si la base de datos está vacía**: Si ya existen usuarios en la base de datos, la inicialización se omite.

### Ubicación del código
- **Archivo principal**: `backend/utils/initializeUsers.js`
- **Integración**: Se llama desde `backend/index.js` durante el arranque del servidor.

## Usuarios Predeterminados

### 1. Administrador
- **Usuario**: `admin`
- **Email**: `admin@hirviendo.com`
- **Contraseña**: `admin123`
- **Rol**: `administrador`
- **Categoría**: `Administración`
- **Subcategoría**: `Sistema`
- **Estado**: Verificado ✅

### 2. Supervisor
- **Usuario**: `supervisor`
- **Email**: `supervisor@hirviendo.com`
- **Contraseña**: `supervisor123`
- **Rol**: `supervisor`
- **Categoría**: `Supervisión`
- **Subcategoría**: `Operaciones`
- **Estado**: Verificado ✅

### 3. Trabajador
- **Usuario**: `trabajador1`
- **Email**: `trabajador1@hirviendo.com`
- **Contraseña**: `trabajador123`
- **Rol**: `trabajador`
- **Categoría**: `Construcción`
- **Subcategoría**: `Plomería`
- **Estado**: Verificado ✅

## Seguridad

### Contraseñas
- Las contraseñas se encriptan automáticamente usando `bcryptjs` con salt de factor 5.
- **⚠️ IMPORTANTE**: Cambia las contraseñas predeterminadas en producción.

### Verificación
- Todos los usuarios predeterminados se crean con `verified: true` para acceso inmediato.
- No requieren verificación por email.

## Personalización

### Modificar usuarios predeterminados
Para cambiar los usuarios que se crean automáticamente:

1. Edita el array `defaultUsers` en `backend/utils/initializeUsers.js`
2. Asegúrate de incluir todos los campos obligatorios:
   - `user`: Nombre de usuario (único)
   - `email`: Correo electrónico (único)
   - `password`: Contraseña (será encriptada)
   - `categoria`: Categoría de trabajo
   - `subcategoria`: Subcategoría específica
   - `rol`: Rol del usuario
   - `verified`: Estado de verificación
   - `dni`: DNI del usuario
   - `telefono`: Número de teléfono

### Deshabilitar la inicialización
Para deshabilitar la inicialización automática:

1. Comenta la línea `await initializeUsers();` en `backend/index.js`
2. O modifica la función para que siempre retorne sin hacer nada

## Logs del Sistema

Durante el arranque, verás mensajes como:
```
🔄 Inicializando usuarios predeterminados...
✅ Usuario creado: admin (admin@hirviendo.com)
✅ Usuario creado: supervisor (supervisor@hirviendo.com)
✅ Usuario creado: trabajador1 (trabajador1@hirviendo.com)
🎉 Usuarios predeterminados inicializados correctamente
🚀 Aplicación inicializada correctamente
```

Si ya existen usuarios:
```
🔄 Inicializando usuarios predeterminados...
✅ Ya existen 3 usuarios en la base de datos. Omitiendo inicialización.
🚀 Aplicación inicializada correctamente
```

## Recomendaciones

1. **Cambiar credenciales en producción**: Las contraseñas predeterminadas son solo para desarrollo.
2. **Crear roles específicos**: Adapta los roles y categorías según tus necesidades.
3. **Documentar cambios**: Si modificas los usuarios predeterminados, actualiza esta documentación.
4. **Backup de la base de datos**: Siempre haz respaldo antes de cambios importantes.

## Solución de Problemas

### Error: "Usuario ya existe"
- **Causa**: Intentas crear un usuario con username o email duplicado.
- **Solución**: Verifica que no existan usuarios con esos datos o limpia la base de datos.

### Error de conexión a la base de datos
- **Causa**: Problema con la conexión a MongoDB.
- **Solución**: Verifica la variable `MONGO_URI` en tu archivo `.env`.

### Contraseñas no funcionan
- **Causa**: Posible error en el proceso de encriptación.
- **Solución**: Verifica que `bcryptjs` esté instalado y funcionando correctamente.