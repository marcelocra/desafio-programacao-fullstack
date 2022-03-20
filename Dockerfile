# syntax=docker/dockerfile:1

FROM node:16

ARG node_env
ENV NODE_ENV=${node_env:-production}

# Take advantage of docker layers.
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

COPY . .

# Prepare the frontend code.
RUN yarn global add parcel@2.3.2
RUN yarn prod:frontend
RUN yarn global remove parcel

# Prepare the sqlite3 database. If there's already a sqlite file
# remove it first, otherwise it will conflict.
WORKDIR /app/db
RUN [ ! -e hubla.sqlite3 ] || rm hubla.sqlite3
RUN node run_sql.js

# Run the app.
WORKDIR /app
CMD [ "node", "src/server.js" ]
