FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY packages/api ./packages/api
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils

# Build the application
WORKDIR /app/packages/api
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "start"]