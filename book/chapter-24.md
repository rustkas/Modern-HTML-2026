# Part VIII. HTML Architecture

## Chapter 24. HTML and Design Systems

In modern web development, **Design Systems** serve as the primary guarantor of visual consistency, scalability, and maintainability of interfaces. At the same time, **HTML** acts as their fundamental construction layer, establishing an immutable structure, semantic framework, and content behavior contract. Using standardized approaches at the markup level allows designing autonomous, resilient components that integrate predictably into any technological ecosystem.

---

## 24.1. Design Tokens and State Management

Although visual interface parameters (color schemes, typography, spacing) are traditionally described in CSS, HTML provides effective mechanisms for storing data, integrating design tokens, and declaratively managing the lifecycle of widget states.

- **Custom Data (`data-*`):** Custom attributes allow embedding design-system-specific configuration parameters, dynamic theme tokens, or analytics markers directly into the markup, where scripts can safely read them for adaptive component configuration.
- **Centralized Stylesheets (`Constructable Stylesheets`):** The programmatic stylesheet interface allows design system architects to create unified encapsulated styles in JavaScript memory and efficiently share them across dozens of shadow tree instances, avoiding code duplication.
- **Declarative States:** Using native state attributes (for example, `open` on the `<details>` element or `checked` on checkboxes) allows directly linking widget display logic with CSS state selectors, minimizing the need for writing fragile imperative JavaScript.

---

## 24.2. Semantic Structure as the System Framework

A solid foundation for any design system is uncompromising semantics, endowing each document node with clear roles understandable to both the browser and assistive technologies.

- **Intrinsic Meaning:** DOM elements carry inherent logic (for example, the `<ol>` tag always defines an ordered list), imposing strict architectural obligations on how that component should be applied in the interface.
- **Content Categories and Nesting:** The standard strictly classifies elements into flow, sectioning, interactive, and phrasing content. This allows design system architects to clearly control composition rules and valid nesting of elements within components.
- **Media-Independent Markup:** The modern specification encourages strict separation of structure and presentation layer, ensuring that design system markup remains unchanged and adaptable when rendered on any device — from smartphone to speech synthesizer.

---

## 24.3. Reusable Templates and Web Components

To implement scalable interfaces, design system architecture actively relies on the standard set of Web Components technologies, ensuring isolation and reuse:

- **The `<template>` Element:** Serves as a high-performance interface blueprint, keeping its content inert (without executing scripts or loading resources) until dynamic cloning occurs.
- **The Slot Mechanism (`<slot>`):** Acts as a flexible placeholder, allowing seamless connection of the protected design system structure (Shadow DOM) with unique user content (Light DOM).
- **Strict Encapsulation:** Shadow DOM boundaries protect the internal layout and styling rules of design system components from accidental or deliberate contamination by the host application's global styles.

---

## 24.4. Accessibility by Design

In a modern design system, accessibility (A11y) cannot be added "on top" of ready-made code — it must be embedded at the design stage of every foundational component.

- **Preference for Native Elements:** The system architecture must prioritize built-in semantic tags (`<button>`, `<dialog>`, `<a>`), avoiding attempts to imitate their behavior through generic containers with ARIA roles, as native browser support is always more reliable.
- **WAI-ARIA Roles for Complex Patterns:** In cases where standard tags are insufficient for implementing custom interactive patterns (for example, complex trees or comboboxes), WAI-ARIA specifications are used to precisely describe states and manage focus.
- **Accessibility "Out of the Box" via `ElementInternals`:** When creating custom elements, design system authors can use the `ElementInternals` interface to pass native ARIA roles and component states to the browser without exposing them in the public markup, making components accessible without additional effort from the product developer.

---

## Chapter Conclusion

Integrating HTML into the design system concept transforms markup from a set of static tags into a living, standardized contract between interface designers, the codebase, and users. Clear semantics, encapsulation, and native accessibility ensure the durability and predictability of digital products of any scale.