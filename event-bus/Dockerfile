FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 4005
CMD ["npm", "start"]