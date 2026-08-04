## Chapter 27. HTML as the Core of the Web Platform

The **HTML** language has undergone a colossal evolutionary journey — from a simple set of tags for marking up static scientific documents to a powerful, high-performance software environment that forms the foundation for building fully functional interactive applications. Today, HTML serves as the immutable and reliable core of the entire Web Platform.

---

## 27.1. Living Standard: Continuous Evolution of the Standard

Unlike the early stages of web development, when specifications would freeze for years in the form of bulky releases (such as HTML4 or XHTML), modern HTML evolves according to the **Living Standard** model:

- **Abandonment of Artificial Versions:** The WHATWG community has abandoned the concept of "frozen" versions (such as HTML5). The specification is in a state of continuous updates.
- **Dynamic Adaptation:** New capabilities are introduced as they become technically ready and as industry needs arise, allowing the platform to respond instantly to the challenges of the times without waiting for bureaucratic releases.

---

## 27.2. New APIs and Platform Rationalization

The ecosystem's development follows the philosophy of _platform rationalization_ — translating closed or complex patterns into standardized low-level APIs:

- **Popover API:** A unified mechanism for managing popup content (menus, tooltips, notifications), automatically elevating elements to the `top layer` and supporting the native _light dismiss_ scenario (closing on click outside or via the `Esc` key).
- **Navigation API:** The modern evolution of the legacy `history` and `location` interfaces, providing centralized programmatic control over routing and transitions in client applications.
- **Sanitizer API:** A native security standard for declarative sanitization of HTML strings in browser memory, minimizing Cross-Site Scripting (XSS) risks during dynamic content injection.

---

## 27.3. Back to the Roots: Declarative Web

Modern architecture strives to maximize the share of declarative code, reducing the load on client-side JavaScript and ensuring maximum rendering speed:

- **Declarative Shadow DOM (DSD):** Allows marking up encapsulated shadow tree structures directly in primary HTML using the `shadowrootmode` attribute on the `<template>` tag, ensuring instant component rendering by the browser even before scripts execute.
- **Native Semantic Interactivity:** Using built-in tags such as `<dialog>` allows the browser to take over routine focus, accessibility, and layer management without involving third-party libraries.

---

## 27.4. Integration of Artificial Intelligence into the Web Platform

With the development of intelligent agents and machine learning systems, the boundary between the interface and the browser is blurring. The web platform is beginning to natively support AI interaction scenarios:

- **The `writingsuggestions` Attribute:** A new global markup property that allows or prevents the browser from activating system-integrated text autocomplete, suggestion, and predictive input algorithms in form fields.
- **AI-Ready Interfaces:** Designing markup with the understanding that page structure will be parsed not only by classic search crawlers but also by local or cloud language models (LLMs) that require flawless semantics and DOM purity.

---

## 27.5. Vectors for HTML Development Until 2030

Analyzing current consortium working drafts and discussions in the developer community, key directions for the standard's transformation in the coming years can be identified:

- **Integration of Custom Elements with Native Ones:** Eliminating the last architectural barriers between Web Components and built-in tags in terms of accessibility, form management, and state.
- **Expansion of ARIA Semantics:** Deep integration of new roles and properties (including the development of the ARIA 1.3 specification) directly into the structure of basic elements (for example, `<meter>`, `<progress>`).
- **Secure Script Isolation:** Improving mechanisms for encapsulating executed code within modules and shadow trees without global exposure.
- **Declarative Animations and Transitions:** Moving logic for managing complex visual effects (building on the _View Transition API_) directly into declarative markup attributes.

---

## Chapter Conclusion

HTML has proven its absolute viability and versatility. Having transformed from a simple text markup tool into the dynamic core of the modern Web Platform, it continues to unite design, performance, and accessibility, remaining the main foundation of the entire digital ecosystem of the future.
