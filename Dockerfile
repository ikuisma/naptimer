FROM node:10.15
EXPOSE 5000
WORKDIR /usr/src/app
COPY . .
RUN npm run build
RUN npm install -g serve
CMD serve -s 5000