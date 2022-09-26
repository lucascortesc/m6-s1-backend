FROM node

WORKDIR /app

COPY . .

EXPOSE 8080

ENV PORT 8080

RUN yarn

CMD ["yarn", "dev"]