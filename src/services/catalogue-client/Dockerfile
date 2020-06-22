# Build atlas-client
FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/atlas-client ci --only=production
RUN npm --prefix src/services/atlas-client run build 

# Serve static files
FROM nginx:alpine
COPY --from=build /app/src/services/atlas-client/dist /usr/share/nginx/html
COPY src/services/atlas-client/nginx/nginx.conf /etc/nginx/nginx.conf
COPY src/services/atlas-client/nginx/localhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80