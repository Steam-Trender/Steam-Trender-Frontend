FROM node:16-alpine

WORKDIR /app

COPY ./steam-trender/package.json ./steam-trender/package-lock.json ./

RUN npm install

COPY ./steam-trender/ .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]