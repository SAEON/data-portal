FROM node:13
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/@saeon/anyproxy ci --only=production
EXPOSE 8001 8002
CMD npm run --prefix src/@saeon/anyproxy start:prod