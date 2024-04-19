# node for server and build.
FROM node:19.5-alpine as base

ARG PACKAGE_NAME
ARG POSTGRES_HOST

ENV DATABASE_URL="postgresql://rate:rate@${POSTGRES_HOST}:5432/?connect_timeout=300"

# Install build dependencies
RUN apk --no-cache add --virtual .builds-deps build-base python3

RUN npm install --global node-gyp

FROM base as build

# set base path
WORKDIR /build

# copy source files
COPY . .

# install remote dependencies
RUN yarn workspaces focus "${PACKAGE_NAME}"

# Remove any existing .env file
RUN rm -f ./packages/server/.env

# Copy .env.prod to .env
RUN cp ./packages/server/.env.prod ./packages/server/.env

# generate secrets
RUN python3 ./packages/server/bin/secrets.py ./packages/server/.env

# build prisma
RUN yarn workspace "${PACKAGE_NAME}" prisma generate

# build package
RUN yarn workspace "${PACKAGE_NAME}" build:dist

# Remove build dependencies after the build process is complete
RUN apk del .builds-deps

# packages are in dist
FROM build as assets

WORKDIR /app

COPY --from=build /build/packages/server/dist .

# install dependencies
RUN yarn

# generate dependencies
RUN yarn prisma generate

# run the server
CMD ["npm", "run", "serve"]
