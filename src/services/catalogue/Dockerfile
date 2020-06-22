# Build catalogue
FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/catalogue ci --only=production
RUN npm --prefix src/services/catalogue run build 

# Serve static files
FROM nginx:alpine
COPY --from=build /app/src/services/catalogue/dist /usr/share/nginx/html
COPY src/services/_nginx-config/nginx.conf /etc/nginx/nginx.conf
COPY src/services/_nginx-config/localhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80