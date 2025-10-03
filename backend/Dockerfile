FROM node:18-alpine

# Install system dependencies for better-sqlite3
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    sqlite \
    sqlite-dev

WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
