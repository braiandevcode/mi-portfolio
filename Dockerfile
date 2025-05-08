# Etapa 1: Build del proyecto
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY tsconfig*.json ./
COPY index.html ./
COPY src ./src

RUN npm install
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Copia el build generado al directorio que NGINX sirve
COPY --from=builder /app/dist /usr/share/nginx/html

# Elimina archivos de configuración por defecto de NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Agrega tu propia configuración si fuera necesaria
# COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
