# Backend OST NEXUS

Backend предоставляет REST API, редакторскую панель Filament и доступ к PostgreSQL. Код организован по принципам Domain-Driven Design.

## Слои

- **Domain** — чистая предметная модель без зависимостей от Laravel;
- **Application** — команды, запросы, обработчики, DTO и интерфейсы внешних зависимостей;
- **Infrastructure** — Eloquent, PostgreSQL, внешние провайдеры и реализации интерфейсов;
- **Presentation** — HTTP-контроллеры и преобразование API-ответов;
- **Providers** — регистрация зависимостей в контейнере Laravel.

Направление зависимостей: **Presentation → Application → Domain**, а **Infrastructure** подключается через интерфейсы прикладного слоя.

Полные правила и ограниченные контексты описаны в [общей архитектуре](../docs/architecture.md).

## Команды

Команды выполняются из корня монорепозитория:

~~~bash
task setup
task dev
task shell
task admin:create
task backend:test
task backend:check
task backend:format
task migrate
~~~

Публичный API доступен по адресу <http://localhost:8090/api/v1>, Filament — <http://localhost:8090/admin>.

**task shell** открывает Bash в отдельном PHP CLI-контейнере. **task admin:create** читает учётные данные из **backend/.env** и идемпотентно создаёт или обновляет администратора. Подробности находятся в [руководстве администратора](../docs/administration.md).

Новые бизнес-правила должны появляться в **Domain**, а не в контроллерах, Eloquent-моделях или ресурсах Filament.
