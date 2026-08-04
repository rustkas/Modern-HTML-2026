# Part IV. Performance Starts with HTML

## Chapter 11. Managing Resource Loading Priorities

Effectively managing how and in what order the browser loads resources is a key factor in achieving high web page performance and optimizing Core Web Vitals metrics. The modern web platform provides developers with robust tools for fine-tuning these processes, allowing them to explicitly indicate the importance of each element in the rendering flow.

---

## 11.1. Render Blocking

The process of transforming raw HTML, CSS, and JavaScript into pixels on the screen is called the **Critical Rendering Path**. Some types of resources have the ability to temporarily pause this process.

- **Render Blocking Elements:** These are critically important resources that the browser must fully load and process before it can continue building the render tree. These include:
  - External stylesheets (`<link rel="stylesheet">`).
  - Internal styles (`<style>`).
  - Classic synchronous scripts (without `async` or `defer` attributes).

- **The `blocking` Attribute:** Allows the developer to explicitly mark an element (e.g., `<link>`, `<script>`, `<style>`, or `<iframe>`) as render-blocking using the token `blocking="render"`. This ensures that the browser will not begin rendering the page until the resource has been processed.
- **Management Mechanism:** Internally, the browser maintains a dynamic set of render-blocking elements. Rendering is delayed until this set becomes empty or until a built-in safety timeout triggers.

---

## 11.2. Script Loading Strategies: `async` and `defer`

Scripts have traditionally been the main source of delays in the browser. Two key boolean attributes for `<script>` tags radically change their behavior:

- **`async` (Asynchronous Loading):** The script begins downloading in parallel with HTML document parsing. As soon as the file is fully loaded, HTML parsing is temporarily paused for immediate execution of this script. The execution order of `async` scripts is not guaranteed — they execute as they become ready.
- **`defer` (Deferred Loading):** The script also loads in the background in parallel with HTML parsing, but its execution is **strictly deferred** until the entire document has been fully parsed (`DOMContentLoaded`). Scripts with `defer` are guaranteed to execute in the order they are declared in the markup.
- _Note:_ Modern ECMAScript modules (`type="module"`) behave by default as if they have the `defer` attribute applied.

If neither of these attributes is specified, a classic script blocks the parser: HTML loading stops until the file is fully downloaded and executed.

---

## 11.3. Fine-Tuning with `fetchpriority`

The **`fetchpriority`** attribute (part of the HTML Living Standard specification) allows the developer to directly influence the browser's internal network request scheduler by explicitly indicating the relative importance of a resource. It is applicable to `<link>` tags (for example, for fonts), `<img>`, and `<script>`.

The attribute accepts three values:

- **`high`:** Signals a high loading priority relative to other resources of the same type.
- **`low`:** Indicates a low priority, allowing more important elements to take precedence.
- **`auto`:** The default value, where the browser independently determines priority based on its own heuristics.

> **Practical Example:** Setting `fetchpriority="high"` on the main screen image responsible for the **LCP** (Largest Contentful Paint) metric allows the browser to request it immediately, significantly accelerating the visual appearance of key content.

```html
<!-- Priority loading of the site's main banner -->
<img
  src="hero-banner.webp"
  alt="Banner"
  fetchpriority="high"
  width="1200"
  height="600"
/>
```

---

## 11.4. Internal Browser Priorities

Modern browsers use complex heuristics to determine the order of network requests, relying on several factors:

1. **Base resource type (`destination`):** HTML and stylesheets always receive the highest priority, while background images or analytics scripts may load later.
2. **Blocking status:** The presence of render blocking automatically increases an element's priority in the network queue.
3. **`fetchpriority` influence:** Explicitly specifying the attribute adjusts the standard scheduler algorithm.
4. **Speculative processes:** Background requests via `prefetch` or `prerender` are always executed with minimal priority to ensure they do not compete for bandwidth with critical elements of the current page.

---

## Chapter Conclusion

Skilled use of flow control attributes (`async`, `defer`, `blocking`, `fetchpriority`) allows the developer to "negotiate" with the browser, eliminate interface blocking, and ensure maximum responsiveness to user actions.
