# Part VI. Web Components

## Chapter 17. Shadow DOM and Encapsulation

**Shadow DOM** is a fundamental technology of web components, designed to create encapsulated structures within web applications. It allows attaching a hidden DOM tree to an element, protecting its internal implementation from direct influence by JavaScript and CSS from the main document.

---

## 17.1. Architecture and Component Isolation

The main task of Shadow DOM is to provide reliable isolation, without which custom elements would be extremely vulnerable to accidental style or logic changes from the page. The architecture of this technology distinguishes the following key concepts:

- **Shadow host:** A regular DOM node to which a shadow tree is attached.
- **Shadow tree:** The tree of nodes inside the Shadow DOM.
- **Shadow boundary:** The place where the Shadow DOM ends and the main document DOM begins.
- **Shadow root:** The root node of the shadow tree.

Isolation works transparently: code inside the shadow tree cannot accidentally affect external elements, and global page selectors do not penetrate inside the component. When creating the root (using the `attachShadow()` method or the `shadowrootmode` attribute), the developer chooses a mode: **`open`** allows access to the root via the host's `shadowRoot` property, while **`closed`** makes it inaccessible to external scripts.

---

## 17.2. Templates (`<template>`) and Declarative Shadow DOM

The **`<template>`** element serves as the declarative foundation for component structure, allowing description of markup fragments that are not rendered or processed by the browser when the page loads. The template's content is stored in a `DocumentFragment` object and remains inert: scripts inside it are not executed, and images are not loaded until the template is cloned and inserted into the live DOM tree.

The modern standard also supports **Declarative Shadow DOM** by using the **`shadowrootmode`** attribute directly on the `<template>` tag. In this case, the browser automatically turns the template into a shadow root of the parent element during parsing, which is critically important for Server-Side Rendering (SSR) and performance.

---

## 17.3. The Slot Mechanism (`<slot>`)

The slot mechanism (**`<slot>`**) allows flexible combination of user markup (Light DOM) with the component's structure (Shadow DOM).

- **Named slots:** Using the `name` attribute allows precise distribution of user content across different parts of the component. Elements in the Light DOM are connected to them via the global `slot` attribute.
- **Default slot:** The first slot encountered in the tree without a name accepts all content that has no named match.
- **Assignment control:** The browser can assign nodes to slots automatically based on names or manually via the JavaScript API (manual slot assignment).

Whenever the composition of nodes in a slot changes, the **`slotchange`** event is generated, allowing timely reaction to external content updates.

---

## 17.4. Isolated Styling

Styling in Shadow DOM is strictly encapsulated, completely eliminating class name conflicts with the page's global style sheet. In practice, two main approaches are used:

1. **Declarative:** Placing a `<style>` tag directly inside the component's `<template>`.
2. **Programmatic:** Using **Constructable Stylesheets** via the shadow root's `adoptedStyleSheets` property, which allows efficient and economical sharing of a single style sheet across many component instances.

For controlled style management across the encapsulation boundary, special pseudo-classes and pseudo-elements are provided:

- **`:host`:** Allows styling the host element itself from inside the shadow tree.
- **`::slotted()`:** Used to style elements passed by the user into slots.
- **`::part()`:** Allows the component author to explicitly expose specific internal elements for external styling (via the `part` attribute).

---

## 17.5. Accessibility, Events, and Focus

Shadow DOM is fully integrated with the browser's accessibility model and event handling mechanisms.

- **Context Inheritance:** The shadow tree and slots automatically inherit important global context attributes such as language (`lang`) and text direction (`dir`) directly from their host.
- **Event Retargeting:** When an event bubbles out beyond the shadow boundary, its `target` property is automatically changed to the host element itself, protecting internal implementation details.
- **Focus Management (`delegatesFocus`):** If this attribute is active on the shadow root, clicking on the component automatically moves focus to the first available interactive element inside the shadow tree.
- **Accessibility Tree:** All nodes inside Shadow DOM are correctly projected into the overall Accessibility Tree, ensuring flawless operation of screen readers and assistive technologies.

---

## Chapter Conclusion

Shadow DOM transforms HTML into a powerful modular system where each component is a predictable, isolated, and protected building block of the modern web platform.