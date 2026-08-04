# Part II. Modern Interactive Elements

# Chapter 6. `<details>` and `<summary>`: Declarative Components of Modern HTML

Over the past few years, the `<details>` element has ceased to be perceived as a simple way to create an FAQ.

In the modern Web Platform, it is a fully-fledged **native component** with its own state, lifecycle, integration with Accessibility, page search, modern CSS, and browser architecture.

If previously such behavior was almost always implemented via JavaScript, in 2026 the majority of such interfaces can be described exclusively using HTML and CSS.

---

## 6.1. Why `<details>` Became Part of Modern HTML

### The History of the Disclosure Widget

The `<details>` element is the result of many years of evolution in web interfaces. In the early 2000s, developers often faced the task of hiding and revealing additional information: FAQ sections, technical specifications, comments. To achieve this, they had to write custom **Accordion components** in JavaScript, combine CSS animations, and manually manage state.

### Why Developers Wrote Their Own Solutions

- **JavaScript widgets** were the only way to implement interactivity.
- Each project had its own implementation: from simple scripts to complex libraries.
- This led to compatibility issues, code duplication, and maintenance difficulties.

### The Emergence of a Built-in Solution

With the development of the Web Platform, browsers began to include ready-made **native HTML components**. `<details>` and `<summary>` became a standard: now a developer can describe a disclosure block declaratively, without additional JavaScript.
This reduces errors, speeds up development, and makes interfaces more accessible for screen readers and keyboard navigation.

The evolution looks like this:

```
JavaScript Widget

↓

Native HTML Component
```

### Modern Web Platform Philosophy

The philosophy of Modern HTML is to **reduce dependency on third-party code** and provide developers with basic UI patterns directly in the browser.
This reflects several principles:

- **Simplicity**: less code means fewer errors.
- **Accessibility**: built-in elements immediately account for accessibility standards.
- **Unification**: consistent behavior across all browsers.
- **Productivity**: developers focus on logic, not infrastructure.

Thus, `<details>` has become a symbol of the transition from "everyone writes their own wheel" to a unified, built-in component ecosystem that aligns with the spirit of Modern HTML 2026.

---

## 6.2. Architecture of the Disclosure Widget

### What Is a Disclosure Widget

A **Disclosure Widget** is a built-in HTML mechanism that allows the user to control the visibility of additional content. It combines semantics, accessibility, and interactivity in a single element, freeing developers from having to write their own scripts.

### How the Browser Perceives the Structure

The browser interprets the component according to the hierarchy:

```
<details>   ← container managing state
   <summary> ← interactive trigger
   Content   ← hideable/revealable block
```

- **<details>** — the root element that stores the state (open/closed).
- **<summary>** — the interactive part that responds to clicks, keyboard events, and tells the browser to change state.
- **Content** — any nested markup that is displayed only when the state is active.

### Why `<summary>` Is Not Just a Heading

At first glance, `<summary>` resembles a heading, but its role is much broader:

- It is a **state trigger**, not just a text element.
- Supports keyboard control and automatically integrates with **ARIA attributes**.
- Can contain not only text but also icons, buttons, or other elements, forming a full-fledged UI control.

### How the Browser Manages State

- When interacting with `<summary>`, the browser toggles the internal `open` property of `<details>`.
- This property is synchronized with the DOM: the developer can check or change it via JavaScript.
- The browser automatically updates the visual representation (arrow, content expansion) and notifies assistive technologies (screen readers).
- Thus, `<details>` works as a **state controller** built into the platform: it manages logic, accessibility, and visualization without additional code.

---

## 6.3. `<details>` as a Finite State Machine

### From Simple State to a Model

Previously, `<details>` was perceived as a binary element:

```
open
closed
```

But in reality, the browser manages it as a full-fledged **finite state machine**, with intermediate states:

```
Closed

↓

Opening

↓

Open

↓

Closing

↓

Closed
```

### What Happens Inside the Browser

- **Closed** — content is hidden, the `open` attribute is absent.
- **Opening** — the user initiated expansion (click, keyboard, API). The browser starts animation, updates ARIA attributes, and prepares the DOM for display.
- **Open** — content is fully visible, the `open` attribute is set. The state is synchronized with accessibility and events.
- **Closing** — the reverse process: the browser hides content, updates state, and notifies assistive technologies.
- Return to **Closed** completes the cycle.

Thus, `<details>` works as a built-in **State Machine**, where transitions are managed by the browser, and the developer only needs to describe the structure.

### Why HTML Is Becoming a Declarative State Machine

The modern Web Platform philosophy aims to **describe interface states declaratively**, rather than manually via JavaScript.

- **Declarativeness**: the developer defines the structure, the browser manages behavior.
- **Automation**: built-in state transitions eliminate the need to write complex scripts.
- **Accessibility**: the browser itself synchronizes states with ARIA and screen readers.
- **Reliability**: a unified state model ensures consistent behavior across all browsers.

Ultimately, `<details>` is not just an element for hiding text, but an example of how HTML 2026 is transforming into a declarative state management system, where every component natively works as a finite state machine.

---

## 6.4. The `open` Attribute

### Breakdown

```html
<details open>
  <summary>Section Title</summary>
  <p>Content that is visible because the open attribute is present.</p>
</details>
```

The `open` attribute appears on the `<details>` element (and is conceptually similar to how `<dialog>`, `<popover>`, and other interactive elements with boolean state attributes behave). Externally, it's just another HTML attribute — but in essence, it is a **declarative record of component state directly in the markup**.

If the attribute is present — the block is expanded. If the attribute is absent — the block is collapsed. No JavaScript, no `useState`, no `class="is-open"` with a CSS selector `.is-open .content { display: block }`. The state _is text in the HTML_.

An important nuance: `open` is a boolean attribute. Its value doesn't matter. `<details open>`, `<details open="open">`, and `<details open="">` are equivalent. But `<details open="false">` is still an **open** state, because the browser checks not the attribute's value, but the mere fact of its presence. This is a common mistake for those who carry habits from JS frameworks (`open={false}`) directly into HTML templates.

### Why This Reflects Component State

In the classical frontend model, component state lives separately from markup:

- there is an `isOpen` variable in JS;
- there is markup that renders depending on this variable;
- there is synchronization code that ensures when `isOpen` changes, the markup re-renders.

`<details open>` breaks this three-part scheme. The state **is** the markup. Not "a variable that affects markup", but literally an HTML element attribute.

This fundamentally shifts where the single source of truth resides. Previously, the source of truth was a JS variable, and the DOM was derived from it, a computed representation. Now the source of truth is the DOM node itself and its attribute. Whether `<details>` is open or closed is not "a variable somewhere in a component closure" — it's a property you can see right in DevTools, in the Elements tab, without a single line of code.

Moreover, the browser itself manages toggling this state. A click on `<summary>` — and the browser itself adds or removes the `open` attribute on the parent `<details>`. The developer doesn't need to attach a click handler to toggle a flag. The handler is already built into the browser as part of the HTML specification.

### Distinction

```
HTML state
    ↓
DOM state
    ↓
Rendering
```

This chain is key to understanding why attributes like `open` change the mental model of state.

**HTML state** — what is written in the source markup (or generated on the server, in SSG, in a templating engine). If `<details open>` is written in the HTML, the block will be expanded on the first page render — even before a single line of JavaScript executes.

**DOM state** — what happens after parsing. The `open` attribute in the markup becomes the `HTMLDetailsElement.open` property in the object model. Then this property lives its own life: the user clicks — the browser changes `element.open` from `true` to `false` and back. You can also change it programmatically: `details.open = true`. DOM state is the runtime representation, the actual state of the object in the browser's memory, which may differ from the original HTML but is derived directly from it.

**Rendering** — what the user sees. The browser itself decides whether to show the `<details>` content or not, based on the current `open` value in the DOM. This is not a CSS class that the developer must add and coordinate with the team, but a built-in user agent behavior.

The key idea of this chain: **each subsequent level is a direct derivative of the previous one**, without an intermediate layer that the developer must write and maintain themselves. HTML turns into DOM automatically (the browser's parser does this). DOM turns into rendering automatically (the browser's layout engine does this). The developer is only left with one link in the chain that they are actually responsible for — the original HTML, and even that not always: this HTML may be the result of a simple condition on the server ("if the user previously opened this section — add `open`").

Compare this to the typical SPA model, where the chain looks different:

```
JS state (isOpen: true)
    ↓
Component re-render (virtual DOM / diff)
    ↓
Real DOM patch
    ↓
Rendering
```

Here there is one extra step, and this step is entirely the developer's responsibility: you need to declare state, declare a function that changes it, connect this function to an event handler, ensure the component actually re-renders when state changes. With `<details open>`, this step simply doesn't exist — it's implemented at the HTML specification level and built into every browser.

### Why the Developer No Longer Has to Store State Separately in JavaScript

From all of the above, a practical conclusion follows: **for a whole class of UI patterns, state can be completely omitted from JavaScript**.

Disclosure sections, accordions, dialog windows (`<dialog>`), popover tooltips (`popover`), checkboxes and radio buttons (`checked`), selected options (`selected`), disabled fields (`disabled`) — all of these are states that:

1. **live in markup** — they are visible in HTML/DOM without accessing JS;
2. **are managed by the browser** — state toggling (click, focus, input) is handled natively;
3. **are synchronized with rendering by definition** — no desynchronization can occur between "what should be displayed" and "what is actually displayed," because it's literally the same attribute.

This removes several classes of tasks from the developer:

- **No need to write a click handler** to open/close a block — the browser does this itself on click on `<summary>`.
- **No need to manually synchronize visual and logical state** — there is no situation where "according to data the block is open, but visually it's closed" (a bug typical of manual control via classes and state).
- **No need to think about state recovery on page reload** in the basic case — if the state is written to HTML on the server (e.g., in SSR or SSG), it will already be correct on first render, without "flashing" between closed and open states (the so-called _flash of wrong state_, familiar from client frameworks that apply state after hydration).
- **Easier to test and debug** — component state can be checked with a simple `document.querySelector('details').open`, without knowing the internal structure of the component, store, props, etc.
- **Accessibility comes "in the box"** — screen readers and other assistive technologies natively understand the semantics of `<details>`/`open`, whereas a custom accordion on `div`s requires ARIA attributes (`aria-expanded`, `aria-controls`) that also need to be manually synchronized with the same JS state.

This doesn't mean JavaScript disappears entirely. It remains needed where logic goes beyond what the specification describes: for example, if you need to close all other `<details>` when opening one (an accordion with exclusive expansion — by the way, in 2026 there is already a native `name` attribute that groups multiple `<details>` into a radio-button-like group), or if you need custom open/close animation.

But the very fact of **"open/closed"** — the basic boolean state of a component — no longer requires a separate variable, a separate store, a separate synchronization effect. It simply _exists_ in the markup. And this is the essence of the broader shift discussed throughout this chapter: modern HTML can declaratively describe what previously had to be imperatively assembled and maintained in JavaScript, reducing the number of places where application state can become desynchronized.

---

## 6.5. Exclusive Accordions via `name`

This is one of the most important innovations in modern HTML in recent years — quiet, almost unnoticed against the backdrop of discussions about Web Components and Custom Elements, yet addressing one of the most common frontend tasks: an accordion where only one section is open at a time.

### Breakdown

```html
<details name="faq">
  <summary>How do I process a return?</summary>
  <p>Returns are processed within 14 days...</p>
</details>

<details name="faq">
  <summary>How do I track my order?</summary>
  <p>The tracking number is sent to your email...</p>
</details>

<details name="faq">
  <summary>How do I contact support?</summary>
  <p>Via the form on the website or by phone...</p>
</details>
```

Three independent `<details>` elements. The only thing connecting them is the same value of the `name` attribute. This is enough for the browser to start treating them not as three separate elements, but as a **single group with exclusive expansion**: if you open the second section, the first will close automatically. Like radio buttons (`<input type="radio" name="…">`), but for disclosure blocks.

