FROM node:14 AS base

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY package*.json ./
RUN npm install

COPY . ${APP_HOME}

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

FROM node:14-slim AS prod

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]
