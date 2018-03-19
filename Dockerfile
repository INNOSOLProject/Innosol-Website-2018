FROM nginx:1.13.8-alpine

WORKDIR /usr/share/nginx/html
COPY . ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
