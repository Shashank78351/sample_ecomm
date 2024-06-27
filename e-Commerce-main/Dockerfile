# Stage 1: Build Angular App
FROM node:18 AS build

# Set the working directory to the root of the Angular project
WORKDIR /app

# Install Angular CLI globally
# RUN npm install -g @angular/cli

# Copy package.json and package-lock.json to the working directory
COPY ./e-Commerce-main .

# Install dependencies
RUN npm install

# Copy the rest of the application files
# COPY ./backend .

# Build the Angular application
RUN npm run build --configuration=production

# Stage 2: Serve App with Node.js
FROM node:18

# Set the working directory
WORKDIR /app

# Install serve globally to serve the Angular app
RUN npm install -g http-server

# Copy the build output from the previous stage
COPY --from=build /app/dist/backend /app

# Expose the port the app runs on
EXPOSE 80

# Start the application
CMD ["http-server", "/app", "-p", "80"]

