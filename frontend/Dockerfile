# Utilizamos una imagen ligera de Node.js
FROM node:22-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json package-lock.json* ./

# Instalamos las dependencias de forma limpia
RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación para producción (generará la carpeta 'dist')
RUN npm run build

# Instalamos globalmente un servidor ligero estático para servir la aplicación (Single Page Application)
RUN npm install -g serve

# Configuramos variables de entorno (el puerto por defecto de serve es 3000)
ENV NODE_ENV=production
ENV PORT=3000

# Exponemos el puerto
EXPOSE 3000

# Comando para iniciar la aplicación (el flag -s asegura que soporte React Router redirigiendo a index.html)
CMD ["serve", "-s", "dist", "-l", "3000"]
