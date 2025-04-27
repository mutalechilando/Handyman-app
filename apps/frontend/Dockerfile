# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Expo runs on (default: 19006)
EXPOSE 19006

# Run the Expo development server
CMD ["npx", "expo", "start", "--tunnel"]
