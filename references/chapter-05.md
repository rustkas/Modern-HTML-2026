# 📚 Источники для Главы 5

- [**MDN Web Docs: Popover API**](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — основное руководство по API, описывающее концепции модальных и немодальных всплывающих окон, а также типичные варианты использования, такие как меню и уведомления.
- [**HTML Standard: The `popover` attribute (WHATWG)**](https://html.spec.whatwg.org/multipage/popover.html#dom-popover) — техническая спецификация, определяющая глобальный атрибут `popover`, его состояния (`auto`, `manual`, `hint`) и алгоритмы отображения в верхнем слое (Top Layer).
- [**HTML Standard: Popover target attributes**](https://html.spec.whatwg.org/multipage/popover.html#attr-popovertarget) — раздел стандарта, описывающий атрибуты управления `popovertarget` и `popovertargetaction`, которые позволяют декларативно связывать кнопки с всплывающими элементами.
- [**MDN Web Docs: `popover` global attribute**](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — подробное описание состояний атрибута, включая поддержку «легкого закрытия» (light dismiss) для состояния `auto` и программное управление для `manual`.
- [**CSS Anchor Positioning (WHATWG/W3C)**](https://html.spec.whatwg.org/multipage/infrastructure.html#css-anchor-positioning) — описание механизма неявной связи (implicit anchor) между триггером и поповером для автоматического позиционирования.
- [**web.dev: Baseline 2025**](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility) — информация о статусе технологии, которая стала общедоступной и стабильной во всех современных браузерах с января 2025 года.

### Ключевые технические детали:
*   **Top Layer**: Поповеры автоматически отрисовываются поверх всего контента документа, игнорируя иерархию `z-index`.
*   **Стилизация**: Для оформления используются специфичные инструменты CSS, такие как псевдокласс [`:popover-open`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:popover-open) и псевдоэлемент [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::backdrop).
*   **События**: API предоставляет события [`beforetoggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforetoggle_event) (позволяет отменить действие) и [`toggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/toggle_event) для реакции на изменение состояния.