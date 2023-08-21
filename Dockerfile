# Build stage
FROM node:18.13.0 AS build

WORKDIR /app
COPY . .

RUN yarn

RUN yarn build

# Production stage
FROM node:18.13.0

WORKDIR /app
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json /app/yarn.lock /app/tsconfig.* /app/jest.config.js /app/nest-cli.json ./
COPY --from=build /app/dist ./dist

RUN yarn install --production

CMD ["yarn", "start:prod"]
EXPOSE 3000