### How the Browser Automatically Builds an Accordion Group

```
Accordion Group
```

Before `name` was available on `<details>`, grouping "only one can be expanded at a time" was a task solved exclusively by JavaScript. The `name` attribute moves this task to the browser engine:

- The parser sees multiple `<details>` with the same `name` within the document.
- The browser registers them as a single logical group — just as it groups radio buttons by `name`, regardless of where exactly in the DOM tree they are located (they don't have to be siblings or in the same parent).
- When toggling the `open` attribute on one element in the group, the browser itself removes `open` from all other elements in the same group.

This happens at the rendering engine level, not at the markup or CSS level. The developer doesn't need to manually create a container structure that "knows" about its child accordions — the group itself exists implicitly, as a set of elements united by a common attribute value. This is the same principle we saw in section 6.4 with `open`: the state (in this case, "which section is currently expanded") is stored not in a JS data structure, but directly in the markup, and synchronization happens automatically because the browser handles it, not the programmer.

Important detail: grouping works even if the `<details>` elements are in different parts of the DOM — for example, some in one `<section>`, some in another. The main thing is matching `name` within a single document. This provides flexibility when laying out complex designs where the visual structure doesn't have to match the logical grouping.

### Why More Code Is No Longer Needed

```
querySelectorAll()
forEach()
removeAttribute("open")
```

Before `name`, typical code for an exclusive accordion looked roughly like this:

```js
const items = document.querySelectorAll('details.accordion-item');

items.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      items.forEach((other) => {
        if (other !== item) {
          other.removeAttribute('open');
        }
      });
    }
  });
});
```

Here the developer manually:

1. **finds** all elements in the group (`querySelectorAll`);
2. **subscribes** to the `toggle` event on each of them;
3. **iterates** over the other elements in the group on each open (`forEach`);
4. **closes** them imperatively (`removeAttribute("open")`).

Each of these steps is a potential source of bugs. Forgot to unsubscribe from an event when removing an element from the DOM — memory leak. Added a new FAQ item to the markup but didn't update the selector — the new element falls out of the group and doesn't participate in exclusive expansion. Dynamically loaded content appeared — `querySelectorAll` called once at page load simply won't see it, and you'll need `MutationObserver` or a re-initialization call.

With the `name` attribute, all four steps disappear entirely:

```html
<!-- This is all that's needed -->
<details name="faq">…</details>
<details name="faq">…</details>
<details name="faq">…</details>
```

- No need to **find** elements — the browser already knows which nodes belong to the group by the attribute value.
- No need to **subscribe** to events — state toggling is handled at the specification level.
- No need to **iterate** over other elements — closing behavior is built into the algorithm the browser executes when `<summary>` is activated.
- No need to **close** manually — the `open` attribute is removed from other elements automatically, by the same mechanism described in section 6.4 (DOM state changes, rendering follows without JS involvement).

Adding a new item to the accordion becomes a task of "insert another `<details name="faq">`" — without a single edit to a JS file, without the risk of forgetting to bind a handler to the new element.

### Fully Declarative Accordion

The result: an FAQ accordion, a calendar with expandable days, a menu with exclusive sub-items, tabs in the form of disclosure blocks — all of this can now be implemented **without a single line of JavaScript**:

```html
<h2>Frequently Asked Questions</h2>

<details name="faq" open>
  <summary>How do I process a return?</summary>
  <p>Returns are processed within 14 days of receiving the order.</p>
</details>

<details name="faq">
  <summary>How do I track my order?</summary>
  <p>The tracking number is sent to your email immediately after shipment.</p>
</details>

<details name="faq">
  <summary>How do I contact support?</summary>
  <p>Via the feedback form on the website or by phone hotline.</p>
</details>
```

Notice `open` on the first element — as in section 6.4, this is a statically defined initial state: the first section is open immediately on page load, before JS execution (which is simply absent here). The rest is styling via CSS (`::marker`, `::details-content`) and, if desired, lightweight open/close animation via CSS transitions.

This changes the very economics of developing such components. Previously, an "accordion" almost inevitably meant: either an npm package with a ready-made widget, or a custom JS module with event handlers, state, and synchronization — i.e., code that needs to be written, tested, maintained, and included in the bundle. Now it's three lines of HTML and one repeated attribute value. Logic that was previously the developer's responsibility has become the browser's responsibility — and, as a result, is no longer a source of bugs that a specific team on a specific project is responsible for.

---

## 6.6. The `toggle` Event — Component State Observer

In the web platform ecosystem, there has long been a gap: developers could easily track clicks or input field value changes, but they lacked a universal way to react to the **fact of a change in an element's visible state**. The `toggle` event closes this gap, providing a browser mechanism for observing binary component states.

### What `toggle` Is and When It Occurs

The `toggle` event fires on an element at the moment its state **explicitly changes** from "open" to "closed" or vice versa. In modern HTML, this event is tightly bound to two elements:

1. **`<details>`** — when the `open` attribute changes.
2. **Elements with the `popover` attribute** — when a popover opens or closes (in the HTML Living Standard specification).

It's important to understand: `toggle` is **not** a synonym for `click`. If a user clicks on `<summary>` but the `open` state doesn't change (e.g., the element was already open), the `toggle` event **does not fire**. This ensures that the handler only triggers on an actual state transition, eliminating spurious calls.

```html
<details id="faqItem">
  <summary>Why is this important?</summary>
  <p>Because we now know the exact moment of change.</p>
</details>

<script>
  const details = document.getElementById('faqItem');
  details.addEventListener('toggle', (e) => {
    // Only fires on transition: closed → open OR open → closed
    console.log('State changed!');
  });
</script>
```

---

### Why `toggle` Reflects Component State Change, Not User Action

This is where the key architectural difference lies. In the world of DOM events, there are two approaches:

- **Action events** (`click`, `keydown`, `pointerup`) — report _what the user did_.
- **State events** (`toggle`, `change`, `input`) — report _what the application has become_.

The `toggle` event belongs to the second category. It abstracts the developer from the source of the change. It doesn't matter whether the user opened `<details>` with a mouse click, by pressing `Enter`, via a programmatic `details.open = true` call, or by voice command. In all cases, the same `toggle` event will be generated.

This allows you to write code oriented toward the **result**, not the **cause**. You simply listen for a state change and react to it, without thinking about how exactly the user reached that state.

```javascript
// ❌ Bad: Tied to an action
summary.addEventListener('click', () => {
  if (details.open) {
    // Do something...
  }
});

// ✅ Good: Tied to state
details.addEventListener('toggle', () => {
  // We know for sure that the state has changed.
  // The source doesn't matter.
  updateUI(details.open);
});
```

---

### How to Use with `details.open`

The `details.open` property (and its corresponding HTML attribute) is the **single source of truth** for the component's state. The `toggle` event and the `open` property form an inseparable pair, analogous to `value` and `input` on text fields.

**Practical pattern: synchronizing with external state**

Often, you need opening one accordion to close another. The `toggle` event is ideal for this task:

```javascript
document.querySelectorAll('details').forEach((detailsEl) => {
  detailsEl.addEventListener('toggle', (e) => {
    // If this element just opened
    if (detailsEl.open) {
      // Close all other details in the same container
      const container = detailsEl.closest('.accordion-group');
      container.querySelectorAll('details').forEach((other) => {
        if (other !== detailsEl && other.open) {
          other.open = false; // Programmatic change will also fire toggle
        }
      });
    }
  });
});
```

**Important nuance:** Programmatic change `details.open = false` **also** generates the `toggle` event. This means you can build reaction chains without risk of infinite loops, since the event is synchronous but not recursive (the browser protects against nested calls).

---

### Component Lifecycle: Why the Browser Provides It to Us

Browsers are evolving from simple renderers into full-fledged frameworks built into the platform. Providing the `toggle` event is part of the larger philosophy of **"component web"**.

A component's lifecycle (in this case, `details`) includes:

1. **Mounting** — the element appears in the DOM.
2. **State update** — the `open` attribute changes (`toggle` event).
3. **Unmounting** — the element is removed from the DOM.

The browser gives us events precisely at the **state update** step, because:

- This is the **only stable moment** when the DOM has already been updated (the `open` attribute is set), but the user hasn't yet seen the repaint (animation may start later).
- This allows integrating native elements into reactive frameworks (React, Vue, Angular). Thanks to `toggle`, a framework can subscribe to a change and re-render its virtual DOM _in response_ to a browser state change, rather than the other way around.

**Example of use with CSS animations:**

```javascript
details.addEventListener('toggle', () => {
  const content = details.querySelector('.content');
  if (details.open) {
    // Start appearance animation
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    // Start collapse animation
    content.style.maxHeight = '0';
  }
});
```

In this example, `toggle` acts as a lifecycle trigger — we don't know _why_ the element opened, but we know for sure that _the moment has come_ to apply the animation.

---

### Extended Scenario: Working with `popover`

In the HTML 2026 specification, the `toggle` event is also supported on elements with the `popover` attribute. This makes it a universal tool for managing any popup interfaces:

```html
<div id="myPopover" popover>
  <p>This is a custom popover</p>
  <button popovertarget="myPopover">Close</button>
</div>

<script>
  const popover = document.getElementById('myPopover');
  popover.addEventListener('toggle', (e) => {
    // e.newState — 'open' or 'closed' (new state)
    // e.oldState — previous state
    if (e.newState === 'open') {
      document.body.style.overflow = 'hidden'; // Block scroll
    } else {
      document.body.style.overflow = '';
    }
  });
</script>
```

Note the `e.newState` and `e.oldState` properties — they are available for `popover` (and for `<dialog>` via a separate event), but not for `<details>`. This shows that the specification is evolving, but the concept remains unchanged: the browser provides the developer with **windows into the component's lifecycle**.

---

### Summary: The Philosophy of `toggle`

The `toggle` event is not just a convenience. It's a declaration that the browser is taking over state management of built-in components. The developer no longer needs to attach listeners to all possible sources of actions (mouse, keyboard, touch, voice). It's enough to subscribe to the **fact of a change**, and the browser will take care of notifying you at the right moment.

**Golden rule:** Use `toggle` wherever you need to react to the opening or closing of a native element. This will make your code resilient to new interaction methods that will appear in future browser versions.

---

## 6.7. `<details>` and Find-in-Page — A Hidden Contract with the Browser

There is functionality that few developers know about, but millions of users use daily. It's the interaction between the built-in page search (`Ctrl+F` / `Cmd+F`) and the `<details>` element. This is not just a convenient feature — it's a demonstration of deep integration between semantic markup and the user agent.

### What Happens When Search Finds Text Inside a Closed `<details>`

Imagine a scenario: a user opens a page with Frequently Asked Questions (FAQ), where each answer is hidden inside a `<details>`. The user presses `Ctrl+F` and enters a query, for example, "shipping cost". The browser finds this text inside a closed block.

**What the browser does:**

1. **Automatically expands** the `<details>` (sets the `open` attribute).
2. **Scrolls the page** so the found text is in the visible area (usually with a small top offset).
3. **Highlights** the found occurrence in the browser's standard way (orange/yellow background).

This behavior works in all modern browsers (Chrome, Firefox, Safari, Edge) and is part of the HTML specification, not a separate feature of a specific vendor.

```html
<!-- User searches for "warranty" -->
<details>
  <summary>Return Policy</summary>
  <p>
    Items can be returned within 14 days. Warranty on electronics — 2 years.
  </p>
  <!--   ^^^^ The word "warranty" is found, details will automatically open -->
</details>
```

---

### Why the Browser Automatically Opens the Relevant Section

This behavior is rooted in a fundamental principle of web standards: **information accessibility is primary over visual design**.

When a user performs a page search, they are explicitly expressing the intent to find specific information. The browser interprets this as a signal that the **obstacle** (a closed `<details>`) should be removed to achieve the user's goal. If the browser didn't expand the block, the user would see highlighting in an invisible place, which would cause frustration and violate the Principle of Least Surprise.

**Technical implementation (simplified):**

1. The browser's **search engine** scans the DOM tree, including hidden elements (since they are still present in the structure, just not displayed).
2. When a match is found, the browser checks whether the text is inside an element that has "collapsible container" semantics (`<details>` without the `open` attribute).
3. The browser forcibly adds the `open` attribute to this element **before** scrolling and highlighting are performed.
4. Important: this change **does not** generate the `toggle` event in the same sense as a user click (in some browsers the event may still fire, but it's handled with priority so as not to interfere with search).

```javascript
// The browser does something like this (conceptually):
function findInPage(query) {
  const match = findTextInDOM(query);
  if (match && match.isInsideClosedDetails()) {
    // Ignore the standard event flow
    match.closest('details').setAttribute('open', '');
    // Block toggle bubbling to prevent custom animation
    // that could break scrolling
  }
  scrollTo(match);
  highlight(match);
}
```

---

### Why It's Practically Impossible to Implement This Correctly in JavaScript

Developers often try to emulate this behavior manually: attach a handler to `keydown`, catch `Ctrl+F`, search for text in hidden blocks, and expand them. This approach is doomed to failure for several reasons:

#### 1. Impossible to Intercept Built-in Search

The `Ctrl+F` event **does not generate** any DOM event that can be intercepted on the page. This is a system-level browser command, processed at the engine level (Blink, Gecko, WebKit) before any JavaScript code gets control. Attempts to use `keydown` for `event.ctrlKey && event.key === 'f'` only block part of the scenarios, but don't work when using the browser menu (Edit → Find) or search via the address bar.

#### 2. Conflict with the `toggle` Event Lifecycle

If you use the `toggle` event to start a complex expansion animation (e.g., using `max-height` and CSS transitions), then on programmatic opening by the browser, your animation may conflict with the scrolling mechanics.

```javascript
// ❌ Error: Animation breaking Find-in-Page
details.addEventListener('toggle', () => {
  if (details.open) {
    // Animation takes 500ms
    content.style.transition = 'max-height 0.5s';
    content.style.maxHeight = content.scrollHeight + 'px';
  }
});
// If the browser opens details via find-in-page, scrolling will occur BEFORE the animation completes,
// and the user will see the wrong fragment, or the scrolling will be jerky.
```

#### 3. No Access to the Internal Search State

You cannot know what the user is searching for until they've entered the text and the browser has started highlighting. Even if you use `MutationObserver` to track highlighting changes (e.g., the `data-ms-editor` attribute or `::highlight` pseudo-elements), this won't give you the exact moment _before_ scrolling.

#### 4. Multiple Matches and Sequential Search

If the user presses `Enter` in the search window to move to the next match, the browser repeats the process: scrolls and, if necessary, expands the next closed `<details>`. Tracking this sequence in JavaScript is impossible, since each `Enter` press in the native search field is not passed to the DOM.

#### The Only Correct Approach: Do Nothing

The correct strategy is to **trust the browser**. Don't try to manage the `open` attribute in response to search. Instead:

- Use semantically correct markup.
- Ensure your CSS animations don't interfere with scrolling (use `scroll-behavior: auto` instead of `smooth` for elements that may be opened by search, or check whether the browser has intervened).
- If you need to perform an action after the browser has expanded `<details>` (e.g., send analytics), use `setTimeout` with zero delay or `requestAnimationFrame`:

```javascript
// The only safe way: check the state after the browser has completed all its operations
details.addEventListener('toggle', () => {
  // Use microtask or requestAnimationFrame to let the browser finish scrolling
  requestAnimationFrame(() => {
    if (details.open && isElementVisibleInViewport(details)) {
      // For example, sending analytics: the user saw this block through search
      sendAnalytics('details_opened_by_find', details.id);
    }
  });
});
```

---

### Design Pattern: How to Use This Feature in the UI

Knowing about this browser behavior, you can design interfaces that "help" search:

1. **Don't duplicate search:** If you have a custom page search field, use the native `find-in-page` as a backend (via `window.find()` in some browsers or the CSS `:target` pseudo-class), to avoid creating two independent search mechanisms.

2. **Anchors for `:target`:** If you use `<details>` with anchor links (`#id`), remember that the browser may also expand `<details>` when navigating to an anchor if the target element is inside. This is another channel through which the browser manages state.

3. **User indication:** Add a visual indicator (e.g., a found count) that updates when `<details>` opens, so the user understands that content was expanded automatically:

```html
<details>
  <summary>
    Question about delivery
    <span class="badge" hidden>Found!</span>
  </summary>
  <p>...</p>
</details>

<script>
  // Watch for open via toggle (but don't interfere with scrolling)
  document.querySelectorAll('details').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        const badge = d.querySelector('.badge');
        if (badge) badge.hidden = false;
        // Automatically hide after 5 seconds
        setTimeout(() => {
          badge.hidden = true;
        }, 5000);
      }
    });
  });
</script>
```

---

### Summary

The interaction between `<details>` and `find-in-page` is an example of a **system contract** that the browser enters into with semantic markup. The developer should not interfere with this process, because:

- The browser operates at a level below JavaScript, ensuring perfect synchronization of expansion, highlighting, and scrolling.
- Any attempt at emulation leads to UX degradation (jerky scrolling, animation conflicts, state loss).
- The only correct strategy is to use semantics correctly and not interfere with the browser's work.

Remember: **the best JavaScript for this functionality is its absence**. Trust the browser, and it will reward you with an impeccable user experience.

---

## 6.8. `<details>` and Accessibility — Automation and Responsibility

The `<details>` element is one of the few in HTML where accessibility is so deeply built into the specification that the developer gets a working interactive component "out of the box." But this is not magic — it's thoughtful semantics. Understanding what the browser does automatically and what remains on the developer's conscience is the key to creating truly inclusive interfaces.

---

### What the Browser Does Automatically

When you write `<details><summary>Heading</summary><p>Content</p></details>`, the browser takes on a significant portion of accessibility responsibilities. This is not just a convenience — it's an **integral part of the platform**.

#### 1. Component Role (ARIA Role)

The browser automatically projects the semantics of `<details>` and `<summary>` into the accessibility tree. This tree is used by screen readers to form the page's navigation model.

- The `<details>` element is automatically assigned the role **`group`** (in some implementations — `generic` with explicit disclosure container semantics).
- The `<summary>` element is assigned the role **`button`**, even if it's not a button by tag. This is critically important because the screen reader announces it as a button, not as regular text.

```html
<!-- The browser automatically adds to the accessibility tree: -->
<!-- <summary> -> button role -->
<!-- <details> -> group role, expandable state -->
```

#### 2. Keyboard Navigation

The browser provides full keyboard navigation without a single line of JavaScript:

- **`Space`** or **`Enter`** on `<summary>` — toggles the `open` state.
- **`Tab`** — moves between `<summary>` and interactive elements inside `<details>` (links, buttons, input fields).
- **Focus** automatically moves to `<summary>` when navigating the page.

This complies with WAI-ARIA recommendations for "disclosure" widgets. The browser implements the **Disclosure (Show/Hide)** pattern from the ARIA Authoring Practices Guide (APG).

#### 3. Screen Reader and State Announcement

Screen readers (NVDA, JAWS, VoiceOver, TalkBack) receive information from the accessibility tree and announce:

- **Name** — the text inside `<summary>`.
- **Role** — "button" (or "disclosure button").
- **State** — "expanded" or "collapsed".

This happens automatically because the browser manages the **`aria-expanded`** attribute in the background. You will never see this attribute in the DOM, but it is present in the accessibility tree.

```javascript
// The attribute is not in the DOM
<details>
  <summary>Read more</summary>
</details>

// But in the accessibility tree, the browser projects:
// summary has aria-expanded="false" (or "true")
```

#### 4. Semantics of Nested Content

The browser correctly handles nested elements. If there are headings (`<h1>`-`<h6>`), lists, or other semantic elements inside `<details>`, they are correctly included in the screen reader's navigation structure even in the closed state. Hidden content is not ignored — it's simply marked as collapsed.

---

### What Remains the Developer's Responsibility

The browser's automation covers the basic scenario, but in real projects, this is not enough. The developer is responsible for the following aspects.

#### 1. Explicit Naming (Accessible Name)

The browser uses the text inside `<summary>` as the button's name. If you replace the text with an icon or hide it visually, the screen reader may announce empty space.

```html
<!-- ❌ Error: screen reader will say "button" without a name -->
<details>
  <summary>
    <span aria-hidden="true">▼</span>
  </summary>
  <p>Content</p>
</details>

<!-- ✅ Correct: always has a text name -->
<details>
  <summary>
    <span aria-hidden="true">▼</span>
    More about the product
  </summary>
  <p>Content</p>
</details>

<!-- ✅ Alternative: hidden text for screen reader -->
<details>
  <summary aria-label="Show additional information">
    <span aria-hidden="true">▼</span>
  </summary>
  <p>Content</p>
</details>
```

#### 2. Focus Management in Complex Scenarios

By default, focus remains on `<summary>` after expansion. This is correct for accordions with short content. However, if inside `<details>` there is a form or long text, the user has to tab from `<summary>` to the content every time.

**Scenario for improvement:** If inside `<details>` there is a first interactive field (e.g., an input field), you can programmatically move focus after opening.

```javascript
details.addEventListener('toggle', () => {
  if (details.open) {
    // Find the first interactive element inside and move focus
    const firstInput = details.querySelector('input, textarea, button, a');
    if (firstInput) {
      // Small delay to let the browser finish rendering
      setTimeout(() => firstInput.focus(), 50);
    }
  }
});
```

**Important:** Do this consciously. Moving focus can disorient users if they don't expect it. Only use it in scenarios where it genuinely improves workflow.

#### 3. Explicit ARIA Attributes During Customization

If you create a custom accordion on `div` and `button`, you are obligated to manually manage ARIA attributes. For `<details>`, this is not required. But if you change the semantics (e.g., make `<details>` part of tabs), you need to add additional attributes.

```html
<!-- Rare case: explicit connection to an external control -->
<details id="section1" aria-labelledby="tab1">
  <summary id="tab1">Tab 1</summary>
  <p>Tab content</p>
</details>
```

#### 4. Custom State Indicators

The browser adds a marker (triangle) to `<summary>`, but it may not be sufficiently noticeable. The developer must provide a visual state that duplicates the semantic state.

```css
/* Explicit state display for sighted users */
details[open] summary .icon {
  transform: rotate(180deg);
}

/* Mandatory: keep the indicator for color-blind users */
details summary .icon {
  transition: transform 0.2s;
  display: inline-block;
}

/* Don't rely solely on color — use icons/text */
```

#### 5. Animation and Content Hiding

When using CSS animations for smooth expansion, it's important not to break accessibility:

```css
/* ❌ Error: display: none removes the element from the accessibility tree */
details:not([open]) .content {
  display: none;
}

/* ✅ Correct: hide visually, but keep in the accessibility tree */
details:not([open]) .content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  /* The element remains in the DOM and is accessible to screen readers */
}

/* But! The browser still doesn't allow screen readers to navigate inside closed details,
   so technically display: none is acceptable, but semantically worse */
```

---

### Common Mistakes and Their Consequences

#### Mistake 1: Nesting Interactive Elements Inside `<summary>`

```html
<!-- ❌ Violation: button inside a button -->
<details>
  <summary>
    Heading
    <button onclick="copy()">Copy</button>
  </summary>
</details>
```

**Why this is bad:** The screen reader sees a button inside a button. The ARIA tree becomes invalid. Keyboard navigation breaks — `Tab` may switch to the nested button, but it's inside the clickable area of `<summary>`.

**Solution:** Move interactive elements outside `<summary>` or use `<summary>` only for toggling.

#### Mistake 2: Multiple `<details>` Without Grouping

```html
<!-- ❌ The user doesn't understand whether the blocks relate to each other -->
<details>
  <summary>Question 1</summary>
</details>
<details>
  <summary>Question 2</summary>
</details>
```

**Why this is bad:** The screen reader doesn't know this is an accordion. It announces them as separate buttons without context.

**Solution:** Group them in `<section>` or `<div role="group">` with an explicit heading.

```html
<section aria-labelledby="faq-title">
  <h2 id="faq-title">Frequently Asked Questions</h2>
  <details>
    <summary>Question 1</summary>
  </details>
  <details>
    <summary>Question 2</summary>
  </details>
</section>
```

#### Mistake 3: Changing the Role of `<summary>`

```html
<!-- ❌ Don't do this -->
<details>
  <div role="button" tabindex="0">Heading</div>
</details>
```

**Why this is bad:** You lose automatic semantics. Now you are forced to manually manage `aria-expanded`, `aria-controls`, `click` and `keydown` handlers. You are essentially reinventing the wheel.

**Solution:** Always use `<summary>` as the first child of `<details>`. This is the only correct pattern.

#### Mistake 4: Ignoring `:focus-visible`

```css
/* ❌ Erasing the focus indicator */
summary:focus {
  outline: none;
}

/* ✅ Keep it, but make it nice */
summary:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  border-radius: 4px;
}
```

**Why this matters:** Keyboard users lose their bearings if the focus indicator is absent. This violates WCAG Success Criterion 2.4.7 (Focus Visible).

---

### Why `<details>` Is the Gold Standard of Accessibility

There are few elements in the web platform that provide full accessibility without JavaScript. `<details>` is one of them. It implements the pattern that ARIA specialists call **"progressive disclosure"**, with correct semantics, state, and control.

**The main principle of working with `<details>`:** don't break what works. Use it for its intended purpose, don't override roles, don't add unnecessary ARIA attributes unless needed, and always test your code with a real screen reader.

```javascript
// Good practice: testing the accessibility tree in the console
// (Chrome DevTools → Elements → Accessibility)
```

---

### Summary: The Contract Between Browser and Developer

| Aspect              | Browser Does                                                          | Developer Does                                                   |
| ------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Accessibility role  | Automatically assigns `button` to `<summary>`, `group` to `<details>` | Don't override roles                                             |
| Keyboard management | `Space`/`Enter` on `<summary>`, `Tab` navigation                      | Add support for additional hotkeys (optional)                    |
| State               | Manages `aria-expanded` in the accessibility tree                     | Provide a visual indicator                                       |
| Name                | Uses text inside `<summary>`                                          | Explicitly set accessible name when using icons                  |
| Focus               | Stays on `<summary>` after toggle                                     | Move focus only in exceptional scenarios                         |
| Markup validity     | Requires `<summary>` as the first child                               | Follow structure; don't nest interactive elements in `<summary>` |
| Style customization | —                                                                     | Add animations without breaking accessibility                    |

Remember: **the best accessibility is the one you don't have to write**. `<details>` embodies this principle. Your job is not to interfere with the browser doing its job.

---

## 6.9. Modern CSS Animation — The End of the Hack Era

If you've ever tried to animate the expansion of an element with a variable height (`height: auto`), you know the pain. Years of development were marred by workarounds: `max-height` with huge values, `transform: scaleY()`, JavaScript `scrollHeight` calculations, and dirty hacks with `requestAnimationFrame`. All of this is becoming a thing of the past. Browsers have finally provided a full toolkit for animating dynamic sizes.

### Why `height: auto` Couldn't Be Animated

To understand the revolution, you need to recall how CSS transitions and animations work. They are based on **interpolation** — calculating intermediate values between the start and end states.

```css
.element {
  height: 0;
  transition: height 0.3s;
}

.element.open {
  height: auto; /* ❌ The browser doesn't know how to interpolate between 0 and auto */
}
```

The problem is that `auto` is not a number. It's an instruction to the browser: "calculate the size based on the content." For interpolation, the browser needs a numeric value, and `auto` doesn't provide one. The browser cannot smoothly transition from `0px` to `auto` because the final value is unknown until the styles are applied.

As a result, the animation either didn't happen (instant switching), or `max-height` with a numeric value was used, which was always a compromise:

```css
/* ❌ Old hack: max-height with a deliberately large value */
.element {
  max-height: 0;
  transition: max-height 0.3s;
}

.element.open {
  max-height: 1000px; /* What if the content is more than 1000px? */
}
```

This worked but had problems: memory overuse, jerky animations with large values, and the inability to precisely match the timing to the actual size.

---

### Modern CSS Capabilities

In 2024–2026, CSS received three interconnected tools that solve the problem once and for all. Let's examine each.

---

#### 1. `interpolate-size` — Permission to Interpolate

This new CSS property tells the browser: "I want you to interpolate sizes, even if they are expressed through `auto` or other non-numeric values."

```css
.container {
  interpolate-size: allow-keywords;
  /* or inherit | initial | revert */
}
```

**How it works:**

`interpolate-size: allow-keywords` allows the browser to use **discrete interpolation** for keywords (`auto`, `min-content`, `max-content`, `fit-content`). The browser internally converts `auto` to a numeric equivalent based on the content at the start of the animation and uses that value for smooth transition.

```css
/* ✅ Now this works! */
.panel {
  height: 0;
  interpolate-size: allow-keywords;
  transition: height 0.3s ease;
}

.panel.open {
  height: auto;
}
```

**Important nuance:** The property must be applied to the element **before** the animation starts. It is not inherited by default, so you need to explicitly set it on the animated element.

---

#### 2. `calc-size()` — Calculations in the World of Sizes

If `interpolate-size` is permission, then `calc-size()` is a tool for precise calculations. This is a new type of function, similar to `calc()`, but working with sizes, including keywords.

```css
.element {
  /* Previously this was not allowed */
  height: calc-size(auto, size + 20px);
  /* Now it is! */
}
```

**Syntax:**

```css
calc-size(<size-keyword>, <math-function>)
```

Where `size` inside the function is a special keyword meaning "the original value calculated by the browser."

**Practical example: animation with paddings**

```css
.panel {
  max-height: 0;
  padding: 0;
  interpolate-size: allow-keywords;
  transition:
    max-height 0.3s,
    padding 0.3s;
}

.panel.open {
  max-height: calc-size(auto, size + 20px); /* auto + extra padding */
  padding: 10px 20px;
}
```

Here `calc-size(auto, size + 20px)` means: "take the content height (auto) and add 20 pixels on top." This allows animating not only the content itself, but also the padding that appears on expansion.

**Additional capabilities:**

```css
/* Use with other keywords */
height: calc-size(min-content, size * 1.5);
width: calc-size(fit-content, size + 2em);

/* Nested calculations */
height: calc-size(auto, size + calc(10px + 2vw));
```

---

#### 3. `transition-behavior: allow-discrete` — Animating Discrete Properties

Some CSS properties are **discrete** — they don't support smooth interpolation between values. These are `display`, `visibility`, `content-visibility`, `overlay`, and others. Previously, their change happened instantly in the middle of an animation (or at the end), creating jerks.

```css
/* ❌ display is not animated */
.element {
  display: none;
  opacity: 0;
  transition:
    opacity 0.3s,
    display 0.3s;
}

.element.open {
  display: block; /* Instant switching at the beginning or end */
  opacity: 1;
}
```

The `transition-behavior: allow-discrete` property allows controlling the moment of switching discrete properties.

```css
.element {
  display: none;
  opacity: 0;
  transition:
    opacity 0.3s,
    display 0.3s;
  transition-behavior: allow-discrete; /* Allow discrete animation */
}

.element.open {
  display: block;
  opacity: 1;
}

/* 🔥 Key point: starting state for the discrete property */
@starting-style {
  .element.open {
    display: block;
    opacity: 0;
  }
}
```

**How it works:**

1. When adding the `.open` class, `display` instantly becomes `block` (at the start of the transition), but `opacity` animates from 0 to 1.
2. When removing the `.open` class, `display` switches to `none` **at the end** of the animation, when `opacity` has already become 0.
3. `@starting-style` sets the initial state for the first frame of the animation (when the element appears in the DOM or changes `display`).

This solves the problem of "flashing" when elements appear/disappear.

---

### Complete Example: Perfect Expansion Animation

Now let's put it all together. Create a `<details>`-like component with smooth expansion that works perfectly.

```html
<div class="accordion">
  <button class="accordion-trigger">Show details</button>
  <div class="accordion-panel">
    <p>Content of any complexity. Text, lists, images...</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
</div>
```

```css
.accordion-panel {
  /* 1. Allow keyword interpolation */
  interpolate-size: allow-keywords;

  /* 2. Base state: hidden */
  height: 0;
  opacity: 0;
  overflow: hidden;

  /* 3. Discrete properties */
  display: none;

  /* 4. Transition setup */
  transition:
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease 0.1s,
    /* opacity starts with a delay */ display 0.4s;
  transition-behavior: allow-discrete;
}

.accordion-panel.open {
  /* 5. Final state: expanded */
  height: auto;
  opacity: 1;
  display: block;
}

/* 6. Starting state for discrete properties */
@starting-style {
  .accordion-panel.open {
    height: 0;
    opacity: 0;
    display: block;
  }
}

/* 7. Additional: animation of content inside */
.accordion-panel > * {
  transform: translateY(10px);
  transition: transform 0.3s ease 0.15s;
}

.accordion-panel.open > * {
  transform: translateY(0);
}
```

```javascript
// Management via JavaScript
const trigger = document.querySelector('.accordion-trigger');
const panel = document.querySelector('.accordion-panel');

trigger.addEventListener('click', () => {
  panel.classList.toggle('open');
  trigger.textContent = panel.classList.contains('open')
    ? 'Hide details'
    : 'Show details';
});
```

**What happens in this code:**

1. **`interpolate-size`** allows animating `height: auto`.
2. **`transition-behavior: allow-discrete`** allows animating `display`.
3. **`@starting-style`** sets the starting state for `display: block` so the element appears with zero height and opacity, then smoothly expands.
4. **`transition-delay`** for `opacity` creates the effect of text appearing after the container has expanded.
5. **Nested transform** creates a micro-animation of the content.

---

### Why Modern Browsers Finally Solved This Problem

The question is not about technical complexity, but about **architectural decisions**. Previously, rendering engines (Blink, Gecko, WebKit) didn't support dynamic size calculation during animation for several reasons:

1. **Performance.** Calculating `auto` requires a layout recalculation on each animation frame, which is potentially expensive. Modern engines have optimized this process using **composite layers** and **asynchronous computations**.

2. **Model integrity.** Previously, CSS assumed that property values were either known in advance or calculated once. `auto` violated this model. With the introduction of `interpolate-size`, browsers created a new abstraction layer: **"a computed value cached for the duration of the animation"**.

3. **Developer demand.** Years of community pain (and thousands of issue reports) led vendors to realize: without this feature, CSS cannot compete with JavaScript libraries (GSAP, Framer Motion) in the area of interface animations.

4. **Interoperability.** All three features (`interpolate-size`, `calc-size()`, `transition-behavior`) have been coordinated within the CSS Working Group and implemented in all modern browsers as an **interconnected package**. These are not scattered experiments, but a cohesive solution.

---

### Compatibility and Progressive Enhancement

As of 2026, support is stable in:

- Chrome 124+
- Firefox 128+
- Safari 17.4+
- Edge 124+

For older browsers, use graceful degradation:

```css
/* Fallback: without animation, but functional */
.accordion-panel {
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
}

.accordion-panel.open {
  height: auto;
}

/* Support for browsers that don't know interpolate-size,
   will just be instant switching — acceptable */
@supports (interpolate-size: allow-keywords) {
  .accordion-panel {
    interpolate-size: allow-keywords;
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

---

### Summary: A New Era of CSS Animations

Three tools — `interpolate-size`, `calc-size()`, and `transition-behavior: allow-discrete` — transform CSS from a language that "almost can animate" into a full-fledged animation platform.

| What Was Before                        | What It Is Now                           |
| -------------------------------------- | ---------------------------------------- |
| Hacks with `max-height: 9999px`        | `height: auto` with smooth interpolation |
| Breakage with `display: none`          | Smooth appearance with `@starting-style` |
| JavaScript `scrollHeight` calculations | `calc-size(auto, size + Npx)`            |
| Dependency on external libraries       | Pure CSS, built into the browser         |

**Key takeaway:** Modern CSS enables animations that previously required thousands of lines of JS code. Use these capabilities to make your interfaces not only beautiful but also performant, accessible, and maintainable.

---

## 6.10. `<details>` as a Declarative Component — A Built-in Atom of the Web Platform

In the world of frontend development, we're used to frameworks: React, Vue, Angular, Svelte. We create components, manage their state, describe lifecycles, write event handlers, and struggle with accessibility. But what if the platform already provides a ready-made, full-fledged component that does all of this out of the box?

`<details>` is not just a tag for an accordion. It is a **declarative UI component** built into the web platform. It has all the attributes we're used to designing in custom components, but without the need to write JavaScript, manage rendering, or include libraries.

---

### The Component Approach: What Makes `<details>` a Full-Fledged Component

Any UI component, regardless of framework, is characterized by a set of key properties. `<details>` implements each of them at the browser level.

---

#### 1. State

The component has a binary state: open or closed. It is stored in the `open` attribute.

```html
<!-- Closed -->
<details>
  <summary>Heading</summary>
</details>

<!-- Open -->
<details open>
  <summary>Heading</summary>
</details>
```

**Features:**

- The state is **explicit** — it is present in the markup and can be read/changed via the DOM API.
- The state is **persistent** — on page reload, the browser by default **does not** preserve the state (unlike, for example, checkboxes). But the developer can easily implement persistence via `localStorage` or the `open` attribute in server rendering.
- The state is **reactive** — changing the `open` attribute automatically re-renders the component.

```javascript
// Reading state
const isOpen = details.open; // true/false

// Setting state (triggers re-render and the toggle event)
details.open = true;
```

---

#### 2. API (Public Interface)

The component provides a clear programmatic interface for interaction.

**DOM properties:**

- `details.open` — getter/setter for state.
- `details.name` — grouping elements (if multiple `<details>` have the same `name`, only one can be open at a time).

**Methods:**

- `details.show()` and `details.close()` — programmatic control (in some implementations).
- `details.toggle()` — toggle state (not supported in all browsers, but can be emulated).

**Attributes:**

- `open` — boolean attribute.
- `name` — string attribute for grouping.

```javascript
// Programmatic control
details.open = true; // Show
details.open = false; // Hide

// Grouping accordions (only one open)
<details name="faq">
    <summary>Question 1</summary>
</details>
<details name="faq">
    <summary>Question 2</summary>
</details>
<!-- When the second one opens, the first will automatically close -->
```

---

#### 3. Events

The component generates events, allowing reactions to changes.

```javascript
details.addEventListener('toggle', (event) => {
  console.log('State changed:', details.open);
  // event doesn't contain additional data for <details>
  // (unlike popover, which has newState/oldState)
});
```

**Feature:** The `toggle` event fires **after** the state change, when the DOM is already updated. This allows safely reading the new state inside the handler.

---

#### 4. Lifecycle

Like any component, `<details>` goes through stages of existence in the DOM.

| Stage                | Description                         | Event                           |
| -------------------- | ----------------------------------- | ------------------------------- |
| **Mounting**         | The element appears in the DOM      | `DOMContentLoaded` (indirectly) |
| **State update**     | `open` changes                      | `toggle`                        |
| **Attribute update** | Other attributes change             | `MutationObserver` (optional)   |
| **Unmounting**       | The element is removed from the DOM | `DOMNodeRemoved` (indirectly)   |

```javascript
// Full management cycle
const details = document.createElement('details');
const summary = document.createElement('summary');
summary.textContent = 'Heading';
details.appendChild(summary);

// Mounting
document.body.appendChild(details);

// State update
details.open = true; // → toggle event

// Unmounting
details.remove();
```

---

#### 5. Accessibility

As we covered in detail in Chapter 6.8, `<details>` provides accessibility out of the box:

- Correct ARIA roles (`button`, `group`).
- Management of `aria-expanded` in the accessibility tree.
- Full keyboard navigation (`Space`, `Enter`, `Tab`).
- Correct screen reader announcement.
- Semantic structure for navigation tools.

**What this means in the context of a component:** The developer gets an accessible component **without needing** to add `role`, `aria-*`, `tabindex`, or keyboard handlers. This reduces code volume by 80-90% compared to a custom accordion.

---

#### 6. CSS Styling

The component is fully stylable via CSS, supporting all modern capabilities.

**Pseudo-classes:**

```css
details[open] {
  /* Styles for open state */
}

details:not([open]) {
  /* Styles for closed state */
}

summary::-webkit-details-marker {
  /* Customize marker in WebKit */
  display: none;
}

summary::marker {
  /* Customize marker in modern browsers */
  color: blue;
  font-size: 1.2em;
}
```

**Customization via pseudo-elements:**

```css
/* Full marker replacement */
summary {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

summary::before {
  content: '▶';
  transition: transform 0.3s;
}

details[open] summary::before {
  content: '▼';
  transform: rotate(90deg);
}
```

**Content animation (using modern CSS capabilities from Chapter 6.9):**

```css
details .content {
  interpolate-size: allow-keywords;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}

details[open] .content {
  height: auto;
}
```

---

#### 7. DOM Integration

The component is a full-fledged member of the DOM tree and supports all standard methods:

```javascript
// Search and navigation
const details = document.querySelector('details');
const summary = details.querySelector('summary');
const content = details.querySelector('p');

// Cloning
const clone = details.cloneNode(true);

// Inserting content
details.innerHTML = '<summary>New heading</summary><p>New content</p>';

// Working with attributes
details.setAttribute('open', '');
details.removeAttribute('open');

// Event model
details.addEventListener('toggle', handler);
details.removeEventListener('toggle', handler);
```

**Integration with forms:**

- `<details>` can contain form fields.
- When submitting a form, data from fields inside a closed `<details>` **is not sent** (since they are considered hidden). This is important to consider when designing.

---

### Comparison with a Custom Framework Component

To appreciate the power of `<details>`, let's compare it to a typical accordion in React.

**React component (simplified):**

```jsx
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="panel"
      >
        {title}
      </button>
      <div id="panel" className={`panel ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}
```

**Native `<details>`:**

```html
<details>
  <summary>Heading</summary>
  <p>Content</p>
</details>
```

| Aspect              | React Component                           | `<details>`                  |
| ------------------- | ----------------------------------------- | ---------------------------- |
| Component code      | ~30 lines JSX + CSS                       | 2 lines HTML                 |
| State management    | `useState`                                | Built-in (`open`)            |
| Click handling      | Manual (`onClick`)                        | Automatic                    |
| Keyboard navigation | Manual (`onKeyDown`)                      | Built-in                     |
| ARIA attributes     | Manual (`aria-expanded`, `aria-controls`) | Automatic                    |
| Accessibility       | Requires audit                            | Guaranteed by platform       |
| Bundle size         | Framework weight                          | 0 bytes (built into browser) |
| Performance         | Depends on virtual DOM                    | Native, maximum              |

---

### Why `<details>` Is More Than an Accordion

Conceptually, `<details>` is an implementation of the **"progressive disclosure"** pattern. But its significance extends beyond a UI pattern.

#### 1. Declarative vs. Imperative

`<details>` embodies the principle of declarative programming: **you describe what should be, not how to achieve it**. You tell the browser: "here's a heading, here's content, I want this to be expandable." The browser takes care of all implementation details.

This is the opposite of the imperative approach of frameworks, where you write instructions: "on click, change state, re-render DOM, update ARIA attributes."

#### 2. Resilience

`<details>` works even with JavaScript disabled (unlike 99% of custom accordions). This makes it ideal for:

- **Progressive enhancement.**
- **Server-side rendering (SSR)** without hydration.
- **Adaptive interfaces** with JS disabled (e.g., in poor internet conditions).

#### 3. Single Source of Truth

Component state is stored in one place — the `open` attribute in the DOM. There is no desynchronization between React state, Redux store, and DOM tree. This simplifies debugging and makes behavior predictable.

#### 4. Platform Evolution

`<details>` is not static. The specification is evolving:

- Grouping via `name` appeared (accordions with automatic closing).
- Integration with `find-in-page` appeared.
- New CSS capabilities for animation appeared.
- API expansion is planned (e.g., `show()`/`hide()` methods).

This means your `<details>` code will automatically receive new capabilities without changes on your part.

---

### Architectural Conclusion: Platform Components vs. Framework Components

`<details>` is an example of a **system component**. It is part of the platform, not a library. This changes the approach to web application architecture:

1. **Use native components whenever possible.** They are faster, more accessible, and require less code.
2. **Reserve custom components only for what the platform doesn't have.** Tables with sorting, complex date pickers, custom selects — that's where frameworks are needed.
3. **Teach your team semantic HTML.** Knowing `<details>` and its capabilities saves weeks of development.

```javascript
// Bad refactoring: replacing details with a custom component
// ❌ Why?
<Accordion title="Heading">
    <p>Content</p>
</Accordion>

// ✅ Leave it as is
<details>
    <summary>Heading</summary>
    <p>Content</p>
</details>
```

---

### Summary: `<details>` as a Platform Manifesto

`<details>` is not just a control element. It is a **manifesto of the web platform philosophy**:

- **Semantics are primary** — correct markup solves most problems.
- **Accessibility is built-in** — you get it for free.
- **Performance is guaranteed** — native code is always faster than JavaScript.
- **Future-proof** — the platform evolves, and your code evolves with it.

Use `<details>`. Don't complicate where you can stay simple. The platform has already provided you with a ready-made solution — take advantage of it.

---

### Practical Checklist: When to Use `<details>`

| Scenario                                    | Use `<details>`              | Use Custom Component |
| ------------------------------------------- | ---------------------------- | -------------------- |
| FAQ / accordion                             | ✅ Yes                       | ❌ No                |
| Hiding additional information               | ✅ Yes                       | ❌ No                |
| Settings / options (non-critical)           | ✅ Yes                       | ❌ No                |
| Multi-level accordions                      | ✅ Yes (nested)              | ❌ No                |
| Complex animation (with custom curve)       | ✅ Yes (via CSS)             | ❌ No                |
| Synchronization with external state (Redux) | ✅ Yes (via `details.open`)  | ❌ No                |
| Custom trigger (not `<summary>`)            | ❌ No                        | ✅ Yes               |
| Non-standard behavior (e.g., swipe)         | ❌ No                        | ✅ Yes               |
| Integration with animation libraries        | ❌ No (or on top of details) | ✅ Yes               |

**Golden rule:** If your accordion can be implemented via `<details>`, implement it via `<details>`. It will save time, nerves, and make the internet better.

---

## 6.11. `<details>` and Modern Frameworks — Native Accordion in the Ecosystem

One of the most frequent questions in modern web development is: "Why should I write a custom accordion when `<details>` exists?" In the era of framework dominance (React, Vue, Angular, Svelte, Qwik, Astro), we're used to creating components for everything. But the platform is evolving, and native solutions are becoming increasingly attractive.

Let's examine each framework, assess the need for a custom component, and understand why UI libraries are beginning to rethink their approaches.

---

### General Principle: When HTML Is Enough

Before diving into framework details, let's formulate a universal criterion:

**Use native `<details>` if:**

- You need a simple accordion or disclosure block.
- No need for a custom trigger (you can use `<summary>`).
- No complex synchronization with global state (Redux, Pinia, NgRx).
- You're not using animation libraries (GSAP, Framer Motion) for expansion management.
- SEO and out-of-the-box accessibility are important.
- You want to minimize the bundle and speed up loading.

**Create a custom component if:**

- A non-standard trigger is needed (e.g., a button outside the accordion).
- Complex animation that can't be implemented via CSS (or you need to control animation from JavaScript) is required.
- The accordion must synchronize with external state (e.g., open/closed depending on the URL).
- Custom behavior is necessary (e.g., confirmation before closing).
- The accordion integrates with a design system that requires strict control over markup.

---

### React

#### Standard Approach

In React, an accordion is a classic example of using `useState` and `useCallback`.

```jsx
// ❌ Traditional React accordion (30+ lines)
function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="accordion">
      <button
        className="accordion-trigger"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
      >
        {title}
      </button>
      <div
        id={`panel-${id}`}
        className={`accordion-panel ${isOpen ? 'open' : ''}`}
        role="region"
        aria-labelledby={`trigger-${id}`}
      >
        {children}
      </div>
    </div>
  );
}
```

#### Alternative: Native `<details>`

```jsx
// ✅ Native approach (2 lines)
function Accordion({ title, children }) {
  return (
    <details>
      <summary>{title}</summary>
      {children}
    </details>
  );
}
```

**Comparison:**

| Aspect          | Custom Component             | Native `<details>` |
| --------------- | ---------------------------- | ------------------ |
| Component code  | ~30 lines JSX                | 2 lines JSX        |
| State           | `useState` + synchronization | Built-in (`open`)  |
| ARIA attributes | Manual                       | Automatic          |
| Keyboard        | Manual (`onKeyDown`)         | Built-in           |
| Bundle          | ~2-3 KB (with dependencies)  | 0 bytes            |
| SSR             | Requires hydration           | Works without JS   |
| Testing         | Unit tests needed            | Not required       |

#### Special Case: React 19 and Server Components

In React 19 with Server Components, native `<details>` becomes even more attractive. It works without client-side JavaScript, which is ideal for components that don't require client-side interactivity.

```jsx
// Server Component - no "use client"
export default function FAQ({ items }) {
  return (
    <section>
      {items.map((item) => (
        <details key={item.id}>
          <summary>{item.question}</summary>
          <div dangerouslySetInnerHTML={{ __html: item.answer }} />
        </details>
      ))}
    </section>
  );
}
```

**When a custom component is still needed in React:**

1. **Integration with Zustand/Redux:** If accordion state must be stored in a global store.
2. **Animations with Framer Motion:** For complex animations that can't be implemented via CSS.
3. **Controlled component:** When the parent must manage state.

```jsx
// Controlled component (justified case)
function ControlledAccordion({ isOpen, onToggle, title, children }) {
  return (
    <details open={isOpen}>
      <summary
        onClick={(e) => {
          e.preventDefault();
          onToggle(!isOpen);
        }}
      >
        {title}
      </summary>
      {children}
    </details>
  );
}
```

---

### Vue

#### Standard Approach

Vue offers reactivity via `ref` and directives.

```vue
<!-- ❌ Traditional Vue accordion -->
<template>
  <div class="accordion">
    <button
      class="accordion-trigger"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      :aria-controls="`panel-${id}`"
    >
      {{ title }}
    </button>
    <div :id="`panel-${id}`" class="accordion-panel" :class="{ open: isOpen }">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  defaultOpen: Boolean,
});

const isOpen = ref(props.defaultOpen);
</script>
```

#### Alternative: Native `<details>`

```vue
<!-- ✅ Native approach -->
<template>
  <details :open="isOpen" @toggle="onToggle">
    <summary>{{ title }}</summary>
    <slot />
  </details>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  defaultOpen: Boolean,
});

const isOpen = ref(props.defaultOpen);

const onToggle = () => {
  // React to change if needed
  emit('update:open', isOpen.value);
};
</script>
```

**Advantages in Vue:**

- `v-model` can be bound to `open`.
- Less reactivity — less virtual DOM work.
- Easier to test (less logic).

```vue
<!-- Two-way binding -->
<details v-model:open="isOpen">
    <summary>Heading</summary>
    <p>Content</p>
</details>
```

#### Vue Feature: Transition Component

Vue has a built-in `<Transition>` component for animations. It works great with native `<details>`:

```vue
<template>
  <details>
    <summary>{{ title }}</summary>
    <Transition name="slide">
      <div v-if="isOpen" class="content">
        <slot />
      </div>
    </Transition>
  </details>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
```

**When a custom component is needed in Vue:**

1. **Integration with Pinia/Vuex:** Global state.
2. **Complex animations via `@keyframes`:** When standard transitions aren't enough.
3. **Custom trigger:** When you need something other than `<summary>`.

---

### Angular

#### Standard Approach

Angular uses decorators and template syntax.

```typescript
// ❌ Traditional Angular accordion
@Component({
  selector: 'app-accordion',
  template: `
    <div class="accordion">
      <button
        (click)="toggle()"
        [attr.aria-expanded]="isOpen"
        [attr.aria-controls]="panelId"
      >
        {{ title }}
      </button>
      <div [id]="panelId" class="accordion-panel" [class.open]="isOpen">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() defaultOpen: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  isOpen = this.defaultOpen;

  toggle() {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }
}
```

#### Alternative: Native `<details>`

```typescript
// ✅ Native approach
@Component({
  selector: 'app-accordion',
  template: `
    <details [open]="isOpen" (toggle)="onToggle()">
      <summary>{{ title }}</summary>
      <ng-content></ng-content>
    </details>
  `,
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  onToggle() {
    // The toggle event will fire on change
    // isOpen is already updated by the browser
    this.isOpenChange.emit(this.isOpen);
  }
}
```

**Angular features:**

- Change Detection works correctly, as the `open` attribute change triggers an update.
- `[(isOpen)]` can be used for two-way binding.

```typescript
// Two-way binding (banana-in-a-box)
<app-accordion [(isOpen)]="accordionOpen" title="Heading">
    <p>Content</p>
</app-accordion>
```

**When a custom component is needed in Angular:**

1. **Integration with NgRx:** Global state.
2. **Reactive Forms:** If the accordion is part of a form and needs to react to validation.
3. **Custom animations via Angular Animations:** When more complex control than CSS transitions is needed.

---

### Svelte

Svelte is one of the frameworks where native `<details>` feels particularly organic.

#### Standard Approach

```svelte
<!-- ❌ Traditional Svelte accordion -->
<script>
    export let title;
    export let defaultOpen = false;

    let isOpen = defaultOpen;

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="accordion">
    <button
        on:click={toggle}
        aria-expanded={isOpen}
    >
        {title}
    </button>
    {#if isOpen}
        <div class="accordion-panel">
            <slot />
        </div>
    {/if}
</div>
```

#### Alternative: Native `<details>`

```svelte
<!-- ✅ Native approach (almost no JS) -->
<script>
    export let title;
    export let open = false;

    // Reactive binding
    $: console.log('State changed:', open);
</script>

<details bind:open>
    <summary>{title}</summary>
    <slot />
</details>

<!-- Variant: fully declarative -->
<details>
    <summary>Heading</summary>
    <slot />
</details>
```

**Advantages in Svelte:**

- `bind:open` — two-way binding works "out of the box."
- Less code (Svelte is already minimalistic).
- Assignment-based reactivity (`$:`) works great with attributes.

```svelte
<!-- Extended example: synchronization with localStorage -->
<script>
    import { onMount } from 'svelte';

    export let id;
    let open = false;

    onMount(() => {
        const saved = localStorage.getItem(`accordion-${id}`);
        if (saved) open = saved === 'true';
    });

    $: localStorage.setItem(`accordion-${id}`, open);
</script>

<details bind:open>
    <summary>Synchronized accordion</summary>
    <slot />
</details>
```

**When a custom component is needed in Svelte:**

1. **Complex animation:** Although Svelte has built-in transitions, native `<details>` is limited to CSS.
2. **Synchronization with multiple sources:** When state depends on URL, store, and props.
3. **SvelteKit with adaptive rendering:** Sometimes you need to control state on the server.

---

### Qwik

Qwik is a framework focused on lazy loading (resumability). Native `<details>` is an ideal solution here.

#### Qwik Feature

Qwik doesn't hydrate components on the client, but resumes them. This means interactivity is only added where it's needed.

```tsx
// ✅ Qwik: native details without client code
import { component$ } from '@builder.io/qwik';

export const FAQ = component$(({ items }) => {
  return (
    <section>
      {items.map((item) => (
        <details>
          <summary>{item.question}</summary>
          <div dangerouslySetInnerHTML={item.answer} />
        </details>
      ))}
    </section>
  );
});
```

**Advantages for Qwik:**

- `<details>` works without JavaScript — ideal for resumability.
- No need to load accordion code (saving ~5-10 KB).
- The browser takes over state management.

#### When a Custom Component Is Needed in Qwik

Only when complex logic is required that isn't covered by native behavior.

```tsx
// Justified case: custom trigger
export const CustomAccordion = component$(({ title, children }) => {
  const isOpen = useSignal(false);

  return (
    <div>
      <button
        onClick$={() => (isOpen.value = !isOpen.value)}
        aria-expanded={isOpen.value}
      >
        {title}
      </button>
      {isOpen.value && <div>{children}</div>}
    </div>
  );
});
```

---

### Astro

Astro is a framework that renders static content by default and only adds JavaScript when needed. For `<details>`, this is an ideal scenario.

#### Island Architecture

```astro
---
// Astro component (rendered on server)
const faqItems = [
    { question: 'What is Astro?', answer: '...' },
    // ...
];
---

<section>
    {faqItems.map(item => (
        <!-- ✅ Native details - 0 bytes JS on the client -->
        <details>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
        </details>
    ))}
</section>
```

**Advantages for Astro:**

- Fully static — no need to hydrate the accordion.
- Works without JavaScript (even if the user has disabled JS).
- SEO-friendly — all content is visible to crawlers.

#### When a Custom Component Is Needed in Astro

Only when interactivity is required that goes beyond native behavior.

```astro
---
// Justified case: accordion with analytics
import { clientOnly } from 'astro:client';
const AnalyticsAccordion = clientOnly('@/components/AnalyticsAccordion');
---

<AnalyticsAccordion client:load>
    <!-- Client component for tracking opens -->
</AnalyticsAccordion>
```

---

### Why UI Libraries Are Starting to Use Native `<details>`

In 2024–2026, we are seeing a trend: major UI libraries are rethinking their accordions.

#### Examples:

1. **Radix UI** — one of the most popular React libraries — added the ability to use `<details>` as a base element.
2. **Material-UI (MUI)** — in its experimental components, it uses `details` to reduce the bundle.
3. **shadcn/ui** — offers both approaches, but recommends native for simple scenarios.
4. **Headless UI** (Tailwind) — added support for `<details>` as an alternative to its `Disclosure`.

#### Reasons for This Trend:

1. **Bundle size reduction:** Native `<details>` weighs 0 bytes in the bundle vs. 2-3 KB for a custom component.
2. **Performance:** The browser implements the accordion at the engine level — faster than any JavaScript.
3. **Accessibility:** ARIA attributes and keyboard management are already implemented at the platform level.
4. **Semantic markup:** Crawlers and screen readers better understand native elements.
5. **Ease of maintenance:** Less code — fewer bugs.
6. **Future:** The specification is evolving, and the native component will automatically receive new capabilities.

---

### Practical Recommendations

#### For All Frameworks

```javascript
// Selection strategy
function shouldUseNativeDetails(scenario) {
  const simple =
    !scenario.customTrigger &&
    !scenario.complexAnimation &&
    !scenario.globalState &&
    !scenario.customBehavior;

  return simple; // 90% of cases
}
```

#### Decision Criteria

| Criterion         | Native `<details>` | Custom Component        |
| ----------------- | ------------------ | ----------------------- |
| Simple accordion  | ✅ Always          | ❌ Overkill             |
| Grouping (name)   | ✅ Built-in        | ❌ Need to write        |
| Custom trigger    | ❌ Not possible    | ✅ Needed               |
| Complex animation | ❌ Limited         | ✅ Full control         |
| Global state      | ❌ No              | ✅ Yes (Redux/Pinia)    |
| Form integration  | ⚠️ Partial         | ✅ Full                 |
| SEO               | ✅ Excellent       | ⚠️ Depends on SSR       |
| Accessibility     | ✅ Perfect         | ⚠️ Requires audit       |
| Performance       | ✅ Maximum         | ⚠️ Depends on framework |

#### Example: Hybrid Approach

The most pragmatic way is to use native `<details>` as the base layer, and a custom component as an overlay:

```tsx
// Hybrid component in React
function HybridAccordion({ title, children, useNative = true, onToggle }) {
  if (useNative) {
    return (
      <details onToggle={onToggle}>
        <summary>{title}</summary>
        {children}
      </details>
    );
  }

  // Fallback to custom component
  return (
    <CustomAccordion title={title} onToggle={onToggle}>
      {children}
    </CustomAccordion>
  );
}
```

---

### Summary: The Era of Minimalism

`<details>` is an example of how the platform is catching up and surpassing frameworks in some aspects. Modern developers are increasingly asking: "Do I need a framework for this component?"

**Golden rule:**

> If your accordion can be implemented via `<details>`, implement it via `<details>`. Write a custom component only when native behavior is insufficient. This rule saves time, resources, and makes your code more resilient.

In a world where performance and accessibility are becoming critical factors, native solutions are not a compromise, but a conscious choice in favor of the platform.

---

## 6.12. When Not to Use `<details>`

A very important practical chapter.

Why `<details>` is not a universal component.

Not suitable for:

- Tabs;
- Menu;
- Popover;
- Dialog;
- Navigation Drawer;
- Tree View.

When to use:

```
Popover API

↓

<dialog>

↓

details
```

How to choose the right platform component.

---

## 6.13. Architectural Recommendations — Practical Rules for Using `<details>`

Throughout our work with `<details>`, we've journeyed from basic semantics to complex animations, framework integration, and accessibility. Now it's time to consolidate this knowledge into a system of practical rules.

This section is not just a list of tips. It is an **architectural manifesto** that will help you make the right decisions when designing interfaces on the platform.

---

### 1. Use `<details>` for Information Disclosure, Not for Arbitrary Interactivity

#### Rule

`<details>` is intended for **progressive disclosure** — showing/hiding additional content. It should not be used to implement other interactive patterns: tabs, modal windows, dropdown menus, or carousels.

#### Why

- **Semantic precision:** The browser, screen readers, and search engines interpret `<details>` as a container with toggleable content. Using it for other purposes violates user expectations.
- **Accessibility:** Other patterns (tabs, modals) have their own ARIA roles and behaviors that `<details>` does not provide.
- **Future:** The specification is evolving for a specific pattern. Misusing the element may lead to problems with browser updates.

#### ✅ Correct

```html
<!-- Disclosure of additional information -->
<details>
  <summary>Technical specifications</summary>
  <dl>
    <dt>Processor</dt>
    <dd>Intel Core i7</dd>
    <dt>Memory</dt>
    <dd>16 GB</dd>
  </dl>
</details>
```

#### ❌ Incorrect

```html
<!-- Using details as tabs -->
<details>
  <summary>Tab 1</summary>
  <div>Tab 1 content</div>
</details>
<details>
  <summary>Tab 2</summary>
  <div>Tab 2 content</div>
</details>
<!-- details doesn't support tab behavior (switching without closing) -->
```

```html
<!-- Using details as a modal window -->
<details>
  <summary>Open modal</summary>
  <dialog>Modal window</dialog>
</details>
<!-- For modals, use <dialog> -->
```

#### Exceptions

- If your accordion visually looks like tabs but behaves like an accordion (one open at a time), it's acceptable.
- If you use `<details>` as a base structure but add JavaScript on top to extend behavior (e.g., for tabs with state persistence), it may be justified but requires caution.

---

### 2. Use the `name` Attribute for Building Exclusive Accordions

#### Rule

Use the `name` attribute to group multiple `<details>` into an exclusive accordion where only one element can be open at a time.

```html
<div class="faq">
  <details name="faq-group">
    <summary>Question 1</summary>
    <p>Answer to question 1</p>
  </details>
  <details name="faq-group">
    <summary>Question 2</summary>
    <p>Answer to question 2</p>
  </details>
  <details name="faq-group">
    <summary>Question 3</summary>
    <p>Answer to question 3</p>
  </details>
</div>
```

#### Why

- **Native behavior:** The browser automatically closes other `<details>` with the same `name` when opening a new one. No need to write JavaScript.
- **Accessibility:** Screen readers correctly handle grouping.
- **Simplicity:** One attribute replaces dozens of lines of JS code.

#### How It Works

```javascript
// The browser does this automatically:
// On click on summary of an element with name="group"
// 1. Checks if there are other details with the same name
// 2. If there are — closes them (removes the open attribute)
// 3. Opens the current one (adds the open attribute)
// 4. Generates toggle events for all changed elements
```

#### Important Nuances

1. **`name` is not inherited:** Each `<details>` must have an explicit `name` attribute.
2. **Works only within the document:** Elements with the same `name` in different documents (iframes) don't interact.
3. **`toggle` events:** When another element is automatically closed, it also fires `toggle`.

```javascript
// Correct grouping handling
document.querySelectorAll('details[name="faq-group"]').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      // Send analytics: which question was opened
      const question = details.querySelector('summary').textContent;
      analytics.track('faq_opened', { question });
    }
  });
});
```

---

### 3. Don't Duplicate Component State in JavaScript Unnecessarily

#### Rule

The `<details>` state (open/closed) is stored in the `open` attribute. Do not create a separate variable in JavaScript to duplicate this state.

#### Why

- **Single source of truth:** If state is stored in two places (DOM and JS variable), they can become desynchronized.
- **Performance:** Additional listeners and state updates slow down the application.
- **Complexity:** Duplicating state complicates code and increases bug risk.

#### ✅ Correct

```javascript
// Read state directly from the DOM
const details = document.getElementById('myDetails');

