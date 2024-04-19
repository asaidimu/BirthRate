# node for server and build.
FROM node:19.5-alpine as base

# set base path
WORKDIR /root/app

ARG PACKAGE_NAME

# copy meta files over
COPY . .

# install remote dependencies
RUN yarn workspaces focus "${PACKAGE_NAME}"

RUN yarn workspace "${PACKAGE_NAME}" build:ci

# nginx to serve the client
FROM nginx:1.25.2-alpine as server

# copy nginx config
# COPY --from=base /root/app/packages/client/.nginx/nginx.conf /etc/nginx/nginx.conf

# copy web files
COPY --from=base /root/app/packages/client/dist /usr/share/nginx/html

# expose port
EXPOSE 80
