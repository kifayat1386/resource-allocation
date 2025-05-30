# Use official lightweight nginx image
FROM nginx:alpine

# Copy all frontend files (html, css, js, nginx.conf) to nginx default directory
COPY ./ /usr/share/nginx/html

# Replace default nginx config with your custom config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx in foreground (default)
CMD ["nginx", "-g", "daemon off;"]
