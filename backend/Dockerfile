# Use an official Node.js runtime based on Alpine Linux as the base image
FROM node:20-alpine as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies required for the build
RUN apk add --no-cache bash openssl3

# Copy package.json, package-lock.json, and TypeScript configuration files
COPY package.json yarn.lock tsconfig.json ./

# Install the application dependencies
RUN yarn

# Copy the application code and other necessary files into the container
COPY . ./
COPY wait-for-it.sh wait-for-it.sh

# Make the script executable and build the application
RUN chmod +x wait-for-it.sh && \
    npx prisma generate && \
    yarn build

# Use a new, clean base image for the runtime
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the built artifacts and necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/wait-for-it.sh ./wait-for-it.sh

# Expose the port that the application will run on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/index.js"]