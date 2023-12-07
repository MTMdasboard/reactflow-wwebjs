# Проект reactflow-wwebjs Демонстрационный Проект

Привет! Этот проект представляет собой демонстрационное проект, созданный с использованием wwebjs (backend), reactflow (frontend) и mongoose (база данных).

### Описание проекта:
Проект предусматривает управление и настройку бота WhatsApp с минимальными усилиями. Оно предоставляет интерфейс для визуализации сценария ответов и работу с сообщениями.

Проект создан исключительно в учебных и демонстрационных целях. Все данные, используемые в приложении, предназначены исключительно для демонстрации функциональности и не несут реальной информации.

[Видео демонстрация раздела с новостями](https://youtu.be/2GquwJEvMeA)

### Используемые технологии:

- **Frontend**: React, HTML, CSS.
- **Backend**: Node.js, Express.js, MongoDB.
- **Библиотеки**: whatsapp-web.js, mongoose, reactflow

### Как запустить проект локально:

1. Склонируйте репозиторий: `git clone https://github.com/MTMdasboard/reactflow-wwebjs.git`
2. Перейдите в каталог проекта: `cd reactflow-wwebjs`
3. Запустите скрипт установки зависимостей для основного проекта, фронтенда(client) и бэкенда(server): `npm run install`
4. Настройте подключения к базе данных и порт сервера в файле `server/.env` скопировав и переименовав `.env.example`
5. Настройте подключения адрес сервера в файле `client/.env` скопировав и переименовав `.env.example`
6. Запустите разработку `npm run dev`
7. Отсканируйте штрихкод в терминале для авторизации бота в whatsapp-web и обязательно дождитесь загрузки всех модулей (последним должен объявиться CommandHandler)

### Дополнительная информация:

Более подробные инструкции по настройке и запуску проекта можно найти в документации [ReactFlow](https://reactflow.dev/) и [wwebjs](https://wwebjs.dev/).

### Лицензия:

Этот проект распространяется под лицензией MIT. Подробную информацию можно найти в файле `LICENSE`.
