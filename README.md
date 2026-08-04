# Modern HTML 2026

## Semantics, Web Platform, and Architecture of Modern Interfaces

> A book about modern HTML as the foundational technology of the Web Platform.  
> Not just a set of tags, but a language of structure, behavior, accessibility, and interaction with modern browser capabilities.

---

## 📖 About the Book

Over the past ten years, HTML has changed dramatically.

Today, HTML is no longer just a document markup language. It is a fully-fledged declarative interface to browser capabilities:

- Interactive elements without JavaScript;
- Built-in accessibility mechanisms;
- Resource loading management;
- Modern browser APIs;
- Web Components;
- Support for SSR and modern application architectures.

Modern frameworks:

- Angular
- React
- Vue
- Svelte
- Astro
- Qwik

do not replace HTML.

They are built **on top of HTML**, using it as their foundation.

This book presents HTML as an integral part of the modern Web Platform.

---

# 🎯 Book's Goal

After studying this book, the reader should understand:

- how the browser transforms HTML into a working interface;
- how to build semantic documents;
- how to use modern HTML APIs;
- how to create accessible components;
- how to optimize application loading;
- how to use Web Components;
- how to design HTML architecture for large applications.

---

# 👥 Who This Book Is For

This book is intended for:

- Frontend developers;
- Angular / React / Vue / Svelte developers;
- UI architects;
- Design system developers;
- Web Performance specialists;
- Anyone who wants to understand the modern web platform.

---

# 🧠 The Main Idea

Modern frontend is built on three fundamental technologies:

```
HTML
 |
 |-- structure and meaning

CSS
 |
 |-- appearance and layout

JavaScript / TypeScript
 |
 |-- logic and behavior
```

Frameworks serve as an additional layer:

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

# 📚 Table of Contents

# Preface

## Why HTML Has Once Again Become One of the Most Important Frontend Technologies

- From HTML4 to HTML Living Standard
- Why modern frameworks don't replace HTML
- HTML as part of the Web Platform
- What has changed over the past ten years

* [📖 Read chapter](./book/preface.md)
* [📚 References](./references/preface.md)
* [💻 Examples](./examples/preface.md)
* [🧪 Exercises](./exercises/preface.md)

---

# Part I. HTML as a Language of Structure

## Chapter 1. The Document as a Data Model

Topics:

- DOM as the document tree
- Semantics vs. presentation
- Document vs. application
- HTML and accessibility
- HTML and SEO

* [📖 Read chapter](./book/chapter-01.md)
* [📚 References](./references/chapter-01.md)
* [💻 Examples](./examples/chapter-01.md)
* [🧪 Exercises](./exercises/chapter-01.md)

---

## Chapter 2. Modern Semantics

Topics:

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
- When to use `<div>`

* [📖 Read chapter](./book/chapter-02.md)
* [📚 References](./references/chapter-02.md)
* [💻 Examples](./examples/chapter-02.md)
* [🧪 Exercises](./exercises/chapter-02.md)

---

## Chapter 3. HTML as a Browser API

Topics:

- Evolution of HTML Living Standard
- New elements are constantly emerging
- HTML as a declarative browser interface
- Declarative vs. Imperative Programming

* [📖 Read chapter](./book/chapter-03.md)
* [📚 References](./references/chapter-03.md)
* [💻 Examples](./examples/chapter-03.md)
* [🧪 Exercises](./exercises/chapter-03.md)

---

# Part II. Modern Interactive Elements

## Chapter 4. `<dialog>`

Topics:

- Why modal dialogs are no longer JavaScript components
- `show()`
- `showModal()`
- `close()`
- Focus management
- Accessibility
- Nested dialogs
- Common mistakes

* [📖 Read chapter](./book/chapter-04.md)
* [📚 References](./references/chapter-04.md)
* [💻 Examples](./examples/chapter-04.md)
* [🧪 Exercises](./exercises/chapter-04.md)

---

## Chapter 5. Popover API

Topics:

- History of its emergence
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

* [📖 Read chapter](./book/chapter-05.md)
* [📚 References](./references/chapter-05.md)
* [💻 Examples](./examples/chapter-05.md)
* [🧪 Exercises](./exercises/chapter-05.md)

---

## Chapter 6. `<details>` and `<summary>`

Topics:

- FAQ
- Accordion
- Disclosure Widget
- Without JavaScript
- Animations

* [📖 Read chapter](./book/chapter-06.md)
* [📚 References](./references/chapter-06.md)
* [💻 Examples](./examples/chapter-06.md)
* [🧪 Exercises](./exercises/chapter-06.md)

---

# Part III. Next-Generation Forms

