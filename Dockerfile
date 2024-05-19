# Gunakan image Node.js sebagai base image
FROM node:21

# Buat direktori kerja
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=prod

# Copy semua file ke dalam image
COPY . .

ENV PORT='8080'
ENV MODEL_URL='https://storage.googleapis.com/storage-model/prod/model.json'
ENV HOST='0.0.0.0'

# Expose port yang akan digunakan
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "index.js"]