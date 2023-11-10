Этот репозиторий содержит серверную часть приложения, которая обеспечивает функциональность поиска и продажи недвижимости. Бэкенд взаимодействует с базой данных MongoDB, обрабатывает запросы от клиентской части и предоставляет необходимую информацию и функционал.

## Основные технологии и инструменты

- Node.js
- Express.js
- express-validator
- MongoDB
- Multer
- bcrypt
  

## Установка и запуск

1. Установите зависимости:

```bash
npm install

```

1. Настройте переменные окружения:

```bash
cp .env.example .env

```

Отредактируйте файл `.env` и заполните необходимые значения:
- DATABASEURL  - url for connection to mongodb
- HOSTNAME  - hostname
- PORT - port
- BCRYPT_SALT_ROUNDS - rounds of salt for bcrypt
- JWT_PRIVATE_KEY - your secret key


1. Запустите приложение:

```bash
npm start

```

## API эндпоинты

### Поиск недвижимости

```
GET /api/properties

```

Параметры запроса:

- `type` (optional): Тип недвижимости (например, house, apartment)
- `location` (optional): Местоположение недвижимости
- `price` (optional): Диапазон цены (например, 100000-200000)

Пример успешного ответа:

```json
[
  {
    "id": "1",
    "title": "Прекрасный дом",
    "location": "Москва",
    "price": 200000,
    "image": "link-to-image.jpg"
  },
  {
    "id": "2",
    "title": "Уютная квартира",
    "location": "Санкт-Петербург",
    "price": 150000,
    "image": "link-to-image.jpg"
  }
]

```

### Добавление объявления о продаже

```
POST /api/properties

```

Параметры запроса:

- `title`: Заголовок объявления
- `location`: Местоположение недвижимости
- `price`: Цена недвижимости
- `image`: Изображение недвижимости

Пример успешного запроса:

```json
{
  "title": "Прекрасный дом",
  "location": "Москва",
  "price": 200000,
  "image": "link-to-image.jpg"
}

```

Пример успешного ответа:

```json
{
  "id": "1",
  "message": "Объявление успешно добавлено"
}

```

## Аутентификация и авторизация пользователей

Для аутентификации и авторизации пользователей используется JSON Web Token (JWT). При успешной аутентификации пользователя выдается токен, который должен быть передан в заголовке каждого запроса:

```
Authorization: Bearer your-token

```

## Безопасность и обработка платежей

Бэкенд обеспечивает безопасную передачу данных с использованием HTTPS. Кроме того, при совершении сделок по продаже недвижимости, приложение обрабатывает платежи с использованием платежной системы, обеспечивая безопасность и надежность операций.
