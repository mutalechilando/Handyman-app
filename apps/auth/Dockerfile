FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN pnpm install
RUN pnpm add pm2 -g

COPY ./ ./

EXPOSE 3003

CMD [ "pnpm", "run", "start:prod" ]
