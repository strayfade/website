# syntax=docker/dockerfile:1

# ---- deps (production-only — no build step, no devDependencies) ----
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- runtime ----
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY index.js Log.js ./
COPY articles ./articles
COPY public ./public

EXPOSE 3000
CMD ["node", "index.js"]
