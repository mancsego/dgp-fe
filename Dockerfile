FROM node:latest

RUN mkdir -p app
WORKDIR /app
COPY . .
RUN npm install

CMD [ "npm", "run", "dev"]
