FROM node:18-alpine
WORKDIR /code
COPY package.json package.json
RUN npm install -r package.json
EXPOSE 3030
COPY . .
RUN npx prisma generate