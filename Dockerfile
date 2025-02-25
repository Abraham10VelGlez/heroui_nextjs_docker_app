# Usa una imagen base ligera que soporte Node.js
FROM node:22-alpine

# Establece una variable de entorno para evitar advertencias
#ENV NODE_ENV=development

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto del código de tu aplicación
COPY . .

# Exponer el puerto en el que se ejecutará tu aplicación
EXPOSE 3000

# Habilitar el polling para detectar cambios en el sistema de archivos
ENV CHOKIDAR_USEPOLLING=true

# Comando por defecto para ejecutar la aplicación en puerto por defecto
#CMD ["yarn", "dev"]
# Comando por defecto para ejecutar la aplicación en puerto sugerido por el usuario
CMD ["yarn", "dev", "-p", "4000"]
