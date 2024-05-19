FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

ENV PORT='8080'
ENV MODEL_URL='https://storage.googleapis.com/mlgc-backend/prod/model.json'
ENV HOST='0.0.0.0'

EXPOSE 8080

CMD ["node", "index.js"]