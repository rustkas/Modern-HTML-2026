# Modern HTML 2026

## Семантика, Web Platform и архитектура современных интерфейсов

> Книга о современном HTML как фундаментальной технологии Web Platform.  
> Не просто набор тегов, а язык структуры, поведения, доступности и взаимодействия с возможностями современного браузера.

---

## 📖 О книге

За последние десять лет HTML сильно изменился.

Сегодня HTML — это уже не просто язык разметки документов. Это полноценный декларативный интерфейс к возможностям браузера:

- интерактивные элементы без JavaScript;
- встроенные механизмы доступности;
- управление загрузкой ресурсов;
- современные API браузера;
- Web Components;
- поддержка SSR и современных архитектур приложений.

Современные фреймворки:

- Angular
- React
- Vue
- Svelte
- Astro
- Qwik

не заменяют HTML.

Они строятся **поверх HTML**, используя его как основу.

Эта книга показывает HTML как часть современной Web Platform.

---

# 🎯 Цель книги

После изучения книги читатель должен понимать:

- как браузер превращает HTML в работающий интерфейс;
- как строить семантические документы;
- как использовать современные HTML API;
- как создавать доступные компоненты;
- как оптимизировать загрузку приложения;
- как использовать Web Components;
- как проектировать HTML-архитектуру больших приложений.

---

# 👥 Для кого эта книга

Книга предназначена для:

- Frontend-разработчиков;
- Angular / React / Vue / Svelte разработчиков;
- архитекторов интерфейсов;
- разработчиков дизайн-систем;
- специалистов по Web Performance;
- всех, кто хочет понимать современную веб-платформу.

---

# 🧠 Главная идея

Современный frontend строится на трёх фундаментальных технологиях:

```
HTML
 |
 |-- структура и смысл

CSS
 |
 |-- внешний вид и layout

JavaScript / TypeScript
 |
 |-- логика и поведение
```

Фреймворки являются дополнительным уровнем:

```
Angular
React
Vue
Svelte

        ↓

HTML + CSS + JavaScript

        ↓

Browser Web Platform
```

---

# 📚 Содержание

# Предисловие

## Почему HTML снова стал одной из важнейших технологий фронтенда

- От HTML4 к HTML Living Standard
- Почему современные фреймворки не заменяют HTML
- HTML как часть Web Platform
- Что изменилось за последние десять лет

[📖 Читать главу](./book/preface.md)  
[📚 Литература](./references/preface.md)  
---

# Часть I. HTML как язык структуры

## Глава 1. Документ как модель данных

Темы:

- DOM как дерево документа
- Семантика против оформления
- Документ против приложения
- HTML и доступность
- HTML и SEO


---

## Глава 2. Современная семантика

Темы:

- `<header>`
- `<main>`
- `<footer>`
- `<article>`
- `<section>`
- `<aside>`
- `<figure>`
- `<figcaption>`
- `<time>`
- `<address>`
- Когда использовать `<div>`


---

## Глава 3. HTML как API браузера

Темы:

- Эволюция HTML Living Standard
- Новые элементы появляются постоянно
- HTML как декларативный интерфейс браузера
- Declarative vs Imperative Programming


---

# Часть II. Современные интерактивные элементы

## Глава 4. `<dialog>`

Темы:

- Почему модальные окна перестали быть JavaScript-компонентами
- `show()`
- `showModal()`
- `close()`
- Focus management
- Accessibility
- Вложенные диалоги
- Типичные ошибки


---

## Глава 5. Popover API

Темы:

- История появления
- `popover`
- `popovertarget`
- `auto`
- `manual`
- `hint`
- Dropdown
- Context Menu
- Tooltip
- Command Palette
- Popover + CSS Anchor Positioning


---

## Глава 6. `<details>` и `<summary>`

Темы:

- FAQ
- Accordion
- Disclosure Widget
- Без JavaScript
- Анимации


---

# Часть III. Формы нового поколения

## Глава 7. Современные формы

Темы:

- HTML Constraint Validation
- Пользовательский опыт
- Browser Validation API
- Progressive Enhancement


---

## Глава 8. Новые атрибуты форм

Темы:

