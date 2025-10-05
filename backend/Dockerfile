# If you're on Apple Silicon and want native arm64, you can also do:
# FROM --platform=linux/arm64 node:20-bullseye
FROM node:20-bullseye

WORKDIR /app

# Build deps for native addons
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ sqlite3 libsqlite3-dev \
 && rm -rf /var/lib/apt/lists/*

# Avoid copying host node_modules; install cleanly in image
COPY package*.json ./

# Force building native modules from source for this image/arch/libc
ENV npm_config_build_from_source=true
RUN npm ci --ignore-scripts \
 && npm rebuild better-sqlite3 --build-from-source

# Now bring in the source
COPY . .

EXPOSE 3000
CMD ["npm","run","start"]
