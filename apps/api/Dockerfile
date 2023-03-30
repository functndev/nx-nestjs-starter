FROM node:18-alpine as builder

RUN corepack enable
RUN corepack prepare pnpm@8.1.0 --activate

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN pnpm i --frozen-lockfile --ignore-scripts

COPY ./prisma ./prisma

RUN pnpm prisma generate

COPY . .

ENV NX_DAEMON false

RUN pnpm nx build api --prod

FROM node:18-alpine as runner

RUN corepack enable
RUN corepack prepare pnpm@8.1.0 --activate

WORKDIR /app

COPY --from=builder /app/dist/apps/api /app
COPY --from=builder /app/prisma /app/prisma

RUN pnpm i --ignore-scripts
RUN pnpm dlx prisma generate

ENV NODE_ENV production
ENV PORT 4200

EXPOSE ${PORT}

CMD ["node", "main.js"]
