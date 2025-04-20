# Используем образ с Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . ./

# Сборка фронтенда
RUN npm run build

# Устанавливаем глобально утилиту serve для раздачи статики
RUN npm install -g serve

# Открываем порт 3000
EXPOSE 3000

# Запуск сервера с помощью serve
CMD ["serve", "-s", "dist", "-l", "3000"]