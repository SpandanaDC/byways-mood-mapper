# Use a lightweight Node.js version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Open the port your app runs on (Change 3000 if your app uses a different port!)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