// Check state
if (details.open) {
  // Do something
}

// React to change via event
details.addEventListener('toggle', () => {
  // Use details.open for the current state
  updateUI(details.open);
});
```

#### ❌ Incorrect

```javascript
// Redundant state duplication
let isOpen = false;

details.addEventListener('click', () => {
  isOpen = !isOpen; // Duplicate state
  details.open = isOpen; // Synchronize with DOM
});

// Now state lives in two places
// When changed via keyboard or browser, isOpen won't update!
```

#### Exceptions (when duplication is justified)

1. **Synchronization with external state (Redux, Pinia, URL):**

   ```javascript
   // Zustand store
   const useStore = create((set) => ({
     isOpen: false,
     toggle: () => set((state) => ({ isOpen: !state.isOpen })),
   }));

   // Component
   const { isOpen, toggle } = useStore();
   return (
     <details open={isOpen}>
       <summary
         onClick={(e) => {
           e.preventDefault();
           toggle();
         }}
       >
         Heading
       </summary>
     </details>
   );
   ```

   Here duplication is justified because state needs to be accessible in other parts of the application.

2. **State persistence in `localStorage`:**

   ```javascript
   details.addEventListener('toggle', () => {
     localStorage.setItem('details-open', details.open);
   });

   // On load
   const savedState = localStorage.getItem('details-open') === 'true';
   if (savedState) {
     details.open = true;
   }
   ```

3. **Analytics and tracking:**
   ```javascript
   details.addEventListener('toggle', () => {
     // Send data to analytics
     if (details.open) {
       sendAnalytics('accordion_opened');
     }
   });
   ```

---

### 4. Use the `toggle` Event Instead of Custom Click Handlers

#### Rule

To react to state changes, use the `toggle` event, not clicks on `<summary>` or other elements.

#### Why

- **Source abstraction:** `toggle` fires on any state change method: click, keyboard, programmatic change, page search (Ctrl+F), voice control.
- **Guaranteed state:** The event fires **after** the state change, when `details.open` already reflects the current value.
- **Future compatibility:** If browsers add new control methods, `toggle` will work with them.

#### ✅ Correct

```javascript
details.addEventListener('toggle', () => {
  // React to state change
  // Source of change doesn't matter
  if (details.open) {
    console.log('Open');
  } else {
    console.log('Closed');
  }
});
```

#### ❌ Incorrect

```javascript
// Dangerous practice: reaction to click
const summary = details.querySelector('summary');

