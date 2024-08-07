# Use the official Node.js image as the base image
FROM node:14-alpine AS builder
 
# Set the working directory
WORKDIR /app
 
# Copy the package.json and package-lock.json files
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Build the Angular application
RUN npm run build --prod
 
# Use a smaller base image for the final image
FROM nginx:alpine
 
# Copy the built Angular artifacts from the builder stage
COPY --from=builder /app/dist/ecommerce /usr/share/nginx/html
 
# Expose the port that the Nginx server will listen on
EXPOSE 80
 
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]