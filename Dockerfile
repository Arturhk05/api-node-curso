FROM node:22
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 5000
CMD npm start