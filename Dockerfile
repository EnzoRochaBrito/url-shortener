FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src .

COPY ./tsconfig.json .

RUN npm run build

EXPOSE 9999

CMD [ "npm", "run", "dev" ]