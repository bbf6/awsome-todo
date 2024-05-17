FROM steebchen/nginx-spa:stable

COPY dist/spa/ /app

EXPOSE 80

CMD ["nginx"]

