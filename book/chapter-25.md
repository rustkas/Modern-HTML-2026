# Part VIII. HTML Architecture

## Chapter 25. HTML in the Era of Server-Side Rendering (SSR)

In modern web development, the architectural pendulum has swung back from purely client-side Single Page Applications (SPAs) toward Server-Side Rendering (SSR). In this model, **HTML** reclaims its status as the absolute center of gravity for the entire ecosystem. This shift is driven by strict business and user requirements for maximum performance, instant First Paint, and flawless search engine indexing (SEO).

---

## 25.1. Hydration and Declarative Shadow DOM

A fundamental process in the SSR paradigm is **Hydration** — a mechanism where client-side JavaScript "picks up" already-complete static HTML markup generated on the server, attaches event handlers to it, and restores internal interactive state.

Historically, creating encapsulated web components using Shadow DOM on the server side was fraught with significant difficulties: browsers required mandatory client-side script execution to initialize the shadow tree. A true breakthrough was the introduction of **Declarative Shadow DOM (DSD)**:

- Using the `shadowrootmode` attribute (`open` or `closed`) directly inside the `<template>` tag, the server can deliver a complete encapsulated component structure directly in the primary HTML stream.
- The browser unpacks and turns this template into a shadow root "on the fly" during markup parsing.
- This allows instant rendering of complex components even before heavy JavaScript files load or execute, ensuring seamless and fast client-side hydration.

---

## 25.2. Next-Generation Architectures and Frameworks

Modern server frameworks and architectural patterns offer fundamentally new approaches to delivering HTML code and minimizing client-side JavaScript volume:

- **React Server Components (RSC):** A revolutionary approach that splits components into server and client components. Server component code executes exclusively on the backend, generating pure HTML without sending source code or dependencies to the user's device.
- **Islands Architecture:** A concept (popularized by the Astro ecosystem) where the page is rendered as static, fast HTML, within which interactive dynamic blocks ("islands") are isolated and interspersed. Client-side hydration is selectively applied only to these islands, leaving the rest of the page static.
- **Qwik and Resumability:** A radically different strategy that abandons classic hydration. Instead of re-executing code on the client, application state and handlers are serialized directly into HTML on the server, allowing the browser to continue executing logic from the same point instantly and without CPU overhead.

---

## 25.3. HTML as the Fundamental SSR Contract

The declarative standards of the web platform make SSR applications immeasurably more resilient, faster, and more predictable.

The browser's ability to process and output encapsulated content in streaming mode directly during network parsing radically shortens the critical rendering path and completely frees the user from unpleasant layout shifts (Cumulative Layout Shift). In the era of advanced SSR, the HTML language has finally ceased to be a passive text description tool, transforming into a powerful control circuit for web interface performance and lifecycle.