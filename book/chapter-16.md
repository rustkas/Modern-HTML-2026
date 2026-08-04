# Part VI. Web Components

## Chapter 16. Custom Elements

**Custom Elements** are the foundation of Web Components technology, allowing developers to create their own fully-featured HTML tags with unique business logic, encapsulated visual design, and behavior. This specification is part of the global strategy of "platform rationalization," which enables site authors to use the same extension mechanisms on which the browser's standard elements are built.

---

## 16.1. Architecture and Component Registration

Creating a custom element begins with defining a standard JavaScript class that inherits from the built-in `HTMLElement` interface (for completely unique elements) or from a specialized interface of an existing tag (for example, `HTMLButtonElement`).

To register a new tag in the browser's global registry, the **`customElements.define()`** method is used. The specification distinguishes two types of custom elements:

1. **Autonomous custom elements:** Completely new tags that do not inherit the behavior of existing elements. They extend the base `HTMLElement` and are used directly in HTML.
2. **Customized built-in elements:** Descendants of specific platform elements (for example, `<button>`). When registering them, an additional parameter `{ extends: 'button' }` is passed to the method, and in markup they are applied through the standard tag with the **`is`** attribute (for example, `<button is="my-button">`).

### Strict Naming Rules

The name of a custom element **must** contain a hyphen (`-`), start with a lowercase Latin letter, and not contain uppercase characters (for example, `<user-card>` or `<data-grid>`). This architectural requirement guarantees that the browser will never conflict with future standard HTML tags.

```javascript
// Example of defining an autonomous custom element
class UserCard extends HTMLElement {
  constructor() {
    super();
    // Initialize state and bind shadow DOM
  }
}

// Register the tag in the browser's global registry
customElements.define('user-card', UserCard);
```

---

## 16.2. Component Lifecycle

The behavior of custom elements is controlled by a set of special built-in lifecycle callbacks that the browser automatically invokes when the element's status changes:

- **`constructor()`:** Called at the moment the component instance is created (or when it is upgraded by the browser). Ideal for setting initial state and binding the shadow tree. **Important rule:** the first line of the constructor must always be a call to `super()`.
- **`connectedCallback()`:** Fires immediately after the element is physically added to the document's DOM tree. This is the optimal place for making network requests, subscribing to events, and performing initial rendering.
- **`disconnectedCallback()`:** Called when the element is removed from the DOM. Used for resource cleanup, removing global event listeners, and clearing timers.
- **`adoptedCallback()`:** Activated if the element is moved from one document to another (for example, between different `<iframe>`s on a page).
- **`attributeChangedCallback(name, oldValue, newValue)`:** Fires upon any manipulation of the element's tracked attributes.

---

## 16.3. Synchronizing Attributes and Properties

Interaction with web components from JavaScript is built on the combination of HTML attributes and object properties (IDL attributes). To ensure predictable behavior, the developer must implement **reflection** — two-way synchronization where changing an object property instantly changes the attribute in the markup, and vice versa.

- **Static `observedAttributes` Property:** Returns an array of strings with attribute names whose changes the browser should track. Only these attributes will trigger the `attributeChangedCallback` method.
- **Getters and Setters:** Used to create class properties that transparently translate data to the markup via `getAttribute()` and `setAttribute()`.

### Example of Property Reflection Implementation

```javascript
class RangeSlider extends HTMLElement {
  // Specify attributes to observe
  static get observedAttributes() {
    return ['value'];
  }

  get value() {
    return this.getAttribute('value') || 0;
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && oldValue !== newValue) {
      this.updateUI(Number(newValue));
    }
  }

  updateUI(val) {
    // Internal component re-render logic
  }
}
```

---

## 16.4. Event Model

Since all custom elements inherit the `EventTarget` interface, they have full access to the browser's standard event generation and capture system.

- **Dispatching (`dispatchEvent`):** To inform the external environment about internal changes, the component generates events.
- **The `CustomEvent` Interface:** The recommended standard for passing arbitrary structured data to the external environment. Data is passed inside the `detail` property of the event object.
- **Bubbling and Boundary Crossing:** Events generated inside `Shadow DOM` by default bubble through its boundaries, although their target object is automatically adjusted to preserve encapsulation, unless the `composed: true` flag is specified.

```javascript
// Sending a custom event outward from the component
this.dispatchEvent(
  new CustomEvent('user-select', {
    detail: { userId: 42, username: 'Anatoly' },
    bubbles: true,
    composed: true,
  }),
);
```

---

## Chapter Conclusion

Custom Elements provide a clean, standardized, and high-performance way to create independent user interface components. Thanks to native integration with the browser lifecycle and event model, they seamlessly fit into any architectural patterns and frameworks without the need to include heavy third-party abstractions.