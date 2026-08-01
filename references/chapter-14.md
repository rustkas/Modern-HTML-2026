Ниже представлен список ссылок на источники и ключевые разделы спецификаций для **Главы 14. Navigation API**.

### Современная навигация и Navigation API

Navigation API является современным преемником интерфейсов `history` и `location`, специально разработанным для нужд веб-приложений.

- **HTML Standard: Section 7.2.6 The navigation API** — основное техническое описание интерфейса.
- **HTML Standard: Section 7.2.6.1 Introduction** — введение в философию API и его преимущества перед классическими методами.
- **HTML Standard: Section 7.2.6.2 The Navigation interface** — спецификация методов `navigate()`, `reload()`, `back()`, `forward()` и `traverseTo()`.
- **HTML Standard: Section 7.2.6.10 The navigate event** — описание центрального события, позволяющего управлять всеми типами навигации в текущем контексте.

### История браузера (Session History)

Разделы, описывающие механизмы хранения записей и управления состоянием сессии.

- **HTML Standard: Section 7.4 Navigation and session history** — фундаментальная инфраструктура навигации и записей истории.
- **HTML Standard: Section 7.2.5 The History interface** — описание классического API истории для понимания контекста.
- **HTML Standard: Section 7.2.6.5 The NavigationHistoryEntry interface** — работа с конкретными записями в новой модели, включая использование уникальных `key` и `id`.
- **HTML Standard: Section 7.4.6 Applying the history step** — алгоритмы перемещения между записями истории.

### SPA (Single Page Applications)

Navigation API предоставляет нативные инструменты для реализации навигации без полной перезагрузки страницы (same-document navigation).

- **HTML Standard: Section 7.2.6.10.1 The NavigateEvent interface** — описание метода **`intercept()`**, который позволяет превратить обычный переход в SPA-навигацию.
- **HTML Standard: Section 7.2.6.4 Initializing and updating the entry list** — как API управляет списком записей при переходах внутри одного документа.
- **HTML Standard: Property `sameDocument`** — индикатор того, является ли переход навигацией внутри текущего документа.
- **MDN Guide: Working with the History API** — справочный материал о методах `pushState` и `replaceState`, на замену которым пришел Navigation API.

### MPA (Multi-Page Applications)

Классическая навигация между различными документами и её обработка платформой.

- **HTML Standard: Section 7.4.2.3.1 The usual cross-document navigation case** — описание стандартного процесса перехода между страницами.
- **Fetch Standard: Section 2.2.5 Navigation request** — определение сетевых запросов, целью которых является создание нового документа.
- **HTML Standard: Section 7.2.7.7 The BeforeUnloadEvent interface** — механизм предупреждения пользователя перед уходом с текущей страницы.

### Алгоритмы HTML Navigation

Внутренние механизмы браузера, обеспечивающие выполнение переходов.

- **HTML Standard: Section 7.4.2 Navigation** — общий обзор процесса навигации.
- **HTML Standard: Section 7.4.2.2 Beginning navigation** — начальные шаги и проверки при инициации перехода.
- **HTML Standard: Section 7.2.1 Security infrastructure** — правила безопасности при доступе к объектам `Window` и `Location` во время навигации.
