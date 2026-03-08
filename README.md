# 🟢 Ping Server

Node.js сервер который пингует сам себя каждую секунду. Без зависимостей — только стандартный `http` модуль.

## Запуск локально

```bash
node server.js
```

Сервер запустится на `http://localhost:3000`

## Эндпоинты

| Метод | Путь    | Описание              |
|-------|---------|-----------------------|
| GET   | `/`     | Статус сервера        |
| GET   | `/ping` | Пинг (JSON ответ)     |

## Деплой на Render.com (бесплатно)

1. Залей репозиторий на GitHub
2. Зайди на [render.com](https://render.com) → New → Web Service
3. Подключи свой GitHub репозиторий
4. Настройки:
   - **Build Command:** _(оставь пустым)_
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Нажми **Deploy**

После деплоя Render даст тебе URL вида `https://your-app.onrender.com` — он автоматически подставится в переменную `RENDER_EXTERNAL_URL` и сервер будет пинговать себя по этому адресу.

## Деплой на Railway.app (бесплатно)

1. Зайди на [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Выбери репозиторий — Railway сам всё поднимет
3. В настройках установи переменную окружения:
   - `PORT` = `3000`

## Логи

```
✅ Сервер запущен: https://your-app.onrender.com
🏓 Пинг каждую секунду: https://your-app.onrender.com/ping
🏓 Ping #1 → 200 | {"status":"ok","time":"2025-01-01T00:00:01.000Z"}
🏓 Ping #2 → 200 | {"status":"ok","time":"2025-01-01T00:00:02.000Z"}
...
```
