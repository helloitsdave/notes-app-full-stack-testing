# Use an official Node.js runtime based on Alpine Linux as the base image
FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Required for prisma
RUN apk add openssl3

# Copy the TypeScript configuration files
COPY tsconfig.json ./

# Copy the application code into the container
COPY . .

COPY wait-for-it.sh wait-for-it.sh

# Make the script executable
RUN chmod +x wait-for-it.sh

# Primsa generate
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Expose the port that the application will run on
EXPOSE 5001

# Command to run the application
CMD ["node", "dist/index.js"]