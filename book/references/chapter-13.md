Ниже представлен список конкретных ссылок на источники и разделы спецификаций для **Главы 13. View Transition API**.

### HTML Navigation API и Single Page Applications (SPA)
Navigation API является ключевой технологией, обеспечивающей работу View Transitions в современных одностраничных приложениях.

*   **HTML Standard: Section 7.2.6 The navigation API** — основное описание интерфейса, пришедшего на смену устаревшим `history` и `location`.
*   **HTML Standard: Section 7.2.6.1 Introduction** — введение в Navigation API как веб-ориентированный способ управления историей и переходами в приложениях.
*   **HTML Standard: Section 7.2.6.10 The navigate event** — описание события `navigate`, которое позволяет перехватывать переходы и превращать их в SPA-навигацию с помощью метода `intercept()`.
*   **MDN Guide: Working with the History API** — справочный материал о предшественнике Navigation API для понимания контекста эволюции.

### Переходы между страницами и Multi Page Applications (MPA)
View Transition API расширяет свои возможности на нативные переходы между отдельными документами (Cross-document transitions).

*   **HTML Standard: Section 7.2.7.4 The PageSwapEvent interface** — спецификация события `pageswap`, возникающего непосредственно перед навигацией с текущей страницы.
*   **HTML Standard: Section 7.2.7.5 The PageRevealEvent interface** — спецификация события `pagereveal`, позволяющего активировать анимацию перехода при появлении новой страницы.
*   **HTML Standard: Setting up a cross-document view-transition** — алгоритм подготовки и настройки перехода между двумя разными документами.
*   **HTML Standard: Resolving inbound cross-document view-transition** — технические детали разрешения входящего перехода при загрузке новой страницы.

### Shared Element Transition и механизмы API
Разделы, описывающие захват снимков состояний и управление отрисовкой для создания эффекта «общих элементов».

*   **HTML Standard: Rendering suppression for view transitions** — механизм временного подавления отрисовки документа для подготовки снимков (snapshots) перехода.
*   **HTML Standard: ViewTransition interface** — описание программного интерфейса для управления жизненным циклом перехода.
*   **HTML Standard: Activate view transition** — шаги по активации и запуску процесса анимации между состояниями.

### Интеграция с CSS
Связь между структурой HTML, событиями навигации и декларативными анимациями CSS.

*   **HTML Standard: CSS View Transitions (Feature List)** — перечень возможностей, определяемых на стыке HTML и CSS, включая проверку того, может ли навигация инициировать переход.
*   **HTML Standard: View transition page visibility change steps** — описание того, как изменение видимости страницы (Page Visibility) интегрируется с процессом перехода.
*   **MDN Guide: Using the Web animation API** — руководство по смежной технологии анимаций, обеспечивающей плавность интерфейсов.

### История появления и дизайн
*   **HTML Standard: Section 1.7 Design notes** — информация о развитии стандартов и принципах обратной совместимости, которые легли в основу новых API.
*   **HTML Standard: Section 1.6 History** — исторический контекст развития языка HTML и его переход к модели Living Standard.