FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
EXPOSE 8010
CMD ["yarn", "dev", "--host"]