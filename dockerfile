# Etapa 1: build de la app
FROM node:18 AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# Etapa 2: servir los archivos con Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Reemplaza la configuración por defecto de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
