FROM node:14.10
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/api ci --only=production
EXPOSE 3000
CMD npm run --prefix src/services/api start:prod