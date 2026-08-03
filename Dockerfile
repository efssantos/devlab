FROM httpd:alpine

COPY project/ /usr/local/apache2/htdocs/

EXPOSE 80
