FROM node:16-alpine

WORKDIR /app

ENV PORT 4200
EXPOSE ${PORT}

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --production --ignore-scripts
RUN npm install @nrwl/cli@$(node -pe "require('./package').devDependencies['@nrwl/cli']") --ignore-scripts

COPY . .

RUN npx prisma generate

RUN npx nx build api --prod

RUN npm prune --production

ENV NODE_ENV production

CMD ["node", "dist/apps/api/main.js"]
