# examSF
Работа "Справочник Силант" Соломонов ЕЮ FPW140

Команды для запуска. 
<br/>
-> cd server 
<br/>
-> py manage.py runserver 
<br/>

Администратор (все права)

Логин: admin
Пароль: root


Я добавил несколько пользователей для удобства (У всех пароли 123)

Менеджер (Все права кроме создния пользователей)
Логин: manager_1

Сервисная организация
Логин: Silant

Пользователь 
Логин: Ivanov1979 

Некоторые экзепляры техники для пользователя также были заранее добавлены (для удобства проверки), как и справочники. 
При необходимости можно добавить новые 

У администраторов и менеджеров есть специальная панель, ссылка на которую располагается рядом с их именем (правый верхний угол). Часть функций по созданию или редактированию доступна в главной таблице и детальных представлениях. 

Для запуска надо установить все зависимости python. Изначально проект работает уже при запуске сервера джанго, все файлы скомпилированы в сборник и подключены. 
Однако, если есть необходимость проверки работоспособности конкретно React-приложения, то для этого надо перейти в папку client, устновить зависимости npm, поменять путь в index.html на "./bundle.js", убрать django-тег {% load static %} и выполнить команду npm run serve, запустив в другом терминале django-server. 

Вид главной таблицы (все колонки с данными) был мною согласован с ментором в Slack
