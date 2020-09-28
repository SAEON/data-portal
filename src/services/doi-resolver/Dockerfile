FROM node:14.10
WORKDIR /app
COPY . .
RUN npm ci --only=production
EXPOSE 3002
CMD npm run start:prod