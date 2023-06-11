# Base image
FROM node:18-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY . .

RUN npm run build

#EXPOSE 3000
#
#USER node

#stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
