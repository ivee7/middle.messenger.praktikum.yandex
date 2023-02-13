FROM node:19

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD node server.js
