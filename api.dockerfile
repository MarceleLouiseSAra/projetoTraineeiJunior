FROM node:18-alpine
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . /code
RUN npx prisma generate
EXPOSE 3030
CMD ["npm", "start"]