summary.addEventListener('click', () => {
  // Assume state has changed
  // But what if the click was canceled? Or the state didn't change?
  if (details.open) {
    // May be desynchronized
  }
});

// Even worse: custom control
summary.addEventListener('click', () => {
  details.open = !details.open; // Override native behavior
  // Breaks keyboard control
});
```

#### Exceptions (when a click handler is needed)

1. **Additional action not related to state change:**

   ```javascript
   summary.addEventListener('click', (e) => {
     // Send analytics about click (regardless of result)
     trackClick('faq_summary');
   });
   ```

2. **Preventing opening under certain conditions:**

   ```javascript
   let isLocked = false;

   summary.addEventListener('click', (e) => {
     if (isLocked) {
       e.preventDefault(); // Block native toggle
       showNotification('This section is temporarily unavailable');
     }
   });
   ```

---

### 5. Design Interfaces with Accessibility in Mind

#### Rule

Accessibility should not be an afterthought. Use `<details>` so that all users can interact with it.

#### Basic Requirements

1. **Always use `<summary>`:** It should be the first child of `<details>`. Don't replace it with other tags.

2. **Explicit naming:** The text inside `<summary>` should be meaningful and describe the content.

3. **Visual state indicator:** Don't rely only on the browser's triangle. Add explicit visual cues.

4. **Focus indication:** Keep `:focus-visible` for keyboard users.

#### ✅ Correct

```html
<details class="accordion">
  <summary class="accordion-summary">
    <span class="accordion-icon" aria-hidden="true">▶</span>
    <span class="accordion-title">Technical specifications</span>
    <span class="accordion-status" aria-live="polite">
      <!-- This text will be announced by screen readers on change -->
      <span class="visually-hidden"> (click to expand) </span>
    </span>
  </summary>
  <div class="accordion-content">
    <!-- Content -->
  </div>
