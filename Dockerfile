FROM node:latest as build

WORKDIR /build

ENV CI=false

COPY . .
RUN npm install
RUN npm install react-app-rewired customize-cra --save-dev

FROM nginx:1.13.9-alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx /etc/nginx

COPY --from=build /build/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]