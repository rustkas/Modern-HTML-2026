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

---

# Chapter 1. The Document as a Data Model

## Why This Chapter Is Relevant in 2026

At first glance, it might seem that there couldn't possibly be anything new in the first chapter.

The DOM has existed since the late 1990s, HTML has been studied for decades, and the principles of semantic markup emerged back in the HTML5 era. It would appear that everything important has long since been written.

However, it is precisely in recent years that a fundamental shift in HTML's role has occurred.

The language itself hasn't changed.

The **Web Platform** has changed.

Today, HTML has ceased to be merely a document markup language. It has transformed into a universal declarative language for describing user interfaces and the primary data source for numerous browser subsystems.

If it was once believed that HTML, after page load, is transformed into the DOM, then in 2026, that explanation is no longer sufficient.

Modern HTML is simultaneously used by:

- the DOM for document representation;
- the CSS Engine for building visual styling;
- the Rendering Engine for creating the Render Tree;
- the Accessibility Engine for building the Accessibility Tree;
- the JavaScript Runtime for working with browser APIs;
- search engines;
- Server-Side Rendering mechanisms;
- component hydration systems;
- browser extensions;
- artificial intelligence and software agents.

Schematically, the modern architecture looks as follows:

```text
                           HTML
                             │
     ┌───────────────────────┼────────────────────────┐
     │                       │                        │
     ▼                       ▼                        ▼
    DOM               Accessibility Tree        CSS Engine
     │                       │                        │
     │                       │                        ▼
     │                       │                  Render Tree
     │                       │                        │
     ▼                       ▼                        ▼
JavaScript API         Screen Readers            Rendering
     │
     ├────────► Search Engines
     ├────────► SSR / Hydration
     ├────────► Browser Extensions
     ├────────► AI Agents
     └────────► Web Platform APIs
```

This means that HTML can no longer be viewed exclusively as a language intended for displaying pages.

In the modern architecture of web applications, HTML becomes a **universal data model** describing the structure, meaning, and behavior of an interface.

## Why This Chapter Is Needed

After studying this chapter, you will be able to:

- understand HTML as a data model, not just a set of tags;
- explain why the DOM is the foundation of any web page;
- distinguish between the concepts of structure, presentation, and behavior;
- understand the role of semantics in the operation of browsers, search engines, and accessibility technologies;
- consciously choose HTML elements when designing interfaces.

---

# HTML as a Declarative Document Model

One of the most common mistakes made by beginner developers is perceiving HTML solely as a visual markup language.

In reality, HTML **does not describe the page's appearance**.

It describes:

- the document's structure;
- the meaning of its parts;
- relationships between elements;
- points of user interaction with the application.

In other words, HTML answers the question:

> **What is this object?**

not

> **What should it look like?**

CSS is responsible for appearance.

JavaScript is responsible for behavior.

HTML defines the data structure that all other web platform technologies work with.

---

# DOM as the Document Tree

In the modern understanding, the **DOM (Document Object Model)** is a platform-independent object model of a document.

After loading HTML, the browser performs **parsing** and builds an internal representation of the page—the **DOM tree**.

```
Document
│
└── html
    ├── head
    │   ├── meta
    │   ├── title
    │   └── link
    │
    └── body
        ├── header
        ├── main
        │   ├── article
        │   └── section
        └── footer
```

Each HTML element becomes an object in the browser's memory.

Such objects are called **nodes**.

The DOM contains various types of nodes:

| Type               | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `Document`         | Root of the document                          |
| `DocumentType`     | Document type information (`<!DOCTYPE html>`) |
| `Element`          | HTML elements                                 |
| `Text`             | Text nodes                                    |
| `Comment`          | Comments                                      |
| `DocumentFragment` | Temporary document fragments                  |

It is with these objects that JavaScript, CSS, browser APIs, and modern frameworks work.

It is important to understand that the HTML file and the DOM are different entities.

```
HTML

↓

Parser

↓

DOM Tree

↓

CSSOM

↓

Render Tree

↓

Layout

↓

Paint
```

HTML is the source code.

DOM is the internal model of the document.

---

# Document as a Data Graph

The DOM is often called a tree.

From an architectural perspective, it is indeed a **directed tree of objects** with the following properties:

