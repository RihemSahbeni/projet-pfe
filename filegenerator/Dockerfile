# Use an official Node.js Alpine image as the base
FROM node:v18.15.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies



# Copy the entire project to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
