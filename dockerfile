# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY ./src/front ./src/front/
COPY ./src/index.css ./src/index.css
COPY ./src/index.js ./src/index.js
COPY ./public ./public/

# start app
CMD ["npm", "start"]