</details>
```

```css
/* Visual indicators */
.accordion-summary {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.accordion-summary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.accordion-summary:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

.accordion-icon {
  display: inline-block;
  transition: transform 0.3s;
}

details[open] .accordion-icon {
  transform: rotate(90deg);
}

/* Hidden text for screen readers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

#### ❌ Incorrect

```html
<!-- No summary -->
<details>
  <div class="fake-summary" role="button" tabindex="0">Heading</div>
</details>

<!-- Empty summary -->
<details>
  <summary>
    <span aria-hidden="true">▼</span>
  </summary>
</details>

<!-- Removing focus indicator -->
<style>
  summary:focus {
    outline: none;
  }
</style>
```

#### Advanced Accessibility Techniques

1. **Testing with real screen readers:** NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android).

2. **Automated testing:** Use axe-core, Lighthouse, WAVE.

3. **Semantic structure:** Group multiple `<details>` in `<section>` with a heading.

```html
<section aria-labelledby="faq-title">
  <h2 id="faq-title">Frequently Asked Questions</h2>
  <details name="faq">...</details>
  <details name="faq">...</details>
  <details name="faq">...</details>
</section>
```

---

### 6. Use Modern CSS Capabilities Instead of JavaScript Animations

#### Rule

Use modern CSS (`interpolate-size`, `calc-size()`, `@starting-style`) for expansion animation instead of JavaScript calculations and libraries.

#### Why

- **Performance:** CSS animations run on the GPU and don't block the main thread.
- **Simplicity:** Less code, fewer bugs.
- **Accessibility:** CSS animations respect system settings (`prefers-reduced-motion`).
- **Future:** CSS specification evolves faster than JavaScript solutions.

#### ✅ Correct

```css
.accordion-panel {
  interpolate-size: allow-keywords;
  height: 0;
  opacity: 0;
  overflow: hidden;
  display: none;
  transition:
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease 0.1s,
    display 0.4s;
  transition-behavior: allow-discrete;
}

.accordion-panel.open {
  height: auto;
  opacity: 1;
  display: block;
}

@starting-style {
  .accordion-panel.open {
    height: 0;
    opacity: 0;
    display: block;
  }
}

/* Respect user settings */
@media (prefers-reduced-motion: reduce) {
  .accordion-panel {
    transition-duration: 0.01ms;
  }
}
```

#### ❌ Incorrect

```javascript
// Outdated approach: height calculation in JavaScript
function toggleAccordion(element) {
  const content = element.querySelector('.content');
  const isOpen = element.open;

  if (isOpen) {
    // Close
    content.style.height = content.scrollHeight + 'px';
    requestAnimationFrame(() => {
      content.style.height = '0';
    });
  } else {
    // Open
    content.style.height = content.scrollHeight + 'px';
    content.addEventListener(
      'transitionend',
      () => {
        content.style.height = 'auto';
      },
      { once: true },
    );
  }
}
```

#### When JavaScript Is Still Needed

1. **Complex animation chains:** When you need to animate multiple elements sequentially.
2. **Integration with libraries:** If you're already using GSAP or Framer Motion for other animations.
3. **Custom Bezier curves:** CSS supports `cubic-bezier()`, but not all complex functions.

---

### 7. Prefer Built-in Platform Components Over Custom Implementations

#### Rule

If functionality is implemented by a native HTML element, use it instead of a custom JavaScript component.

#### Why

- **Less code:** Native element doesn't require writing logic, styles, or ARIA attributes.
- **Fewer bugs:** The platform is tested by millions of users.
- **Better performance:** The browser implements the element at the engine level.
- **Future compatibility:** The element will automatically receive new capabilities.
- **Accessibility:** The browser provides accessibility out of the box.

#### Comparison

| Functionality | Native Solution | Custom Solution             |
| ------------- | --------------- | --------------------------- |
| Accordion     | `<details>`     | React/Vue/Angular component |
| Modal window  | `<dialog>`      | Custom overlay              |
| Dropdown menu | `<select>`      | Custom dropdown             |
| Tooltips      | `<popover>`     | Custom tooltip              |
| Progress bar  | `<progress>`    | Custom indicator            |

#### Exceptions

1. **Design system:** If your design system requires strict control over every pixel and the native element isn't customizable enough.

2. **Complex behavior:** If the native element doesn't support the needed functionality.

3. **Legacy support:** If support for old browsers is required.

#### Practical Decision Algorithm

```javascript
// Selection algorithm: native vs custom
function shouldUseNative(requirement) {
  // 1. Does a native element exist?
  if (!hasNativeElement(requirement)) return false;

  // 2. Does it meet design requirements?
  if (!meetsDesignRequirements(requirement)) return false;

  // 3. Is it supported in target browsers?
  if (!isSupportedInTargetBrowsers(requirement)) return false;

  // 4. Is complex customization needed?
  if (needsComplexCustomization(requirement)) return false;

  // 5. All checks passed → use native
  return true;
}
```

---

### Full Checklist: Quality Assurance for Using `<details>`

Before implementing `<details>` in your project, check yourself against this checklist:

#### Semantics and Structure

- [ ] Used only for disclosing additional information
- [ ] `<summary>` is present as the first child
- [ ] Text inside `<summary>` is meaningful and unique
- [ ] `name` attribute is used for grouping (if needed)

#### Accessibility

- [ ] `:focus-visible` focus indicator is preserved
- [ ] Visual state indicator (open/closed) is present
- [ ] Screen reader announces state (tested on real device)
- [ ] Keyboard navigation works (Space/Enter for toggle, Tab for navigation)

#### CSS

- [ ] Modern CSS capabilities (`interpolate-size`, `calc-size()`) are used
- [ ] User preferences (`prefers-reduced-motion`) are respected
- [ ] Marker customization via `::marker` or `list-style` is done

#### JavaScript

- [ ] The `toggle` event is used to react to changes
- [ ] State is not duplicated unnecessarily
- [ ] Programmatic change via `details.open` is used correctly
- [ ] No redundant click handlers

#### Performance and Future

- [ ] No redundant JavaScript logic for state management
- [ ] Native capabilities are used instead of custom implementations
- [ ] Code will work with JavaScript disabled
- [ ] Support in target browsers is considered

---

### Final Conclusion

`<details>` is not just a tag. It is an **architectural decision** that reflects the maturity of the web platform. By using it correctly, you:

1. **Reduce code:** Replace hundreds of lines of JavaScript with a few lines of HTML.
2. **Improve accessibility:** Get free ARIA roles and keyboard control.
3. **Boost performance:** The browser works faster than any JavaScript.
4. **Ensure a future:** Your code will work with new browser versions without changes.

**The golden rule of this chapter:**

> In web development, often the best solution is one that's already built into the platform. Use `<details>` not as a compromise, but as a conscious choice for simplicity, reliability, and accessibility.

---

## 6.14. Why This Chapter Is Relevant in 2026

In 2026, `<details>` has definitively ceased to be just an element for FAQ.

Today, it is part of the new browser architecture.

It demonstrates several global trends in HTML development:

- the browser manages component state itself;
- HTML is becoming a declarative user interface API;
- modern CSS allows animating native components without JavaScript;
- frameworks are starting to use built-in platform capabilities instead of their own implementations;
- client-side JavaScript volume is decreasing;
- the role of Progressive Enhancement and Baseline is growing.

`<details>` has become one of the most telling examples of how the Web Platform is gradually taking over tasks that, just a few years ago, were completely handled by custom JavaScript.

---

## Chapter Conclusion — The Evolution of `<details>`: From Tag to Component

We began this chapter with a simple question: "What is `<details>`?" And the answer evolved as we delved deeper into the material. Let's trace this path — it reflects not only the evolution of one element but the evolution of the entire web platform.

---

### The Path of Transformation

#### FAQ (1990s — 2000s)

In the early internet, disclosure blocks were implemented via JavaScript hacks: `display: none` and `onclick` on headings. Each implementation was unique, buggy, and inaccessible. Questions and answers (FAQ) became the first pattern where such functionality was needed.

```html
<!-- The era of hacks -->
<div onclick="toggle(this)" style="cursor:pointer">
  <span class="arrow">▶</span> Question
</div>
<div id="answer" style="display:none">Answer</div>
```

#### Disclosure Widget (2008-2010)

With the advent of ARIA (Accessible Rich Internet Applications), came the understanding that disclosure blocks must be accessible. **Disclosure (Show/Hide)** patterns emerged. But implementation still required JavaScript and manual ARIA attribute management.

```html
<!-- The era of ARIA -->
<button aria-expanded="false" aria-controls="panel">Heading</button>
<div id="panel" role="region" hidden>Content</div>
```

#### Accordion (2010-2014)

UI libraries (jQuery UI, Bootstrap) standardized the accordion as a component. Conventions about structure, styles, and behavior emerged. But each library implemented it differently, and bundles grew.

```html
<!-- The era of libraries -->
<div class="accordion">
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button class="accordion-button" data-bs-toggle="collapse">
        Heading
      </button>
    </h3>
    <div class="accordion-collapse collapse">
      <div class="accordion-body">Content</div>
    </div>
  </div>
</div>
```

#### State Machine (2014-2018)

Frameworks (React, Vue, Angular) brought state management. The accordion became a component with a clear lifecycle, props, and events. But each framework reimplemented it from scratch.

```jsx
// The era of frameworks
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  // ... 30 lines of logic
}
```

#### Native UI Component (2018-2024)

Browsers finally got `<details>` and `<summary>` with accessibility support, keyboard navigation, and events. But developers long ignored them, considering them "not flexible enough." CSS hacks with `max-height` appeared, but they were a compromise.

```html
<!-- The era of nativity -->
<details>
  <summary>Heading</summary>
  <p>Content</p>
