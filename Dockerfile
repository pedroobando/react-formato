#STEP 1 BUILD OF RECT PROYECT
FROM node:12-alpine3.12 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#STEP 2 CREATE NGINX SERVER
FROM nginx:1.19.5-alpine as prod-nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
