# Stage 1: Build Angular App
FROM node:18

# Set the working directory to the root of the Angular project
WORKDIR /app

# Install Angular CLI globally
# RUN npm install -g @angular/cli

# Copy the rest of the application files
COPY ./backend .

# Install dependencies
RUN npm install

# Build the Angular application
# RUN node server.js

# # Stage 2: Serve App with Node.js
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Install serve globally to serve the Angular app
# RUN npm install -g http-server

# # Copy the build output from the previous stage
# COPY --from=build /app/dist/backend /app

# Expose the port the app runs on
EXPOSE 80

# Start the application
# CMD ["http-server", "/app", "-p", "80"]

CMD ["node", "server.js"]

