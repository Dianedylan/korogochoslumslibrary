FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/kochlibrary /usr/share/nginx/html/

# FROM node:18 AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# CMD ["npm", "start"]

