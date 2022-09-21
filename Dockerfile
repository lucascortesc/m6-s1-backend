FROM node

WORKDIR /app

COPY "package.json" .

EXPOSE 8080

ENV PORT 8080

RUN yarn

COPY . .

CMD ["yarn", "dev"]