</details>
```

#### Modern HTML 2026 (Today)

Today, `<details>` is a full-fledged platform component. It has:

- **Built-in state** via the `open` attribute.
- **Events** (`toggle`) for reactivity.
- **Accessibility** out of the box (ARIA, keyboard, screen readers).
- **Grouping** via the `name` attribute.
- **CSS integration** (pseudo-classes, animations, `interpolate-size`, `calc-size()`).
- **Search integration** (Ctrl+F automatically opens the relevant block).
- **Zero-JS mode** — works without JavaScript.
- **Framework integration** — used in React, Vue, Angular, Svelte, Qwik, Astro.

```html
<!-- Modern approach: everything is built in -->
<details name="faq" class="accordion">
  <summary class="accordion-summary">
    <span class="icon">▶</span>
    A question everyone cares about
  </summary>
  <div class="accordion-content">An answer that solves the problem</div>
</details>
```

```css
/* Modern CSS: smooth, accessible, performant */
.accordion-content {
  interpolate-size: allow-keywords;
  height: 0;
  overflow: hidden;
  transition: height 0.4s ease;
}

details[open] .accordion-content {
  height: auto;
}
```

```javascript
// Modern JavaScript: only additional logic
document.querySelectorAll('details[name="faq"]').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      // Send analytics
      trackEvent('faq_opened', details.id);
    }
  });
});
```

---

### The Main Idea of the Chapter

> **`<details>` can no longer be perceived as a "disclosure block." In the modern Web Platform, it is a full-fledged declarative browser component with built-in state, events, accessibility, CSS integration, and architecture that is gradually replacing thousands of lines of custom JavaScript.**

This is not just a technical improvement. It's a paradigm shift:

1. **From imperativeness to declarativeness:** You don't write _how_ to open a block; you describe _what_ should open. The browser handles the implementation.

2. **From frameworks to platform:** Instead of loading heavy libraries for an accordion, you use what's already in the browser.

3. **From accessibility as an option to accessibility as default:** `<details>` makes interfaces accessible without extra effort.

4. **From JavaScript-first to HTML-first:** The modern approach starts with semantic markup, and JavaScript is only added for additional logic.

---

### Final Summary of the Chapter

Throughout this chapter, we:

1. **Analyzed the semantics and structure** of `<details>` and `<summary>`.
2. **Studied events** `toggle`, `change`, `submit`, `invalid`, `formdata`, `reset`.
3. **Delved into accessibility** — what the browser does automatically and what requires developer attention.
4. **Mastered modern CSS animations** with `interpolate-size`, `calc-size()`, and `transition-behavior`.
5. **Understood search integration** (Ctrl+F) and why it's impossible to emulate in JavaScript.
6. **Considered `<details>` as a component** with state, API, events, and lifecycle.
7. **Analyzed framework integration** and understood when the native element beats the custom one.
8. **Formulated practical recommendations** and architectural rules.

---

### Philosophical Conclusion

The web platform is evolving. Every new standard, every new element, every new CSS capability is a step toward making complex things simple.

`<details>` is a micro-universe that reflects all the principles of **Modern HTML 2026**:

- **Semantics** — correct markup solves most problems.
- **Accessibility** — built-in, not bolted on.
- **Performance** — native, not emulated.
- **Declarativeness** — description, not instructions.
- **Resilience** — works without JavaScript.
- **Future** — evolves with the platform.

**Remember:** The best code is the code you don't have to write. `<details>` brings this principle to life. Use it not as a compromise, but as a conscious choice in favor of the platform.

---

### What's Next

This chapter was dedicated to a single element. But its lessons apply to all of HTML:

- Look for native solutions before writing your own.
- Trust the platform.
- Write semantic code.
- Test for accessibility.
- Follow the evolution of web standards.

Because **Modern HTML 2026** is not just a book about tags. It's a manifesto on how to build interfaces that work for everyone, everywhere, always.

---

> _"The most reliable component is the one already built into the browser. The most performant code is the code you don't have to write. The most accessible markup is the markup you don't have to fix."_
>
> — From the archive of Modern HTML 2026 architectural principles
