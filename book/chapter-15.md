# Part V. HTML and Modern Browser APIs

## Chapter 15. Declarative Shadow DOM (DSD)

**Declarative Shadow DOM (DSD)** is a powerful extension of the HTML standard that allows defining an encapsulated Shadow DOM tree structure directly in static markup sent from the server, without the need for mandatory JavaScript execution. This innovation has radically changed the paradigm of building web components, transforming Shadow DOM from a purely imperative API into a full-fledged tool for Server-Side Rendering (SSR).

---

## 15.1. Prerequisites: Limitations of the Imperative Approach

Historically, creating Shadow DOM was entirely tied to client-side JavaScript. To encapsulate a component's styles and markup, the developer was required to call the `attachShadow()` method in code.

This created a systemic architectural problem:

- **Empty HTML from the Server:** Until the browser downloaded, parsed, and executed all JavaScript bundles, web components on the page remained empty or displayed a poor fallback.
- **JS Dependency:** The interface became fragile: with a slow connection or disabled scripts, the user saw empty blocks, and search crawlers could not index important content inside the components.

---

## 15.2. Server-Side Rendering (SSR), SEO, and Accessibility

The main goal of Declarative Shadow DOM is to provide full-fledged SSR for web components. Delivering a ready-made structure from the server solves key challenges of the modern web standard:

- **SEO Indexing:** Since the shadow tree content is present in the primary HTML document stream, search crawlers see and index it instantly, without emulating complex client-side scenarios.
- **Accessibility (A11y):** Assistive technologies (screen readers) gain access to the component's structure and text from the first milliseconds of page loading, guaranteeing equal opportunities for all users.

---

## 15.3. Mechanism and Syntax: `<template shadowrootmode>`

To declaratively create a shadow tree in HTML, the standard `<template>` element is used with the addition of the special **`shadowrootmode`** attribute.

- **Display Modes:** The attribute accepts the standard values `open` (access to `shadowRoot` is available from external JS) or `closed` (encapsulation is hidden).
- **Automatic Assembly:** When the browser's HTML parser encounters such a template inside a host element (Shadow Host), it creates a `ShadowRoot` on the fly, attaches it to the host, and replaces the `<template>` tag itself with its contents in the DOM tree.
- **Additional Control Attributes:** The specification allows configuring root behavior directly in the markup:
  - `shadowrootdelegatesfocus`: Enables automatic focus delegation.
  - `shadowrootclonable`: Allows cloning of the shadow tree when `node.cloneNode()` is called.
  - `shadowrootserializable`: Ensures support for component serialization.

### Example of Declarative Shadow DOM in Markup

```html
<user-card>
  <template shadowrootmode="open" shadowrootdelegatesfocus>
    <style>
      .card {
        padding: 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
      h3 {
        color: #0066cc;
        margin: 0 0 8px 0;
      }
    </style>
    <div class="card">
      <h3>User Profile</h3>
      <slot>No name provided</slot>
    </div>
  </template>
  <!-- Fallback content or initial slot data -->
  Anatoly Kosorukov
</user-card>
```

---

## 15.4. Performance and Critical Rendering Path

Using DSD radically improves web application performance metrics:

- The browser begins rendering isolated styles and markup **in parallel with parsing** the main document, without waiting for external scripts to load.
- This shortens the critical rendering path and completely eliminates visual content jumps (**CLS** — Cumulative Layout Shift) that previously occurred during client-side component mounting.

---

## 15.5. The Hydration Process

Declarative Shadow DOM is designed with seamless transition of control from static HTML to dynamic JavaScript component code:

1. **Server Stage:** The server delivers fully formed HTML with expanded DSD.
2. **Initial Display:** The browser renders the page instantly.
3. **Client Hydration:** When the component's JavaScript class loads, it calls the standard `this.attachShadow({ mode: 'open' })` method.
4. **Integration:** Instead of generating an error or creating a duplicate root, the browser recognizes the existing declarative root (if modes match), clears the old content, transfers control to the script, and resets the internal `declarative` flag to `false`.

---

## Chapter Conclusion

Declarative Shadow DOM has finally freed web components from the "empty screen syndrome" during server-side generation. By combining strict style encapsulation, high-speed SSR rendering, and flawless accessibility, DSD has made modern component architecture truly fast and scalable.
