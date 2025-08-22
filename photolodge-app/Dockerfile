FROM node:19-alpine
WORKDIR /app
COPY . .
RUN next build
EXPOSE 8080
RUN npm install
CMD ["npm","start" ]