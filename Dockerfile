FROM node:7-alpine
EXPOSE 3000
ADD package.json ./
RUN npm i --production
ADD server.js /server.js
ENV NODE_ENV production
RUN node /server.js
