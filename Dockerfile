FROM node:argon
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]
