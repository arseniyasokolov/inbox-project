# inbox-project
Простой почтовый сервис.
## Как запустить
- вызвать npm i
- (!) не забыть склонировать сабмодуль <a href="https://github.com/arseniyasokolov/core-library">core-library</a>
- запустить приложение ng serve, и затем запустить моковый сервер json-server --watch src/app/data/mock-and-slow.db.json
## Возможности
- имитация получения рандомных писем с рандомным периодом (моковый бэкенд)
- можно удалять письмо
## TO DO:
- заменить json-server на axios
- доработать модуль пользователей, привязать к письмам и вывести их данные в список писем
- создать страницы Адресная книга и Карточка адресата
- создать страницу Новое письмо (с выбором адресата из списка)
- разработать авторизацию 
