FROM node:18

# Установка NODE_ENV в "production"
ENV NODE_ENV production

WORKDIR /app

COPY .output/ /app

CMD ["node", "server/index.mjs"]