- one root node;
- each node has a single parent;
- each node can have many children;
- the structure fully describes the document.

This approach makes HTML similar to working with AST (Abstract Syntax Tree) in compilers.

The browser effectively compiles HTML into an object model, which is then used by all browser subsystems.

---

# Semantics vs. Presentation

One of the most important principles of HTML is **semantic markup**.

An HTML element describes not the appearance of an object, but its meaning.

For example:

```html
<article></article>
```

means:

> This is an independent publication.

not

> Draw a rectangle.

Likewise

```html
<nav></nav>
```

means:

> Navigation.

not

> A horizontal block.

CSS independently decides how this navigation should look.

---

## Why This Matters

When HTML is used as intended, all participants benefit:

- the browser;
- search engines;
- screen reader programs;
- machine analysis tools;
- artificial intelligence;
- developers.

This is precisely why modern HTML is called a **semantic language for describing documents**.

---

# Document vs. Application

Historically, HTML was created for publishing scientific documents.

However, the evolution of browsers gradually transformed the web into a universal application platform.

Despite this, the HTML specification still uses the term **document**.

Why?

Because even a complex web application remains a document.

For example:

- online stores;
- CRMs;
- image editors;
- IDEs in the browser;
- email clients.

All of them contain:

- headings;
- forms;
- buttons;
- menus;
- tables;
- dialogs.

In other words, an application is a document with a large number of interactive components.

Modern HTML is gradually expanding precisely in this direction.

New elements are appearing:

- `<dialog>`
- Popover API
- Declarative Shadow DOM
- View Transitions
- Navigation API

HTML is becoming a declarative way to describe an application interface.

---

# HTML and Accessibility

One of HTML's most significant advantages is its built-in support for **Accessibility (A11y)**.

The browser automatically builds another document model—the **Accessibility Tree**.

```
HTML

↓

DOM

↓

Accessibility Tree

↓

Screen Reader
```

Screen reader programs work with this structure.

If the developer uses:

```html
<button></button>
```

the browser already knows:

- that this is a button;
- that it can be activated with the Space key;
- that it can be activated with the Enter key;
- how to announce it to the user.

If instead

```html
<div onclick="..."></div>
```

is used, the browser knows none of this.

The developer has to implement everything themselves.

That's why one of the most important rules of modern web development exists:

> **Use native HTML before writing JavaScript.**

---

# HTML and SEO

For search engines, HTML is the primary source of information about a page.

Search crawlers analyze:

- document structure;
- headings;
- links;
- articles;
- images;
- navigation;
- metadata.

The more semantic the markup, the easier it is for search engines to understand the page's content.

Modern HTML also provides additional mechanisms:

- Microdata;
- RDFa;
- JSON-LD;
- Open Graph;
- Schema.org.

These are what transform an ordinary page into a structured data source.

Today, HTML is read not only by search engines.

It is analyzed by:

- voice assistants;
- generative AI;
- browsers;
- accessibility programs;
- search crawlers;
- various automated agents.

That's why semantics are becoming increasingly important.

---

# HTML as the Web Platform Contract

One of the main ideas in modern web development is understanding HTML as a **contract** between the developer and the browser.

The developer describes:

- structure;
- meaning;
- interactive elements.

The browser guarantees:

- DOM construction;
- Accessibility Tree creation;
- operation of built-in elements;
- integration with CSS;
- integration with JavaScript;
- interaction with browser APIs.

That's precisely why modern frameworks practically do not create their own markup language.

## They use HTML as the universal language for interacting with the Web Platform.

---

# What Has Changed After 2025?

Paradoxically, **HTML itself has barely changed**.

Something else has changed:

> **The number of systems that use HTML as a data source has changed.**

This is the main change in the Web Platform in recent years.

---

## 1. HTML Is No Longer Input Only for the Browser

In older books, the process looked like this:

```text
HTML

↓

DOM

↓

CSS + JavaScript

↓

Page
```

This no longer reflects the modern browser architecture.

In 2026, HTML becomes the source data for multiple independent subsystems simultaneously.

