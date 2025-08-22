FROM node:19-alpine
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 8080
RUN npm install
CMD ["npm","start" ]