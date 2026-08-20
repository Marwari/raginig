FROM nginx:alpine

# Custom error page config
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    error_page 404 /404.html; \
    location = /404.html { internal; } \
    location / { try_files $uri $uri/ =404; } \
}' > /etc/nginx/conf.d/default.conf

# Copy static assets
COPY index.html /usr/share/nginx/html/
COPY 404.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
