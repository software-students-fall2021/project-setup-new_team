FROM node:16

WORKDIR /usr/src/app

COPY pack*.json ./

RUN npm install

COPY . .

#check this please
EXPOSE 3000

CMD ["node", "server.js"]



