Ниже приведен список ссылок на разделы спецификаций и справочные материалы для **Главы 16. Custom Elements**.

### Регистрация компонентов

Процесс определения новых элементов и их добавления в реестр браузера для последующего использования в разметке.

- **HTML Standard: Section 4.13.4 The `CustomElementRegistry` interface** — описание программного интерфейса для управления пользовательскими элементами.
- **HTML Standard: Section 4.13.4.1 The `define()` method** — технические детали и алгоритмы регистрации автономных элементов и настроенных встроенных элементов.
- **MDN: `CustomElementRegistry.define()`** — практическое руководство по использованию метода для регистрации компонентов.
- **HTML Standard: Section 4.13.1.7 Scoped custom element registries** — использование изолированных реестров для предотвращения конфликтов имен между библиотеками.

### Lifecycle (Жизненный цикл)

Специальные функции обратного вызова, которые позволяют компоненту реагировать на изменения в его состоянии или положении в дереве документа.

- **HTML Standard: Section 4.13.6 Custom element reactions** — спецификация реакций жизненного цикла, таких как подключение, отключение и перемещение элемента.
- **HTML Standard: Section 4.13.6.1 Lifecycle callbacks** — детальный перечень колбэков: `connectedCallback`, `disconnectedCallback`, `adoptedCallback` и `attributeChangedCallback`.
- **HTML Standard: Section 4.13.2.1 Preserving custom element state when moved** — описание нового колбэка `connectedMoveCallback` для оптимизации перемещения элементов без сброса их состояния.
- **HTML Standard: Section 4.13.7.3 Form-associated custom elements** — дополнительные жизненные циклы для компонентов, интегрированных в формы (`formAssociatedCallback`, `formResetCallback` и др.).

### Атрибуты (Content Attributes)

Механизмы декларативной настройки компонентов через HTML-атрибуты и отслеживание их изменений.

- **HTML Standard: Section 4.13.3 Core concepts (Attributes)** — правила именования и использования атрибутов в автономных кастомных элементах.
- **HTML Standard: Observed attributes** — использование статического свойства `observedAttributes` для указания списка атрибутов, за которыми должен следить браузер.
- **DOM Standard: Section 4.9.2 Interface `Attr`** — базовое определение атрибутов как структурных особенностей элементов.
- **HTML Standard: Section 4.13.1.8 Exposing custom element states** — использование псевдокласса `:state()` для отражения внутреннего состояния компонента через атрибуты и CSS.

### Properties (IDL Attributes / Свойства)

Программный доступ к состоянию компонента через JavaScript и синхронизация (Reflection) с атрибутами контента.

- **HTML Standard: Section 3.2.3 HTML element constructors** — описание использования конструктора и механизма `[HTMLConstructor]` для создания объектов элементов.
- **HTML Standard: Section 2.6.1 Reflecting content attributes in IDL attributes** — принципы отражения значений атрибутов в свойствах объекта JavaScript.
- **HTML Standard: Section 4.13.7.1 The `ElementInternals` interface** — доступ к внутренним свойствам элемента, таким как состояние валидности или метки `labels`, закрытый для внешних потребителей.

### Events (События)

Механизмы сигнализации о внутренних действиях компонента и взаимодействие с системой событий браузера.

- **DOM Standard: Section 2.4 Interface `CustomEvent`** — создание и использование событий, способных переносить произвольные данные в свойстве `detail`.
- **DOM Standard: Section 2.9 Dispatching events** — алгоритм отправки событий, включая правила всплытия (bubbling) и прохождения через границы Shadow DOM.
- **MDN: `Event.composed`** — описание свойства, определяющего, будет ли событие выходить за пределы теневого дерева в основной DOM.
- **HTML Standard: Section 4.10.18.5 slotchange event** — встроенное событие, уведомляющее об изменении узлов, распределенных по слотам компонента.

Эти источники предоставляют полную техническую базу для разработки, регистрации и управления жизненным циклом современных веб-компонентов.
