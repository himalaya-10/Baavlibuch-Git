FROM node

WORKDIR /index.js

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm" , "start" ]