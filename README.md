# Проект reactflow-wwebjs Демонстрационный Проект

Привет! Этот проект представляет собой демонстрационное проект, созданный с использованием wwebjs (backend), reactflow (frontend) и mongoose (база данных).

### Описание проекта:
Проект предусматривает управление и настройку бота WhatsApp с минимальными усилиями, с помощью интерфейса для визуализации сценария ответов и работы с сообщениями.

Проект создан исключительно в учебных и демонстрационных целях. Все данные, используемые в приложении, предназначены исключительно для демонстрации функциональности и не несут реальной информации.

[Видео демонстрация](https://youtu.be/19-QtNxxeU0)

### Используемые технологии:

- **Frontend**: React, HTML, CSS.
- **Backend**: Node.js, Express.js, MongoDB.
- **Библиотеки**: whatsapp-web.js, mongoose, reactflow

### Как запустить проект локально:

1. Склонируйте репозиторий: 
```git clone https://github.com/MTMdasboard/reactflow-wwebjs.git```
2. Перейдите в каталог проекта: 
```cd reactflow-wwebjs```
3. Установите зависимости для основного проекта: 
```npm install```
4. Перейдите в каталог фронтенда: 
```cd client```
5. Установите зависимости для фронтенда: 
```npm install```
6. Перейдите в каталог сервера: 
```cd ..```
```cd server```
7. Установите зависимости для сервера: 
```npm install```
8. Настройте подключения к базе данных и порт сервера в файле `server/.env` скопировав и переименовав `.env.example`
9. Настройте подключения адрес сервера в файле `client/.env` скопировав и переименовав `.env.example`
10. Перейдите в каталог основного проекта: 
```cd ..```
11. Запустите разработку 
```npm run dev```
12. Отсканируйте штрихкод в терминале для авторизации бота в whatsapp-web 
13. Дождитесь загрузки всех модулей (последним должен объявиться CommandHandler)

### Дополнительная информация:

Более подробные инструкции по настройке и запуску проекта можно найти в документации [ReactFlow](https://reactflow.dev/) и [wwebjs](https://wwebjs.dev/).

### Лицензия:

Этот проект распространяется под лицензией MIT. Подробную информацию можно найти в файле `LICENSE`.
