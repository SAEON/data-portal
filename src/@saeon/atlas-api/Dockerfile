FROM node:14
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/@saeon/atlas-api ci --only=production
EXPOSE 3000
CMD npm run --prefix src/@saeon/atlas-api start:prod