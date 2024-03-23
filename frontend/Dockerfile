# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . .

# Set the environment variable
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Build the app
RUN npm run build

# Use an official lightweight Node.js runtime as the final base image
FROM node:14-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Install serve to serve the app
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=0 /usr/src/app/build .

# Expose port 5000 for the app
EXPOSE 3000

# Start the app
CMD ["serve", "-s", ".", "-l", "3000"]