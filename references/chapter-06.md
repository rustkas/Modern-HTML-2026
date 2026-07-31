# 📚 Источники для Главы 6

- [**HTML Standard: The `<details>` element (WHATWG)**](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) — основной стандарт, определяющий `<details>` как виджет раскрытия (disclosure widget), описывающий логику атрибута `open` и механизм создания эксклюзивных аккордеонов через атрибут `name`.
- [**HTML Standard: The `<summary>` element (WHATWG)**](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-summary-element) — спецификация, описывающая роль первого дочернего элемента `<summary>` как легенды или заголовка для раскрывающегося контента.
- [**MDN Web Docs: `<details>`: The Details disclosure element**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) — руководство по использованию элемента для создания FAQ и интерактивных зон без использования JavaScript.
- [**HTML Standard: Interaction with details and `hidden=until-found`**](https://html.spec.whatwg.org/multipage/interaction.html#interaction-with-details-and-hidden=until-found) — раздел, объясняющий, как браузерный поиск по странице (find-in-page) автоматически раскрывает скрытый контент внутри `<details>`.
- [**ARIA Authoring Practices Guide (APG): Disclosure (Show/Hide) Pattern**](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) — рекомендации по обеспечению доступности виджетов раскрытия и правильному управлению состояниями для вспомогательных технологий.
- [**HTML Standard: Scripting (Declarative alternatives)**](https://html.spec.whatwg.org/multipage/scripting.html#scripting) — раздел, поощряющий использование декларативных элементов, таких как `<details>`, вместо написания лишнего JavaScript-кода для управления видимостью.

### Ключевые концепции из источников:

- **Эксклюзивный аккордеон**: Использование атрибута `name` позволяет связать несколько элементов `<details>` в группу, где открытие одного автоматически закрывает остальные.
- **Доступность (Accessibility)**: Группировка связанных элементов важна для понимания структуры документа пользователями скринридеров.
- **Стилизация и анимация**: Состояние виджета отражается через атрибут `open`, что позволяет использовать CSS-переходы для плавной смены стилей.
- **События**: При изменении состояния элемента генерируется событие `toggle`, на которое можно подписаться в скриптах.
