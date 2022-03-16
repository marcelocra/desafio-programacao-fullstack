# syntax=docker/dockerfile:1

FROM node:16

ENV NODE_ENV=production

# Take advantage of docker layers.
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

# Prepare the sqlite3 database. If there's already a sqlite file
# remove it first, otherwise it will conflict.
COPY . .
WORKDIR /app/db
RUN [ ! -e hubla.sqlite3 ] || rm hubla.sqlite3
RUN node run_sql.js

# Run the app.
WORKDIR /app
CMD [ "node", "src/server.js" ]
