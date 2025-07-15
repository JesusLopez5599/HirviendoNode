#!/bin/bash

echo "🔥 Iniciando Hirviendo - Sistema de Registro y Login"
echo "=================================================="

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instálalo junto con Node.js"
    exit 1
fi

# Verificar si existe package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json no encontrado. Asegúrate de estar en el directorio correcto."
    exit 1
fi

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar si existe el archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado. Asegúrate de configurarlo con tus datos."
    echo "   Revisa el archivo INSTRUCCIONES.md para más información."
    exit 1
fi

# Verificar si MongoDB está disponible
echo "🔍 Verificando conexión a MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB no está instalado localmente."
    echo "   Asegúrate de usar MongoDB Atlas o instalar MongoDB localmente."
fi

echo "🚀 Iniciando servidor..."
echo "   Servidor disponible en: http://localhost:4001"
echo "   Presiona Ctrl+C para detener el servidor"
echo ""

# Iniciar el servidor
npm run dev