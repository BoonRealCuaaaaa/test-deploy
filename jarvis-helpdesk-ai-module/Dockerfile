FROM node:23.3.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
