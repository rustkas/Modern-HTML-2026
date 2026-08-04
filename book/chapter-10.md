# Part IV. Performance Starts with HTML

## Chapter 10. Modern Resource Loading and Speculative Optimization

The performance of a web page largely depends on how efficiently the browser prioritizes resource loading. Modern HTML provides a powerful set of declarative tools for **speculative loading** — the practice of performing network actions (DNS queries, connection establishment, or file downloads) before they are actually needed by the user, based on predicting their behavior.

---

## 10.1. Early Network Preparation: `dns-prefetch` and `preconnect`

The first stage of any network request to a third-party or primary origin is resolving the domain name and establishing a secure connection. Premature initialization of these processes can save hundreds of milliseconds.

- **`dns-prefetch`:** A hint to the browser to perform DNS resolution in advance for a third-party domain from which resources will be requested later (for example, analytics scripts, ad networks, or third-party CDNs). This reduces network latency.
- **`preconnect`:** A deeper preparation tool. It not only performs IP address lookup via DNS but also initiates a full TCP handshake, as well as TLS negotiation.
- _Important:_ `preconnect` should be used with caution and only for critically important domains (for example, font hosts or API servers), as opening unnecessary connections burdens the client's network stack.

### Example of Declarative Network Preparation in `<head>`

```html
<head>
  <!-- Pre-resolve DNS for image CDN -->
  <link rel="dns-prefetch" href="//images.example.com" />

  <!-- Full connection preparation for critical API -->
  <link rel="preconnect" href="//api.example.com" crossorigin />
</head>
```

---

## 10.2. Optimizing the Critical Path of the Current Page: `preload` and `modulepreload`

For resources that are guaranteed to be needed for rendering the current page (for example, key fonts, styles, or the main JavaScript module), forced preloading mechanisms are used.

- **`preload`:** Instructs the browser to start downloading the resource immediately, with high priority, without waiting for the parser to reach it in the DOM tree.
- _Key rule:_ The **`as`** attribute must be specified (e.g., `as="style"`, `as="font"`, `as="image"`, or `as="script"`). Without it, the browser cannot correctly set priorities and apply Content Security Policy (CSP), and the resource itself may be loaded twice.

- **`modulepreload`:** A specialized tool for modern ECMAScript modules (`type="module"`). Unlike regular `preload`, which simply places the file in the network cache, `modulepreload` immediately passes the loaded module to the document's internal module map, simultaneously starting the download of its dependencies. This radically accelerates the startup of large JavaScript applications.

---

## 10.3. Preparing for Future Steps: `prefetch` and `prerender`

These hints are oriented toward the future — navigation that the user is most likely to take in the next step.

- **`prefetch`:** Signals to the browser that a resource or an entire web page will be needed in the near future (for example, when navigating to the next slide or the next section of a catalog). Such requests are performed with **low priority** in the background to ensure they do not compete for bandwidth with the current page's resources. The browser automatically marks such requests with the HTTP header `Sec-Purpose: prefetch`.
- **`prerender`:** The most resource-intensive type of network optimization, where the browser not only downloads the markup of the future page but also fully renders it in a hidden background memory space (including executing scripts and building the layout). When the user clicks on the link, the page opens **instantly**, creating the feel of a local application.

---

## 10.4. The New Generation: Speculation Rules API

The legacy `<link rel="...">` tags have a certain rigidity and do not always allow flexible management of speculation conditions. They are being replaced by the modern **Speculation Rules API** standard.

Speculative loading rules are described inside the `<script type="speculationrules">` element in JSON format. This approach provides unprecedented flexibility:

- **Declarative grouping:** The ability to describe rules for `prefetch` and `prerender` within a single configuration block.
- **Selectors and conditions:** Configuring rules based on URL path matching, link classes, or transition probability.
- **Dynamic management:** JavaScript code can programmatically update speculation rules in real time, for example, activating prerendering when the user's cursor hovers over a link.

### Example Using the Speculation Rules API

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "source": "list",
        "urls": ["/catalog/product-1.html", "/catalog/product-2.html"],
        "requires": ["anonymous-client-ip-when-cross-origin"]
      }
    ],
    "prerender": [
      {
        "source": "document",
        "where": { "href_matches": "/cart/*" },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

---

## Chapter Conclusion

Modern resource loading management methods transform HTML from static markup into an active performance optimization tool. A skillful combination of `preconnect`, `preload`, and intelligent `Speculation Rules API` rules can completely eliminate network delays and ensure instant interface response for the user.
