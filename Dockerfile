FROM node:16-buster-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && npm install @nestjs/cli
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]