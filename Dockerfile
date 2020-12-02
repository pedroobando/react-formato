#STEP 1 BUILD OF RECT PROYECT
FROM node:12-alpine3.12 as react-build
WORKDIR /app
COPY package.json ./
RUN yarn
COPY . ./
RUN yarn run build
# RUN npm install
# COPY . .
# RUN npm run build

#STEP 2 CREATE NGINX SERVER
FROM nginx:1.19.5-alpine as prod-nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
