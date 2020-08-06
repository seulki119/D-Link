FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN yarn install
EXPOSE 8080
CMD ["yarn","run","serve"]


# docker-compose up  # to start the complilation process
# to install npm package run
# docker-compose exec web npm i bootstrap 