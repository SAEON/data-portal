FROM node:14.13
WORKDIR /app
COPY . .
RUN npm ci --only=production
EXPOSE 8001 8002
CMD npm run start:prod