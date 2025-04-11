# Use official Node.js image
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy app files and build
COPY . .
RUN npm run build

# Run the production server
CMD ["npm", "start"]