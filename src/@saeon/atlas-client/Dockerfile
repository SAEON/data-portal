# Build atlas-client
FROM node:13 as build
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run atlas-client:build

# Serve static files
FROM nginx:alpine
COPY --from=build /app/src/@saeon/atlas-client/dist /usr/share/nginx/html
COPY src/@saeon/atlas-client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80