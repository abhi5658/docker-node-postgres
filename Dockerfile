FROM node:15

WORKDIR /app

COPY ./ ./ 

RUN npm i

CMD ["node", "server.js"]
