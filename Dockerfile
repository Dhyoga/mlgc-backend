# Gunakan image Node.js sebagai base image
FROM node:21

# Buat direktori kerja
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam image
COPY . .

COPY .env .env

# Expose port yang akan digunakan
EXPOSE 8080

# Jalankan aplikasi
CMD ["sh", "-c", "source .env && node index.js"]