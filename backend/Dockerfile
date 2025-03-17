FROM node:16-alpine

WORKDIR /usr/src/app

ENV CODE_VERSION=1.0.0
ENV HOST=0.0.0.0
ENV PORT=80

COPY . api-app

CMD [ "node", "api-app" ]
