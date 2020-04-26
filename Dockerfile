FROM nginx:1.13.9-alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx /etc/nginx

COPY build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]