- `enterkeyhint`
- `inputmode`
- `autocomplete`
- `autocapitalize`
- `spellcheck`
- `virtualkeyboardpolicy`
- `dirname`
- `pattern`
- `inert`


---

## Глава 9. Формы и Accessibility

Темы:

- Label
- Fieldset
- Legend
- Error Messages
- Live Regions
- Keyboard Navigation


---

# Часть IV. Производительность начинается с HTML

## Глава 10. Современная загрузка ресурсов

Темы:

- `preload`
- `prefetch`
- `preconnect`
- `dns-prefetch`
- `modulepreload`
- `prerender`
- Speculation Rules API


---

## Глава 11. Приоритеты загрузки

Темы:

- `fetchpriority`
- `async`
- `defer`
- `blocking`
- Render Blocking
- Приоритеты браузера


---

## Глава 12. Современная работа с изображениями

Темы:

- `<picture>`
- `<source>`
- `srcset`
- `sizes`
- AVIF
- WebP
- `loading="lazy"`
- `decoding="async"`
- Responsive Images


---

# Часть V. HTML и современные браузерные API

## Глава 13. View Transition API

Темы:

- История появления
- Multi Page Applications
- Single Page Applications
- HTML Navigation API
- Переходы между страницами
- Shared Element Transition
- Интеграция с CSS


---

## Глава 14. Navigation API

Темы:

- Современная навигация
- История браузера
- SPA
- MPA
- HTML Navigation


---

## Глава 15. Declarative Shadow DOM

Темы:

- Почему появился
- SSR
- SEO
- Производительность
- Гидратация
- Shadow Root
- Практические сценарии


---

# Часть VI. Web Components

## Глава 16. Custom Elements

Темы:

- Регистрация компонентов
- Lifecycle
- Атрибуты
- Properties
- Events


---

## Глава 17. Shadow DOM

Темы:

- Изоляция компонентов
- Slot
- Template
- Styling
- Accessibility


---

## Глава 18. HTML Templates

Темы:

- `<template>`
- `<slot>`
- Повторное использование
- Клонирование
- Серверный рендеринг


---

## Глава 19. Web Components и современные фреймворки

Темы:

- Angular Elements
- React
- Vue
- Svelte
- Lit
- Stencil
- Межфреймворковое взаимодействие


---

# Часть VII. HTML и производительность

## Глава 20. Critical Rendering Path

Темы:

- HTML Parser
- CSSOM
- Render Tree
- Layout
- Paint
- Composite


---

## Глава 21. HTML как инструмент оптимизации

Темы:

- Lazy Loading
- Resource Hints
- Priority Hints
- Responsive Images
- Streaming HTML
- Partial Hydration


---

## Глава 22. Progressive Enhancement

Темы:

- Почему идея снова актуальна
- HTML First
- CSS First
- JavaScript Last
- Graceful Degradation


---

# Часть VIII. Архитектура HTML

## Глава 23. Компонентное мышление

Темы:

- HTML как контракт компонента
- Семантика компонентов
- Инварианты
- API компонентов


---

## Глава 24. HTML и Design Systems

Темы:

- Design Tokens
- Семантическая структура
- Переиспользуемые шаблоны
- Accessibility by Design


---

## Глава 25. HTML в эпоху SSR

Темы:

- Angular SSR
- React Server Components
- Astro
- Qwik
- Hydration
- Islands Architecture


---

## Глава 26. Полностью современное приложение

Практическая разработка приложения с использованием:

- Семантического HTML
- `<dialog>`
- Popover API
- Declarative Shadow DOM
- Web Components
- Современных форм
- Resource Hints
- View Transition API
- Progressive Enhancement


---

# 📚 Источники

Основные источники:

- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
- [web.dev](https://web.dev/)
- [Chrome Developers](https://developer.chrome.com/)
- [Mozilla Hacks](https://hacks.mozilla.org/)

---

# 🧪 Практический подход

Каждая глава содержит:

- объяснение концепций;
- ссылки на спецификации;
- практические примеры;
- рекомендации;
- типичные ошибки;
- задания;
- ссылки для дальнейшего изучения.

---

# 📌 Статус проекта

🚧 В разработке

Версия: 0.1

Цель:
создать современный учебник по HTML, ориентированный на разработчиков 2026 года.

---

# Лицензия

MIT