## Chapter 7. Modern Forms

Topics:

- HTML Constraint Validation
- User experience
- Browser Validation API
- Progressive Enhancement

* [📖 Read chapter](./book/chapter-07.md)
* [📚 References](./references/chapter-07.md)
* [💻 Examples](./examples/chapter-07.md)
* [🧪 Exercises](./exercises/chapter-07.md)

---

## Chapter 8. New Form Attributes

Topics:

- `enterkeyhint`
- `inputmode`
- `autocomplete`
- `autocapitalize`
- `spellcheck`
- `virtualkeyboardpolicy`
- `dirname`
- `pattern`
- `inert`

* [📖 Read chapter](./book/chapter-08.md)
* [📚 References](./references/chapter-08.md)
* [💻 Examples](./examples/chapter-08.md)
* [🧪 Exercises](./exercises/chapter-08.md)

---

## Chapter 9. Forms and Accessibility

Topics:

- Label
- Fieldset
- Legend
- Error Messages
- Live Regions
- Keyboard Navigation

* [📖 Read chapter](./book/chapter-09.md)
* [📚 References](./references/chapter-09.md)
* [💻 Examples](./examples/chapter-09.md)
* [🧪 Exercises](./exercises/chapter-09.md)

---

# Part IV. Performance Starts with HTML

## Chapter 10. Modern Resource Loading

Topics:

- `preload`
- `prefetch`
- `preconnect`
- `dns-prefetch`
- `modulepreload`
- `prerender`
- Speculation Rules API

* [📖 Read chapter](./book/chapter-10.md)
* [📚 References](./references/chapter-10.md)
* [💻 Examples](./examples/chapter-10.md)
* [🧪 Exercises](./exercises/chapter-10.md)

---

## Chapter 11. Loading Priorities

Topics:

- `fetchpriority`
- `async`
- `defer`
- `blocking`
- Render Blocking
- Browser priorities

* [📖 Read chapter](./book/chapter-11.md)
* [📚 References](./references/chapter-11.md)
* [💻 Examples](./examples/chapter-11.md)
* [🧪 Exercises](./exercises/chapter-11.md)

---

## Chapter 12. Modern Image Handling

Topics:

- `<picture>`
- `<source>`
- `srcset`
- `sizes`
- AVIF
- WebP
- `loading="lazy"`
- `decoding="async"`
- Responsive Images

* [📖 Read chapter](./book/chapter-12.md)
* [📚 References](./references/chapter-12.md)
* [💻 Examples](./examples/chapter-12.md)
* [🧪 Exercises](./exercises/chapter-12.md)

---

# Part V. HTML and Modern Browser APIs

## Chapter 13. View Transition API

Topics:

- History of its emergence
- Multi Page Applications
- Single Page Applications
- HTML Navigation API
- Page transitions
- Shared Element Transition
- Integration with CSS

* [📖 Read chapter](./book/chapter-13.md)
* [📚 References](./references/chapter-13.md)
* [💻 Examples](./examples/chapter-13.md)
* [🧪 Exercises](./exercises/chapter-13.md)

---

## Chapter 14. Navigation API

Topics:

- Modern navigation
- Browser history
- SPA
- MPA
- HTML Navigation

* [📖 Read chapter](./book/chapter-14.md)
* [📚 References](./references/chapter-14.md)
* [💻 Examples](./examples/chapter-14.md)
* [🧪 Exercises](./exercises/chapter-14.md)

---

## Chapter 15. Declarative Shadow DOM

Topics:

- Why it emerged
- SSR
- SEO
- Performance
- Hydration
- Shadow Root
- Practical scenarios

* [📖 Read chapter](./book/chapter-15.md)
* [📚 References](./references/chapter-15.md)
* [💻 Examples](./examples/chapter-15.md)
* [🧪 Exercises](./exercises/chapter-15.md)
*

---

# Part VI. Web Components

## Chapter 16. Custom Elements

Topics:

- Component registration
- Lifecycle
- Attributes
- Properties
- Events

* [📖 Read chapter](./book/chapter-16.md)
* [📚 References](./references/chapter-16.md)
* [💻 Examples](./examples/chapter-16.md)
* [🧪 Exercises](./exercises/chapter-16.md)

---

## Chapter 17. Shadow DOM

Topics:

- Component isolation
- Slot
- Template
- Styling
- Accessibility

* [📖 Read chapter](./book/chapter-17.md)
* [📚 References](./references/chapter-17.md)
* [💻 Examples](./examples/chapter-17.md)
* [🧪 Exercises](./exercises/chapter-17.md)

---

## Chapter 18. HTML Templates

