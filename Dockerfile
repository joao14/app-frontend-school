# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:12-alpine as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app/

# Install all the dependencies
RUN npm install 

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server
 
# Use official nginx image as the base image
FROM nginx:latest

## add permissions for nginx user
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
        
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/app-school /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]