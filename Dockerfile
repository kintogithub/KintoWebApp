FROM node:8.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

ENV CI=true

RUN npm install

COPY . /usr/src/app

RUN npm test

RUN npm run lint

RUN npm run build

FROM node:8.4.0-alpine

RUN npm config set unsafe-perm true \
    && npm -g install serve \
    && npm config set unsafe-perm false

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app/build .

EXPOSE 5000

CMD ["serve", "-s", "."]
