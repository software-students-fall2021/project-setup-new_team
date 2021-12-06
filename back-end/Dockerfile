FROM node:16

WORKDIR /usr/src/app

COPY pack*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

#check this please
EXPOSE 3000

CMD ["pm2", "start", "app.js"]