Topics:

- `<template>`
- `<slot>`
- Reusability
- Cloning
- Server-side rendering

* [📖 Read chapter](./book/chapter-18.md)
* [📚 References](./references/chapter-18.md)
* [💻 Examples](./examples/chapter-18.md)
* [🧪 Exercises](./exercises/chapter-18.md)

---

## Chapter 19. Web Components and Modern Frameworks

Topics:

- Angular Elements
- React
- Vue
- Svelte
- Lit
- Stencil
- Cross-framework interaction

* [📖 Read chapter](./book/chapter-19.md)
* [📚 References](./references/chapter-19.md)
* [💻 Examples](./examples/chapter-19.md)
* [🧪 Exercises](./exercises/chapter-19.md)

---

# Part VII. HTML and Performance

## Chapter 20. Critical Rendering Path

Topics:

- HTML Parser
- CSSOM
- Render Tree
- Layout
- Paint
- Composite

* [📖 Read chapter](./book/chapter-20.md)
* [📚 References](./references/chapter-20.md)
* [💻 Examples](./examples/chapter-20.md)
* [🧪 Exercises](./exercises/chapter-20.md)

---

## Chapter 21. HTML as an Optimization Tool

Topics:

- Lazy Loading
- Resource Hints
- Priority Hints
- Responsive Images
- Streaming HTML
- Partial Hydration

* [📖 Read chapter](./book/chapter-21.md)
* [📚 References](./references/chapter-21.md)
* [💻 Examples](./examples/chapter-21.md)
* [🧪 Exercises](./exercises/chapter-21.md)

---

## Chapter 22. Progressive Enhancement

Topics:

- Why the idea is relevant again
- HTML First
- CSS First
- JavaScript Last
- Graceful Degradation

* [📖 Read chapter](./book/chapter-22.md)
* [📚 References](./references/chapter-22.md)
* [💻 Examples](./examples/chapter-22.md)
* [🧪 Exercises](./exercises/chapter-22.md)

---

# Part VIII. HTML Architecture

## Chapter 23. Component Thinking

Topics:

- HTML as a component contract
- Component semantics
- Invariants
- Component APIs

* [📖 Read chapter](./book/chapter-23.md)
* [📚 References](./references/chapter-23.md)
* [💻 Examples](./examples/chapter-23.md)
* [🧪 Exercises](./exercises/chapter-23.md)

---

## Chapter 24. HTML and Design Systems

Topics:

- Design Tokens
- Semantic structure
- Reusable templates
- Accessibility by Design

* [📖 Read chapter](./book/chapter-24.md)
* [📚 References](./references/chapter-24.md)
* [💻 Examples](./examples/chapter-24.md)
* [🧪 Exercises](./exercises/chapter-24.md)

---

## Chapter 25. HTML in the Age of SSR

Topics:

- Angular SSR
- React Server Components
- Astro
- Qwik
- Hydration
- Islands Architecture

* [📖 Read chapter](./book/chapter-25.md)
* [📚 References](./references/chapter-25.md)
* [💻 Examples](./examples/chapter-25.md)
* [🧪 Exercises](./exercises/chapter-25.md)

---

## Chapter 26. A Fully Modern Application

Practical development of an application using:

- Semantic HTML
- `<dialog>`
- Popover API
- Declarative Shadow DOM
- Web Components
- Modern forms
- Resource Hints
- View Transition API
- Progressive Enhancement

* [📖 Read chapter](./book/chapter-26.md)
* [📚 References](./references/chapter-26.md)
* [💻 Examples](./examples/chapter-26.md)
* [🧪 Exercises](./exercises/chapter-26.md)

---

## Chapter 27. HTML as the Foundation of the Web Platform

- Living Standard
- New APIs
- The impact of artificial intelligence on the web
- Declarative Web
- What will likely appear in HTML by 2030

* [📖 Read chapter](./book/chapter-27.md)
* [📚 References](./references/chapter-27.md)
* [💻 Examples](./examples/chapter-27.md)
* [🧪 Exercises](./exercises/chapter-27.md)

---

# 📚 Sources

Primary sources:

- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
- [web.dev](https://web.dev/)
- [Chrome Developers](https://developer.chrome.com/)
- [Mozilla Hacks](https://hacks.mozilla.org/)

---

# 🧪 Practical Approach

Each chapter contains:

- concept explanations;
- links to specifications;
- practical examples;
- recommendations;
- common mistakes;
- assignments;
- links for further study.

---

# 📌 Project Status

🚧 Under development

Version: 0.1

Goal:
to create a modern HTML textbook aimed at 2026 developers.

---

# License

MIT
