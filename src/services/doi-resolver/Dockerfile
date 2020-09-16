FROM node:14.10
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm --prefix src/services/doi-resolver ci --only=production
EXPOSE 3002
CMD npm run --prefix src/services/doi-resolver start:prod