FROM node:20-alpine AS base
FROM base AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/ /app/

CMD ["npm", "start"]