# Part VII. HTML and Performance

## Chapter 21. HTML as an Optimization and Performance Management Tool

In modern web development, HTML has long outgrown the role of simple static document structure markup. Today, it is a powerful declarative tool that allows developers to directly manage page performance, effectively "negotiating" with the browser about priorities, ordering, and methods for loading critical resources.

---

## 21.1. Lazy Loading

The **Lazy Loading** strategy consists of deferring the loading of non-critical or hidden "below the fold" resources until they are actually needed by the user. This allows significantly reducing traffic volume on the first visit and offloading the critical rendering path.

- **The `loading` Attribute:** Applied to key markup resources — `<img>`, `<iframe>`, as well as `<audio>` and `<video>` media elements.
- **Available States:** The value `lazy` defers loading until the object approaches the viewport, while `eager` (default behavior) prescribes immediate loading.
- **Internal Mechanism:** Modern browsers use an optimized native equivalent of `IntersectionObserver`. It independently tracks scrolling and starts loading resources in advance, maintaining an adaptive "margin" so that an image or frame has time to render exactly at the moment it appears on screen.

---

## 21.2. Resource Hints

To implement speculative loading and preempt network delays, HTML provides a flexible set of `rel` attribute values for the `<link>` tag:

- **`dns-prefetch`:** Performs IP address lookup by domain name in advance for third-party resources, minimizing latency for future requests.
- **`preconnect`:** Performs a full handshake (_DNS + TCP + TLS_, and for HTTPS also connection negotiation), which is critically important for connecting external fonts, APIs, or CDN servers.
- **`prefetch`:** Tells the browser to download a resource with low priority in the background, as it will most likely be needed by the user when navigating to the next page.
- **`preload`:** Forcefully makes the browser start downloading the resource with the highest priority, as it is critically necessary for the current page. When using `preload`, it is **mandatory** to specify the `as` attribute (for example, `as="image"`, `as="style"`, or `as="script"`) so that the browser correctly allocates system resources.

---

## 21.3. Priority Hints

The **`fetchpriority`** attribute allows developers to explicitly indicate to the browser the relative importance of a specific network resource, regardless of the engine's standard heuristics:

- **Available Values:** `high` (increased priority), `low` (decreased), and `auto` (standard auto-detection).
- **Practical Application:** Setting `fetchpriority="high"` on a key banner image that is a candidate for the **LCP** (Largest Contentful Paint) metric allows forcing its download at the expense of secondary elements, noticeably improving performance metrics.

---

## 21.4. Responsive Images

To eliminate sending excessive image weight to mobile devices, modern HTML offers declarative mechanisms for adaptive image selection:

- **The `srcset` and `sizes` Attributes:** Allow describing a collection of variants of the same image with different physical widths in pixels (`w`) or screen densities (`x`). Based on this data, the browser independently decides which file to download.
- **The `<picture>` Element:** Designed for complex art direction (changing framing and composition for different screen types) and implementing modern formats (WebP, AVIF) with reliable fallback to classic JPEG/PNG via nested `<source>` tags.
- **The `auto` Keyword:** Using `auto` in the `sizes` attribute (in combination with `loading="lazy"`) delegates to the browser the task of calculating the image's actual size in the layout before styling is complete.

---

## 21.5. Streaming HTML and Partial Hydration

The web platform architecture supports the concept of streaming and incremental parsing, allowing the browser to render the interface as data arrives:

- **Streaming DSD:** The integration of Declarative Shadow DOM with the `shadowrootmode` attribute enables the server to deliver encapsulated structures directly in the HTML response stream. The browser renders components instantly, without waiting for large scripts to load.
- **Partial Hydration:** Thanks to native upgrade mechanisms, custom elements can exist in the DOM as "quiet" static structures and come to life (hydrate) as their corresponding modules load, without blocking the main rendering thread.
- **Asynchronous Decoding:** Adding the `decoding="async"` attribute to `<img>` tags instructs the browser to process raster graphics in a background thread, preventing interface freezing when rendering heavy content.

---

## Chapter Conclusion

Comprehensive use of built-in HTML optimization tools transforms markup into a finely tunable performance management instrument. Correct application of hints, priorities, and declarative loading strategies allows achieving maximum application speed metrics without the need to include heavy third-party libraries.