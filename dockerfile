
FROM node:12-alpine3.10

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

ENV NODE_ENV QA
ENV PORT 3001
ENV MONGOBD mongodb+srv://desarrollo:BcilntUmkE4CnMLu@cluster0.ipabhxh.mongodb.net/cykel

EXPOSE 3001

CMD [ "npm", "start" ]