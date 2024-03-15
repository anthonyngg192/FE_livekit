# Stage 1
FROM node:14.21.3 as node
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
