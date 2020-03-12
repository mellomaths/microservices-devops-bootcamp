FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . . 
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]

# docker image build -t microservices-devops-bootcamp-accounts-service .

