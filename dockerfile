# 1. Node alap image
FROM node:18

# 2. Workdir létrehozása
WORKDIR /app

# 3. package.json bemásolása
COPY package*.json ./

# 4. Dependencies telepítése
RUN npm install

# 5. Az egész projekt bemásolása
COPY . .

# 6. App induló portja
EXPOSE 3000

# 7. Indítás
CMD ["node", "server/server.js"]