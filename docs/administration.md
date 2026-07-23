# Администрирование OST NEXUS

## Настройка первого администратора

Учётные данные хранятся только в локальном **backend/.env**:

~~~dotenv
ADMIN_NAME="OST NEXUS Administrator"
ADMIN_EMAIL=admin@ost-nexus.local
ADMIN_PASSWORD=replace-with-a-strong-password
~~~

Пароль должен содержать не менее 12 символов. Файл **backend/.env** исключён из Git.

После заполнения переменных выполните:

~~~bash
task migrate
task admin:create
~~~

Команда создаёт пользователя при первом запуске. При повторном запуске пользователь с тем же email обновляется, поэтому дубликаты не появляются. Email сразу отмечается подтверждённым, а пароль сохраняется только в виде безопасного хеша.

Только пользователи с признаком **is_admin=true** могут открыть панель <http://localhost:8090/admin>.

## Консоль backend-контейнера

~~~bash
task shell
~~~

Команда поднимает PostgreSQL и профиль **tools**, затем открывает Bash в каталоге **/app** CLI-контейнера. Исходники backend подключены как bind mount, поэтому внутри доступны актуальные файлы проекта:

При первом запуске Docker соберёт PHP-образ; следующие запуски используют кэш. После изменения Dockerfile образ автоматически актуализируется.

~~~bash
php artisan list
php artisan migrate:status
composer check-platform-reqs
exit
~~~

CLI-контейнер не обслуживает HTTP-запросы и не меняет схему разработки: **task dev** продолжает запускать Laravel локально для быстрого hot reload.
