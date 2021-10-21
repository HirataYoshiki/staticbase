FROM node:14.15.0-alpine

RUN apk update && \
    npm install -g \
           @vue/cli \
           firebase-tools && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./app .
WORKDIR /app/staticbase