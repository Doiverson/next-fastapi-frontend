FROM node:20-alpine AS base

WORKDIR /app

# Enable corepack
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY . .

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Development environment configuration
FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]
