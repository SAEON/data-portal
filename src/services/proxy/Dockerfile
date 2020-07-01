FROM node:14
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/proxy ci --only=production
EXPOSE 8001 8002
CMD npm run --prefix src/services/proxy start:prod