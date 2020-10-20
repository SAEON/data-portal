FROM node:14.13
WORKDIR /app
COPY . .
RUN npm ci --only=production
EXPOSE 3000
CMD npm run start:prod