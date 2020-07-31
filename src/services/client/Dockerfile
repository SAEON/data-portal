# Build client
FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/client ci --only=production
RUN npm --prefix src/services/client run build

# Serve static files
FROM nginx:alpine
COPY --from=build /app/src/services/client/dist /usr/share/nginx/html
COPY src/services/client/nginx/nginx.conf /etc/nginx/nginx.conf
COPY src/services/client/nginx/localhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80