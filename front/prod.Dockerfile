# Stage 1: Build stage
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the application source code
COPY .. .

# # Build the app
# RUN npm run build

# # Stage 2: Runtime stage
# FROM nginx:alpine

# # Copy Nginx configuration file
# COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Command to run on container start
CMD ["npm", "run", "prod"]
