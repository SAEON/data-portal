# Build {{ packageName }}
FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/{{ packageName }} ci --only=production
RUN npm --prefix src/services/{{ packageName }} run build 

# Serve static files
FROM nginx:alpine
COPY --from=build /app/src/services/{{ packageName }}/dist /usr/share/nginx/html
COPY src/config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY src/config/nginx/localhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80