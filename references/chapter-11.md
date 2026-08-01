Ниже приведены ссылки на основные разделы спецификаций и справочные материалы для **Главы 11. Приоритеты загрузки**.

### fetchpriority (Приоритет выборки)

Этот атрибут позволяет разработчикам подсказывать браузеру относительную важность ресурса.

- **HTML Standard: Section 2.5.9 Fetch priority attributes** — общее определение атрибута, его ключевых слов (`high`, `low`, `auto`) и состояний.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/urls-and-fetching.html#fetch-priority-attributes](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#fetch-priority-attributes)
- **Fetch Standard: Section 2.2.5 (Priority)** — техническое описание того, как свойство `priority` ассоциируется с запросом.
- **Применение к элементам**:
  - Для **`<img>`**: Атрибут `fetchpriority` у изображений.
  - Для **`<link>`**: Использование с `rel="preload"` или `rel="prefetch"`.
  - Для **`<script>`**: Управление приоритетом загрузки внешних скриптов.

### async и defer

Атрибуты, управляющие выполнением скриптов без блокировки парсинга HTML.

- **HTML Standard: Section 4.12.1 The `script` element** — подробное описание логики работы `async` и `defer` для классических и модульных скриптов.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async)
- **Схематическая диаграмма выполнения** — наглядное сравнение того, как fetch и выполнение скрипта соотносятся с работой HTML-парсера.

### blocking (Атрибут блокировки)

Новый атрибут, позволяющий явно указать, что определенные операции (например, рендеринг) должны быть приостановлены до загрузки ресурса.

- **HTML Standard: Section 2.5.8 Blocking attributes** — определение «блокирующих токенов», в частности токена `render`.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/urls-and-fetching.html#blocking-attributes](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#blocking-attributes)
- **Использование в элементах**:
  - В **`<link>`**: Блокировка рендеринга при загрузке стилей или критических ресурсов.
  - В **`<style>`**: Декларативная блокировка для внедренных стилей.
  - В **`<script>`**: Возможность сделать скрипт явно блокирующим рендеринг.

### Render Blocking (Механизм блокировки отрисовки)

Системный механизм браузера, определяющий, когда страница может быть показана пользователю.

- **HTML Standard: Section 3.1.6 Render-blocking mechanism** — описание набора блокирующих элементов документа и условий, при которых документ считается «render-blocked».
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/dom.html#render-blocking-mechanism](https://html.spec.whatwg.org/multipage/dom.html#render-blocking-mechanism)
- **Стилевые блокировки**: Определение того, как таблицы стилей вносят вклад в `script-blocking style sheet set`.

### Приоритеты браузера

Внутренняя логика браузеров по распределению ресурсов сети и процессора.

- **Fetch Standard: Section 4 (Internal priority)** — как браузер использует `priority`, `initiator` и тип назначения (`destination`) для установки внутреннего веса потока (например, в HTTP/2 или HTTP/3).
- **MDN Web Performance: Critical rendering path** — руководство по оптимизации последовательности шагов, которые браузер проходит для превращения кода в пиксели.
  - _Ссылка:_ [https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
- **MDN Web Performance: Speculative loading** — описание того, как браузер заранее разрешает DNS или устанавливает соединения на основе предсказаний.
