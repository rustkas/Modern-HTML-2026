# Part VII. HTML and Performance

## Chapter 20. Critical Rendering Path

**Critical Rendering Path** is the sequence of steps that the browser sequentially performs to transform source code (HTML, CSS, and JavaScript) into physical pixels on the user's device screen. Thorough optimization of each stage of this process is a crucial factor for achieving maximum performance, instant interface responsiveness, and high Core Web Vitals scores.

---

## 20.1. HTML Parser and DOM Construction

The rendering process begins with the HTML parser, which sequentially analyzes the incoming byte stream of markup over the network, decodes it into characters, combines them into tokens, and transforms them into a hierarchical **DOM** (Document Object Model) tree.

The DOM is a tree of objects in the browser's memory, consisting of nodes of various types (elements, text blocks, comments). It is important to consider the features of this stage:

- **Blocking Resources:** HTML parsing is streaming, but it can be interrupted or slowed down by synchronous scripts and external style sheets that the browser must download, parse, and execute (or apply) before continuing to parse the document.
- **Incrementality:** The browser is capable of rendering content to the screen in parts (progressive rendering) without waiting for the entire document to finish loading, provided the critical path is not blocked by heavy scripted dependencies.

---

## 20.2. CSSOM (CSS Object Model)

In parallel with HTML parsing, the browser processes styles, forming the **CSSOM** (CSS Object Model). This is a tree structure reflecting all cascading style sheet rules, including inline styles, external files, and rules imported via the `@import` directive.

The main property of CSSOM is that style sheets are **render-blocking resources**. Since the browser fundamentally cannot start rendering the page without knowing the exact visual styling of elements (otherwise the user would have to observe ugly interface jumps when styles are applied), render tree construction is delayed until CSSOM is fully formed.

---

## 20.3. Render Tree

After the browser has successfully built the base DOM tree and the parallel CSSOM, it combines them into a single structure — the **Render Tree**.

- **Node Filtering:** Unlike the DOM, the render tree contains exclusively those elements that will actually be displayed on the screen.
- **Exclusion of Invisible Elements:** Nodes that are hidden programmatically or via CSS (for example, elements with `display: none`) are completely excluded from the Render Tree. At the same time, elements with `visibility: hidden` or `opacity: 0` are included in the tree, as they continue to occupy physical space in the layout.

---

## 20.4. Layout

At the **Layout** stage (also referred to in literature as *Reflow*), the browser performs mathematical calculations of geometric parameters for each visible element: determining its exact position (*x* and *y* coordinates) and pixel dimensions relative to the viewport.

- **Preventing Unnecessary Recalculations:** If the dimensions of resources (for example, `<img>` or `<video>` tags) are not explicitly specified in the HTML markup via `width` and `height` attributes, the browser has to perform repeated layout recalculations (reflows) as images load and change the geometry of surrounding text.
- **Optimization:** Clearly specifying element proportions and sizes at the markup stage allows eliminating expensive dynamic recalculation operations and minimizing CPU load.

---

## 20.5. Paint

The **Paint** (rasterization) stage is the process of actually filling pixels on the screen based on pre-calculated layout data. The browser translates element geometry into raster images (color fills, border rendering, shadows, text).

- **Thread Performance:** Executing heavy visual effects or synchronous resource-intensive operations in the browser's main thread (for example, synchronous decoding of large images) can lead to dropped frames and noticeable micro-lags in the interface.
- **Asynchronous Methods:** Using modern optimization attributes such as `decoding="async"` for images allows offloading the decoding process to a background thread and accelerating the paint stage.

---

## 20.6. Composite

The final stage of the critical path is **Composite** (composition). At this step, the various rendered layers of the page are combined together and output to the screen by the graphics card through the graphics pipeline.

- **Smooth Animations:** The browser distributes visual elements across separate graphics layers. This allows hardware acceleration for properties such as `transform` and `opacity`, ensuring flawlessly smooth animations without passing through the Layout and Paint stages again.
- **Low-Level Optimization:** Using advanced programmatic interfaces such as `ImageBitmapRenderingContext` allows optimizing composition by eliminating unnecessary intermediate processing and memory copy stages.

---

## Chapter Conclusion

Skillful and conscious management of each stage of the Critical Rendering Path allows developers to "negotiate" with the browser, reduce time to first content display, and ensure instant, smooth interface response to any user actions.