```text
                    HTML
                      │
      ┌───────────────┼────────────────┐
      │               │                │
      ▼               ▼                ▼
     DOM       Accessibility Tree   CSS Parser
      │                                │
      ▼                                ▼
 JavaScript                      Render Tree
      │
      ├────────► View Transition API
      │
      ├────────► Navigation API
      │
      ├────────► Declarative Shadow DOM
      │
      ├────────► AI Agents
      │
      ├────────► Search Engines
      │
      └────────► Browser Extensions
```

> HTML is no longer just a document model for the browser. It is a universal data model for the entire Web Platform.

---

# 2. The DOM Is No Longer the Primary Model

HTML books have always written:

> HTML transforms into the DOM.

Today, this is an oversimplification.

It's more accurate to say:

> HTML is the source description from which the browser builds multiple specialized models simultaneously.

For example:

```text
HTML

↓

DOM

↓

Accessibility Tree

↓

Render Tree

↓

Layout Tree

↓

Paint Commands
```

The DOM is just the first of them.

---

# 3. HTML Has Become Part of the Browser Architecture

Previously, HTML was viewed as a language.

Today, it's more accurate to say:

> HTML is one of the architectural layers of the browser.

For example:

```text
Application

↓

Framework

↓

HTML

↓

Browser Engine

↓

Operating System
```

This leads to an interesting thought.

Angular does not interact directly with the browser.

It interacts through HTML.

---

# 4. HTML Is Becoming a Universal Interchange Format

If you look at modern technologies:

- SSR;
- Static Site Generation;
- Streaming SSR;
- Partial Hydration;
- Islands Architecture;
- React Server Components;
- Angular SSR;
- Astro;
- Qwik,

it turns out that between the server and the browser, **HTML** is almost always being transferred.

So we get:

```text
Server

↓

HTML

↓

Browser

↓

DOM
```

HTML is once again becoming the main transport format of the Web Platform.

This is a very interesting idea that is almost absent from existing books.

---

# 5. The Document Becomes a Domain Model

Classic books used to say:

> HTML describes a document.

In 2026, it's better to say:

> HTML describes the domain model of the user interface.

For example:

```html
<article>
  <header>
    <h1>...</h1>
  </header>
</article>
```

This is no longer "markup."

This is a description of a business object:

```
Article

↓

Header

↓

Title

↓

Body
```

It looks very much like an object model.

---

# 6. HTML Becomes a Data Source for AI

This point is almost entirely absent from other sources.

Modern AI systems do not analyze CSS.

They analyze HTML.

For LLMs, it's much easier to understand:

```html
<article>
  <h1>...</h1>

  <section>...</section>
</article>
```

than:

```html
<div class="wrapper">
  <div class="content">
    <div class="big-title">...</div>
  </div>
</div>
```

That is, HTML is becoming an interface for communication not only with the browser but also with artificial intelligence.

---

# 7. The DOM Is Becoming Less Important Than the Declarative Model

Previously, developers thought:

```
DOM

↓

JavaScript

↓

Modify the page
```

Today, it's increasingly happening the other way around:

```text
HTML

↓

Browser API

↓

Built-in behavior
```

For example:

```html
<dialog></dialog>
```

or

```html
<details></details>
```

or

```html
<input type="date" />
```

In many cases, JavaScript is not needed at all.

This is a very strong trend of recent years.

---

# 8. HTML Is Becoming an Architectural Language

Previously, the discussion was:

> Which tag should I use?

In the book **Modern HTML 2026**, it's more appropriate to ask a different question:

> What domain model does the document describe?

For example, instead of:

```
div

↓

div

↓

div

↓

div
```

we get:

```
main

↓

article

↓

section

↓

figure
```

This is already an architectural diagram of the domain model.

---

# Key Takeaways

After studying this chapter, you should remember several key ideas:

- HTML is a language of structure and meaning, not presentation.
- The HTML file is the source code of the document, and the browser transforms it into the DOM.
- The DOM is an object model of the document that CSS, JavaScript, and browser APIs work with.
- Semantic markup improves accessibility, search engine optimization, and project maintainability.
- Even a modern web application remains a document from the web platform's perspective.
- HTML serves as the foundation for all modern frontend frameworks and browser APIs.

---

# What's Next

In the next chapter, we will take a detailed look at **semantic HTML elements** and explore why the choice between `<section>`, `<article>`, `<main>`, `<aside>`, and a plain `<div>` affects not only code readability but also accessibility, SEO, and application architecture.
