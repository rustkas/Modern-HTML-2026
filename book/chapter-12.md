# Part IV. Performance Starts with HTML

## Chapter 12. Modern Image and Media Handling

Media content optimization is often the simplest and most effective way to improve web page performance. Modern HTML provides powerful declarative tools for implementing **Responsive Images**, which allow the browser to select the optimal resource depending on the user's device characteristics, such as physical screen size, pixel density, and support for modern compression formats.

---

## 12.1. Responsive Images: `srcset` and `sizes`

For basic adaptation of raster images without using bulky JavaScript libraries, the `srcset` and `sizes` attributes on the `<img>` element are used. This declarative approach solves two key tasks:

- **Pixel Density-Based Selection:** Using the **`x`** descriptor in the `srcset` attribute, the developer can provide several versions of the same image for displays with different `device-pixel-ratio` values (for example, standard `1x` screens and high-density Retina displays at `2x`). The browser independently decides which to load, also taking into account the current page zoom level.
- **Viewport Width-Based Selection:** The **`w`** descriptor paired with `srcset` indicates the actual physical width of each file in pixels. It must be accompanied by the **`sizes`** attribute, which tells the browser what portion of the screen (in CSS pixels) the image will occupy in the layout under various media conditions.

### Innovation: The `auto` Value for `sizes`

Modern specifications support the **`auto`** keyword for the `sizes` attribute. If the image is loaded lazily (`loading="lazy"`), the browser can automatically determine its size based on the actual rendered width of the element in the layout, eliminating the need for developers to manually calculate complex sizes via media queries.

### Example of a Responsive Image Using `srcset`

```html
<img src="photo-800.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
     sizes="(max-width: 600px) 100vw, 800px"
     alt="Example of a responsive image"
     width="800" height="500">
```

---

## 12.2. The `<picture>` Container and `<source>` for Flexible Scenarios

The `<picture>` element serves as a semantic wrapper container that provides the nested `<img>` element with several alternative sources. This is indispensable for implementing advanced interface tasks:

- **Art Direction:** Using the `<source>` element with the **`media`** attribute allows radically changing the image content itself (for example, replacing a horizontal panoramic banner with a vertically cropped version for mobile screens) depending on viewport dimensions.
- **Modern Compression Formats (AVIF, WebP):** Using the **`type`** attribute, you can offer the browser the latest image formats with unprecedented compression levels and quality (for example, `image/avif` or `image/webp`). The browser sequentially iterates through the sources, selects the first supported format, and gracefully falls back to the base `<img>` tag with classic JPEG or PNG for older browsers.

### Example Using Art Direction and Formats

```html
<picture>
  <!-- Mobile cropped version in modern AVIF format -->
  <source media="(max-width: 768px)" srcset="hero-mobile.avif" type="image/avif">
  <!-- Desktop version in AVIF format -->
  <source srcset="hero-desktop.avif" type="image/avif">
  <!-- Fallback for browsers without AVIF support -->
  <img src="hero-desktop.jpg" alt="Hero section" width="1200" height="600">
</picture>
```

---

## 12.3. Rendering Performance: `loading` and `decoding`

HTML allows fine-grained control over the loading and decoding lifecycle of graphics, reducing CPU and network load:

- **`loading="lazy"` (Lazy Loading):** Defers loading of images that are outside the visible area of the screen (below the fold) until the user scrolls close to them. This radically reduces the critical rendering path and saves bandwidth.
- *Critically important:* To prevent unpleasant layout shifts during content loading (**CLS** — Cumulative Layout Shift), always explicitly specify the **`width`** and **`height`** attributes to define the correct aspect ratio.

- **`decoding="async"` (Asynchronous Decoding):** Gives the browser a clear hint to perform the resource-intensive image decoding process in a background thread. Unlike synchronous mode, which can block the main interface thread and cause jank, asynchronous decoding allows instant rendering of text and page structure, displaying graphics immediately after processing completes.

---

## Chapter Conclusion

The declarative approach to image handling at the HTML level surpasses any script-based wrappers. Modern browsers are capable of analyzing markup and aggressively scheduling network requests even before JavaScript execution begins, guaranteeing maximum performance and instant interface responsiveness.