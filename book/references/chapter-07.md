Ниже представлены ссылки на источники и соответствующие разделы спецификаций для **Главы 7. Современные формы**.

### HTML Constraint Validation (Ограничения валидации)

Эта тема описывает механизмы, позволяющие браузеру проверять данные в полях ввода без использования JavaScript.

- **HTML Standard: Section 4.10.21.2 Constraint validation** — фундаментальное описание процесса проверки ограничений браузером.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constraint-validation](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constraint-validation)
- **MDN Guide: Using HTML form validation and the Constraint Validation API** — общее руководство по декларативной валидации (атрибуты `required`, `pattern` и др.).
  - _Ссылка:_ [https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)
- **HTML Standard: Section 4.10.21.1 Definitions (Validity states)** — перечень состояний невалидности, таких как «suffering from being missing» (отсутствие обязательного значения) или «suffering from a type mismatch» (несоответствие типу).

### Пользовательский опыт (User Experience)

Разделы, посвященные оптимизации взаимодействия пользователя с формами, особенно на мобильных устройствах.

- **HTML Standard: Section 4.10.1.6 Improving the user experience on mobile devices** — методы настройки виртуальных клавиатур и режимов ввода для улучшения UX.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/forms.html#improving-the-user-experience-on-mobile-devices](https://html.spec.whatwg.org/multipage/forms.html#improving-the-user-experience-on-mobile-devices)
- **HTML Standard: Section 4.10.1.7 The difference between the field type, the autofill field name, and the input modality** — подробное разъяснение того, как правильно комбинировать `type`, `autocomplete` и `inputmode`.
- **web.dev: Guidance to build modern web experiences** — общие рекомендации по созданию современных интерфейсов.
  - _Ссылка:_ [https://web.dev/](https://web.dev/)

### Browser Validation API

Программный интерфейс, позволяющий разработчикам управлять процессом валидации через JavaScript.

- **HTML Standard: Section 4.10.21.3 The constraint validation API** — спецификация свойств и методов, таких как `checkValidity()`, `reportValidity()` и `setCustomValidity()`.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api)
- **HTML Standard: The `ValidityState` interface** — описание объекта, содержащего результаты проверки элемента (свойства `valueMissing`, `patternMismatch`, `badInput` и т.д.).
- **HTML Standard: Section 4.10.5.4 Common input element APIs** — перечень API, общих для всех элементов ввода, включая методы управления валидацией.

### Progressive Enhancement (Прогрессивное улучшение)

Принципы обеспечения базовой функциональности форм с постепенным добавлением сложных возможностей.

- **HTML Standard: Section 4.13.1.6 Upgrading elements after their creation** — описание процесса «апгрейда» (upgrades), который позволяет элементам (например, веб-компонентам) оживать по мере загрузки скриптов, не нарушая работу страницы до этого момента.
  - _Ссылка:_ [https://html.spec.whatwg.org/multipage/custom-elements.html#upgrading-elements-after-their-creation](https://html.spec.whatwg.org/multipage/custom-elements.html#upgrading-elements-after-their-creation)
- **HTML Standard: Section 4.10.21.4 Security** — важное архитектурное примечание: клиентская валидация предназначена только для улучшения UX и не заменяет серверную проверку, что является основой философии PE.
- **web.dev: Progressive Web Apps (Learn PWA)** — учебные материалы по созданию надежных веб-приложений на базе современных стандартов.
  - _Ссылка:_ [https://web.dev/learn/pwa](https://web.dev/learn/pwa)
