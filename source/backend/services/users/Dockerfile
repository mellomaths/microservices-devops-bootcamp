# ===== BUILD =====
# Build and transpile TypeScript code into JavaScript
FROM node:12 as builder

# Set environment and work directory to build
ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install only development dependencies in order to build properly
RUN npm install --only=development

# Copy the TS code into the image and build
COPY . .
RUN npm run build

# ===== PRODUCTION =====
# Execute the transpiled JS code 
FROM node:12-alpine as production

# Set environment and work directory to execute the project
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the image
COPY --from=builder /usr/src/app/package*.json ./

# Copy the transpiled JS code into the image
COPY --from=builder /usr/src/app/dist/ ./dist/

# RUN npm ci or npm install --only=production

# Install only executable dependencies for production mode
RUN npm install --only=production

# Expose server port 3000 
EXPOSE 3000

# Execute the project
CMD [ "node", "./dist/main.js" ]
