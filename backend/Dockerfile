# Use the official Node.js image as the base image
FROM node:14-alpine
 
# Set the working directory
WORKDIR /app
 
# Copy the package.json and package-lock.json files
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Expose the port that the Node.js server will listen on
EXPOSE 3000
 
ENV PORT 3000
 
# Start the Node.js server
CMD ["node", "server.js"]