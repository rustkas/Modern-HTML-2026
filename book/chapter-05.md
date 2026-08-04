# Chapter 5. Popover API — Architecture of Modern Popup Interfaces

> In modern HTML, the Popover API is no longer just a way to open a popup window. It is a declarative mechanism for managing interactive browser layers, tightly integrated with the Top Layer, CSS Anchor Positioning, View Transition API, and HTML's state system. Understanding the Popover API means understanding the new philosophy of the Web Platform, where the browser takes on more and more responsibilities that were previously implemented exclusively in JavaScript.

---

## 5.1. Why the Popover API Emerged Only Now

The emergence of the **Popover API** as a native browser capability marks a crucial shift in web development. What previously required heavy third-party libraries and hundreds of lines of fragile code can now be solved at the platform level. To understand why this happened only now, we need to examine the evolution of interfaces and the architectural constraints of the web.

---

### Why Browsers Didn't Have Built-in Popovers for Decades

Historically, HTML was created as a document language (for scientific articles and text), not as an environment for building complex interactive GUI interfaces.

- The concept of a "popup window" (popover, dropdown, tooltip, menu) simply did not exist in the specification for a long time.
- Browsers provided only primitive elements like `<select>` (dropdown list) and `<dialog>` (for modal windows in early drafts that took years to standardize), but customizing their design or using them for arbitrary floating blocks was impossible.

---

### Why Everyone Used the Library Ecosystem

_(Bootstrap, jQuery UI, Material UI, Popper.js, Floating UI)_

Due to the lack of built-in mechanisms, developers were forced to invent workarounds in JavaScript and CSS. Popular libraries addressed the following needs:

1. **Bootstrap / jQuery UI:** Handled basic component interactivity (modals, tooltips, popovers), combining markup, styles, and JS open/close logic.
2. **Popper.js / Floating UI:** Solved the most painful mathematical and positional problem — **intelligent positioning**. If an element popped up near the edge of the screen, libraries had to calculate its coordinates themselves, flip it upside down, or shift it sideways to prevent it from going outside the viewport.

---

### What Architectural Problems They Solved

Third-party libraries attempted to programmatically bypass fundamental browser engine limitations:

- **The `z-index` Problem (The Stack Context War):** In CSS, the stacking order of elements is rigidly tied to the DOM tree hierarchy. If you have a dropdown menu inside a card with `overflow: hidden` or complex positioning, the popover would inevitably be cut off or obscured by a neighboring block. Libraries tried to solve this by moving elements to the document root (`document.body`) when opened.
- **Light Dismiss (Closing on Outside Click):** It was necessary to attach global event listeners to the entire document (`window` or `document`), track clicks, check whether the click occurred inside or outside the element, and only then close the popover.
- **`Escape` Key and Accessibility (a11y):** Developers had to manually write code that listens for `Escape` presses, returns focus to the trigger button after closing the popover, and correctly sets ARIA attributes (`aria-expanded`, `aria-hidden`) so that screen readers for visually impaired users could understand the interface state. All of this led to bugs and memory leaks when removing elements from the DOM.

---

### Why HTML Couldn't Do This Before

For a long time, the specification lacked key architectural primitives without which creating a native popover was technically impossible:

1. **Lack of a "Top Layer" Concept:** Previously, all elements rendered in a single stacking context flow. The concept of an isolated `top layer` (where `<dialog>` and `[popover]` now live) appeared in browsers relatively recently. It forces an element to automatically render above _all_ other page content, completely ignoring other `z-index`, `transform`, and `overflow: hidden`.
2. **Lack of Declarative Relationships:** There was no way to link a trigger button and a popup window directly in markup without writing JS controllers.

---

### Why Browsers Can Take This On Now

The modern web has arrived at the concept of **"Platform-First"** or **"Platform Enhancement"**. Developers and browser vendors (within consortiums like _Open UI_) realized that basic interface patterns should be standardized.

The browser was able to take this on thanks to the synergy of several new capabilities:

- **Native Top Layer:** The browser itself can move an element to the topmost screen layer without DOM manipulations.
- **Declarative Attributes:** Standardized attributes like `popover` and `popovertarget` emerged, allowing state management without a single line of JavaScript.
- **Automatic Accessibility (a11y) and Focus:** The browser itself manages keyboard focus, closing on outside click behavior (_light dismiss_), `Escape` key handling, and accessibility state synchronization.

As a result, there's no longer a need to include kilobytes of third-party JS code for basic popup logic — the platform handles these tasks out of the box faster, more securely, and with perfect accessibility.

---

## 5.2. Popover — The New Declarative HTML API

### What Has Changed

The introduction of the `popover` attribute and its related properties marks a deep paradigm shift in web development. Previously, HTML was a language of _structure_ and _document_. It exclusively answered the question: **"What is here?"** (heading, paragraph, table, button). All behavior, state, and interactivity logic fell on JavaScript's shoulders.

Now, HTML is making a confident step toward describing **interface behavior (UI state)**.

```html
<button popovertarget="my-menu">Open Menu</button>

<div id="my-menu" popover>Dropdown content</div>
```

This code fragment is not just static markup. It is a **declarative program**.

---

### Evolution of Philosophy: From "What to Draw" to "How to Control It"

In the classic web, a developer described an element passively and wrote all dynamics imperatively:

> **Old Approach:**
> *"Draw me a `div` (tell the browser *what* to do), then write 50 lines of JS: find the button by selector, attach `addEventListener`, check the click, add the `.is-open` class, don't forget about `Esc` handling and outside clicks."*

> **New Approach (Popover API):**
> _"Manage interface state declaratively."_
> You tell the browser: this button is a **trigger** (`popovertarget`), and this block is a **popover** (`popover`). Everything else — the lifecycle, open/close animations, rendering in the system Top Layer, focus management, and handling outside clicks (`light dismiss`) — the browser handles under the hood.

---

### Why This Changes the Game

1. **Separation of Responsibilities at the Platform Level:** The logic of "show/hide an overlay" no longer requires business logic in JavaScript. It's solved at the markup level and through native browser capabilities.
2. **Zero Barrier to Basic Interactivity:** Creating an accessible popup menu that works by all accessibility (a11y) standards is now possible without writing any scripts at all.
3. **Declarative vs. Imperative:** We describe the _desired state and relationships_ between elements (element A controls element B), rather than spelling out step-by-step instructions on how exactly to manipulate the DOM tree.

HTML is no longer just a "skeleton" of a page. It is becoming a full-fledged language for describing user interfaces, where elements are endowed with built-in behavior familiar from desktop and mobile applications.

---

## 5.3. Popover as Part of the Top Layer

One of the most important architectural innovations of the modern Web Platform is the emergence of the **Top Layer** — a special browser rendering layer that exists above the regular document tree.

Thanks to the Top Layer, features like **`<dialog>`**, the **Popover API**, Fullscreen API, and some built-in browser elements have ceased to depend on the traditional stacking context model.

Understanding the Top Layer is one of the key aspects of modern HTML. This is where it becomes noticeable that HTML is evolving not only as a markup language but also as a declarative interface for managing browser mechanisms.

---

### How the Browser Renders a Page

When the browser receives an HTML document, it goes through several processing stages:

```
HTML

↓

DOM

↓

CSSOM

↓

Render Tree

↓

Layout

↓

Paint

↓

Compositing

↓

Top Layer
```

Most page elements participate in the normal render tree construction process.

However, some elements work differently.

If a developer opens

```javascript
dialog.showModal();
```

or

```html
<div popover></div>
```

the browser **does not leave the element in its original place in the render tree**.

Instead, it moves it to a special system layer — the **Top Layer**.

---

### What Is the Top Layer

The Top Layer is a special area that exists outside the normal document element positioning model.

It can be visualized as follows:

```
Browser Window

├── Document
│
├── DOM
│
├── Render Tree
│
├── Compositing Layers
│
└── Top Layer
      │
      ├── <dialog>
      ├── Popover
      ├── Fullscreen Element
      └── other system interfaces
```

It is important to understand:

The Top Layer **is not part of the DOM**.

The element continues to exist in the DOM tree, but the browser renders it in a completely different place in its internal architecture.

This is why the Top Layer cannot be thought of as just another `div` on top of the page.

It is a separate rendering level.

---

### Why `z-index` No Longer Matters

Before the Top Layer existed, virtually every developer encountered situations like this:

```css
.modal {
  z-index: 999999;
}
```

After some time, another component appeared:

```css
.tooltip {
  z-index: 9999999;
}
```

Then another:

```css
.dropdown {
  z-index: 99999999;
}
```

An endless "z-index race" would begin.

The reason was that all elements continued to exist within a single stacking tree.

The Top Layer completely eliminates this problem.

After opening a popover, the browser literally removes it from the normal display tree.

The architecture looks approximately like this:

```
Document

↓

Stacking Context

↓

z-index

↓

Top Layer
```

No value of

```css
z-index: 9999999999;
```

can cover an element that is in the Top Layer.

---

### No More Dependency on `overflow`

Consider a common situation:

```css
.container {
  overflow: hidden;
}
```

Inside is a dropdown list:

```
┌─────────────────────┐
│                     │
│   Button            │
│                     │
│─────────────────────│
│                     │
└─────────────────────┘

Dropdown

↓

gets cut off
```

Before the Popover API, such a problem was solved with complex positioning libraries.

Now the browser acts differently.

After opening, the popover element renders outside the container:

```
Container

↓

Popover

↓

Top Layer
```

Therefore, restrictions like

```
overflow: hidden
overflow: auto
overflow: scroll
```

no longer apply to it.

---

### Independence from Stacking Context

Stacking Context is one of the most complex topics in CSS.

A new stacking context is created, for example, by:

- `position`
- `opacity`
- `transform`
- `filter`
- `isolation`
- `contain`
- `will-change`

Therefore, previously a popup element could unexpectedly end up under a neighboring block.

The Popover API completely eliminates this problem.

The Top Layer is positioned **above any stacking context** that exists on the page.

---

### Independence from `transform`

Consider an example:

```css
.sidebar {
  transform: translateX(0);
}
```

Due to the `transform` property, a new coordinate context is created inside.

Before the Popover API, this would often break menu positioning.

Today, the browser acts differently.

After opening, the Popover element renders in the Top Layer.

It is no longer dependent on:

- `transform`
- `translate`
- `scale`
- `rotate`
- `perspective`

of parent containers.

---

### Independence from Positioning

Previously, a popup interface had to be positioned using

```css
position: absolute;
```

or

```css
position: fixed;
```

which created numerous problems.

For example:

- window resizing;
- page zooming;
- scrolling;
- nested containers;
- mobile browsers.

Now the popover's position is calculated by the browser itself.

This works especially effectively in conjunction with **CSS Anchor Positioning**, which is covered later in this chapter.

---

### Which APIs Use the Top Layer

The Popover API is far from the only mechanism that uses the Top Layer.

Today, this rendering level is also used for:

- `<dialog>` modal windows;
- Popover API;
- Fullscreen API;
- some built-in browser elements;
- future interface capabilities of the Web Platform.

In fact, the Top Layer is becoming a universal display system for interfaces that need to appear above the regular document.

---

### Why the Top Layer Became a New Browser Architecture

Before the Top Layer existed, the responsibility for displaying popup interfaces fell almost entirely on JavaScript.

Each library independently solved problems like:

- coordinate calculation;
- `z-index` management;
- bypassing `overflow`;
- handling nesting;
- closing interfaces;
- restoring focus.

As a result, thousands of projects contained virtually identical code.

Modern browsers have moved this responsibility inside the platform.

Now the developer only declaratively tells the browser:

```html
<div popover></div>
```

or

```javascript
dialog.showModal();
```

The browser engine does everything else.

This aligns with one of the main trends in Web Platform development:

> **complex infrastructure logic is gradually being moved from user JavaScript to native browser mechanisms.**

---

### Why This Matters in 2026

The Top Layer is one of the technologies that has changed modern frontend architecture.

In 2026, a developer should no longer think exclusively in terms of:

- `z-index`;
- absolute positioning;
- block stacking;
- fighting the `stacking context`.

It is much more important to understand **which elements become part of the browser's infrastructure**, rather than just more DOM nodes.

That is why modern HTML APIs — `<dialog>`, Popover API, Fullscreen API, and future platform interface capabilities — are built around the Top Layer.

This reflects the overall direction of HTML's evolution: the browser is ceasing to be a passive interpreter of markup and is becoming an active executor of declaratively described interface behavior.

---

## 5.4. Popover as a State Machine

Most developers perceive the Popover API as three simple methods:

```javascript
popover.showPopover();
popover.hidePopover();
popover.togglePopover();
```

However, inside the browser, Popover is significantly more complex.

Modern browsers treat every popover as an **object with internal state**, a lifecycle, and a set of valid transitions between states.

That is why the Popover API is one of the first HTML technologies to demonstrate the Web Platform's transition to **Declarative State Machines**.

---

### Why This Matters

Before Popover, almost all interface state management happened in JavaScript.

Typical code looked like this:

```javascript
let isOpen = false;

button.addEventListener('click', () => {
  isOpen = !isOpen;

  if (isOpen) {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});
```

The developer independently:

- stores state;
- modifies the DOM;
- synchronizes CSS;
- tracks events;
- handles Escape;
- tracks outside clicks.

The browser is practically not involved in this process.

The Popover API changes the architecture.

Now the state belongs to **the browser itself**.

HTML merely describes the object.

---

### Popover Lifecycle

Inside the browser engine, a popover goes through several sequential states:

```text
          showPopover()

 Closed
    │
    ▼
 Opening
    │
    ▼
  Open
    │
hidePopover()
    │
    ▼
 Closing
    │
    ▼
 Closed
```

Although the specification does not require exposing intermediate states (`Opening` and `Closing`) as separate public APIs, they allow the browser to correctly execute:

- animations;
- Top Layer changes;
- Accessibility Tree updates;
- focus transfer;
- lifecycle events.

In effect, the browser performs a full transactional transition between states.

---

### What Happens When Opening

After calling

```javascript
popover.showPopover();
```

the browser performs significantly more operations than just changing CSS.

Simplified, the process looks like this:

```text
showPopover()

↓

state check

↓

beforetoggle

↓

internal state change

↓

move to Top Layer

↓

update Accessibility Tree

↓

positioning

↓

rendering

↓

toggle
```

Notice:

nowhere is there

```css
display: block;
```

or

```css
visibility: visible;
```

This is an internal browser mechanism.

---

### What Happens When Closing

Closing is also a sequence of operations:

```text
hidePopover()

↓

beforetoggle

↓

closing

↓

remove from Top Layer

↓

update Accessibility Tree

↓

toggle
```

This is why closing can be canceled via the `beforetoggle` event.

---

### Finite State Machine

From a computational theory perspective, Popover is a **Finite State Machine (FSM)**.

There is a limited set of states:

```text
Closed

Open
```

and a limited set of valid transitions between them:

```text
Closed
   │
show
   │
   ▼
Open
   │
hide
   │
   ▼
Closed
```

It is impossible to transition to a state like:

```
Half Open

Almost Closed

Unknown
```

Transitions are always controlled by the browser.

This makes the interface significantly more predictable.

---

### Why This Is Better Than JavaScript

In a traditional application, a developer can accidentally create an inconsistent state.

For example:

```javascript
menu.style.display = 'block';

menu.hidden = true;

menu.classList.add('visible');
```

Now it's unclear:

is the menu open or closed?

CSS says one thing.

HTML says another.

JavaScript says a third.

Popover eliminates such situations.

There is only one source of truth —
the browser itself.

---

### Events as Automaton Transitions

Each transition is accompanied by events:

```text
Closed

↓

beforetoggle

↓

Open

↓

toggle
```

or

```text
Open

↓

beforetoggle

↓

Closed

↓

toggle
```

Thus, the developer works not directly with the DOM anymore, but with the component's lifecycle.

---

### Declarative State Model

Interestingly, HTML is gradually beginning to describe not only document structure but also interface state.

For example,

```html
<details open></details>
```

has states:

```
closed

↓

open
```

`<dialog>` has:

```
closed

↓

modal

↓

closed
```

Popover:

```
closed

↓

open

↓

closed
```

Forms have:

```
valid

invalid
```

The `<video>` element has its own automaton:

```
paused

↓

playing

↓

waiting

↓

ended
```

It turns out that modern HTML is increasingly describing not just data, but **state machines**.

---

### HTML Is Becoming a Declarative State Machine

This is one of the most important trends in Web Platform development.

Previously, HTML described exclusively document structure.

Today, HTML describes:

- structure;
- behavior;
- state;
- component lifecycle.

The developer no longer tells the browser:

> "Do this step by step."

They merely declare:

> "This element is a popover."

After that, the browser independently manages:

- states;
- transitions;
- events;
- accessibility;
- user interaction;
- Top Layer;
- focus;
- positioning.

---

### Why This Is Especially Important in 2026

If we look at the development of the Web Platform over the past few years, a general trend becomes obvious.

All new APIs are built around the idea of declarative states.

These include:

- `<dialog>`;
- Popover API;
- View Transition API;
- Navigation API;
- CSS View Transitions;
- Anchor Positioning;
- Declarative Shadow DOM.

In all cases, the browser takes responsibility for the internal lifecycle of components, and HTML becomes a high-level language for describing interfaces.

That is why the Popover API is not just a way to open a popup window. It is one of the first vivid examples of how HTML is evolving from a markup language into a language for declarative management of user interface states. For a developer in 2026, understanding this architectural idea is no less important than knowing individual tags and attributes.

---

## 5.5. `auto`, `manual`, and `hint`

At first glance, the values of the `popover` attribute (`auto`, `manual`, and `hint`) might seem like just three modes for opening a popup element.

In fact, they define the **component state management architecture**.

The main question here is not:

> **"How does the popover open?"**

but

> **"Who is responsible for its lifecycle?"**

This is what fundamentally distinguishes the `auto`, `manual`, and `hint` values from each other.

---

### Three Management Models

Modern HTML is gradually moving interface management from JavaScript to the browser.

In the case of the Popover API, there are three different responsibility models:

```text
auto

↓

browser manages state
```

```text
manual

↓

developer manages state
```

```text
hint

↓

browser manages tooltips
```

Essentially, choosing a mode is choosing **who owns the component's state management**.

---

#### `auto` Mode

```html
<div popover="auto"></div>
```

This is the default mode.

If the value is not specified,

```html
<div popover></div>
```

the browser automatically uses `auto`.

---

##### Philosophy of the Mode

In `auto` mode, the browser takes control of the popover's lifecycle.

The developer only needs to declare the element.

The platform does the rest.

```text
Open

↓

Top Layer

↓

Light Dismiss

↓

Escape

↓

Click Outside

↓

Focus

↓

Close
```

All these mechanisms are built directly into the browser.

---

##### What the Browser Automatically Does

When using `auto`, the browser independently:

- opens the popover;
- closes it on `Escape`;
- closes it on outside click;
- tracks context loss;
- maintains the popover stack;
- interacts with the Top Layer;
- updates the Accessibility Tree;
- generates lifecycle events.

The developer practically doesn't need to write JavaScript.

---

##### What It's For

The `auto` mode is recommended for almost all standard popup interface elements:

- dropdown menus;
- user menus;
- filter panels;
- context panels;
- action palettes;
- popup cards;
- selection panels.

For example:

```text
User Profile

↓

User Menu
```

or

```text
Filter

↓

Filter Panel
```

---

#### `manual` Mode

```html
<div popover="manual"></div>
```

In this mode, the browser stops making decisions on its own.

It only provides the infrastructure.

All logic moves to the developer.

---

##### Philosophy of the Mode

```text
HTML

↓

Popover

↓

Top Layer

↓

JavaScript fully manages state
```

The browser no longer automatically performs:

- closing on Escape;
- closing on outside click;
- Light Dismiss;
- automatic switching between popovers.

The developer is responsible for deciding:

- when to open the popover;
- when to close it;
- whether it can be closed;
- which popover is currently active.

---

##### When `manual` Is Needed

This mode is useful when the interface works as a full-fledged application.

For example:

- a graphic editor's tool palette;
- an IDE's floating panel;
- an object inspector window;
- a mini-player;
- a developer panel;
- system notifications;
- pinned panels.

In all these cases, automatic closing would be inconvenient.

The user may click on the document dozens of times, but the panel should remain open.

---

##### Example

```text
Image Editor

↓

Layers Panel

↓

User draws

↓

Panel remains open
```

In `auto` mode, this behavior would have to be constantly worked around.

`manual` solves this problem naturally.

---

#### `hint` Mode

```html
<div popover="hint"></div>
```

This is the most unusual mode.

It is not intended for menus or panels.

It is designed exclusively for **short-term informational tooltips**.

---

###### Philosophy of the Mode

In `hint` mode, the browser understands that the popover is not a full-fledged interface window.

It is just a temporary hint for the user.

For example:

```text
Mouse hover

↓

Tooltip appears

↓

Cursor moves away

↓

Tooltip disappears
```

or

```text
Keyboard focus

↓

Tooltip

↓

Focus changes

↓

Tooltip closes
```

The browser begins to perceive such popovers differently.

---

###### What It's For

`hint` is ideal for:

- tooltips;
- educational hints;
- short descriptions;
- UI element explanations;
- contextual help.

---

##### Why a Separate Mode Was Introduced

If tooltips worked via `auto`, there would be many conflicts.

For example:

```text
User menu open

↓

Cursor hovers

↓

Tooltip appears

↓

Menu unexpectedly closes
```

Such behavior would be extremely inconvenient.

That is why `hint` forms a separate category of popup elements with its own interaction rules.

Tooltips should not compete with main popovers.

---

### Architectural Comparison

| Mode     | Who Manages State | Automatic Closing   | Typical Use Cases                 |
| -------- | ----------------- | ------------------- | --------------------------------- |
| `auto`   | Browser           | Yes                 | Menus, panels, dropdowns          |
| `manual` | Developer         | No                  | IDEs, editors, pinned panels      |
| `hint`   | Browser           | Yes (tooltip rules) | Tooltips, help, educational hints |

---

#### How to Choose the Right Mode

A simple rule can be followed.

#### Choose `auto` if...

- the browser should independently manage the lifecycle;
- the popover is part of a regular user interface;
- standard Web Platform behavior is required.

This is the most common option.

---

#### Choose `manual` if...

- the state is determined by application logic;
- the popover should live independently of user actions;
- full programmatic control is required.

This mode is most often used in complex web applications.

---

#### Choose `hint` if...

- only short reference information is displayed;
- the user does not interact with the popover as an independent interface;
- unobtrusiveness is more important than functionality.

---

### Why This Is Especially Important in 2026

The emergence of three Popover API operating modes reflects one of the key trends in Web Platform development.

HTML is ceasing to be a language that only describes the document's appearance. It is becoming a language that distributes responsibility between the browser and the application.

The developer no longer just creates a popup window — they choose the **architectural model for managing its state**. In one case, the browser takes full responsibility (`auto`), in another — the application (`manual`), and in a third, the browser uses a specialized behavior model for tooltips (`hint`).

This approach makes HTML more expressive and brings it closer to modern architectural concepts, where declarative behavior description is becoming as important as document structure description.

---

## 5.6. Light Dismiss

One of the most underestimated features of the **Popover API** is the **Light Dismiss** mechanism. At first glance, it seems like just automatic closing of a popup window when clicking outside its area. However, in reality, Light Dismiss is a built-in interface state management mechanism implemented directly in the browser.

It is precisely because of Light Dismiss that the Popover API ceases to be a simple set of HTML attributes and becomes part of the modern Web Platform architecture.

---

### What Is Light Dismiss

**Light Dismiss** is a mechanism for automatically closing a non-modal interface element when the user performs an action that signifies the end of interaction with it.

Typically, such actions are:

- clicking outside the popover;
- pressing the **Escape** key;
- opening another popover;
- losing the interaction context.

The developer does **not need to write JavaScript** to track such situations.

It's enough to write:

```html
<button popovertarget="menu">Menu</button>

<div id="menu" popover>...</div>
```

After that, the browser independently begins managing the element's lifecycle.

---

### Why This Is Not `onclick document.body`

Before the Popover API, virtually every library implemented the same algorithm:

```javascript
document.addEventListener('click', (event) => {
  if (!popover.contains(event.target)) {
    closePopover();
  }
});
```

Such code only seems simple at first glance.

In practice, it raises a huge number of questions.

For example:

- which popover is currently open?
- what to do if several popovers are open?
- what counts as a click "outside"?
- how do Shadow DOM work?
- how to account for Portals?
- how to account for the Top Layer?
- how to avoid event races?
- when to close nested menus?
- when NOT to close the popover?

In all popular UI libraries, hundreds of lines of code are dedicated exclusively to these tasks.

The Popover API moves this responsibility inside the browser.

---

### Why the Browser Does This Better Than JavaScript

The browser has information unavailable to regular JavaScript.

It knows:

- which elements are in the **Top Layer**;
- which popover is currently active;
- what their hierarchy is;
- who opened this popover;
- which element has focus;
- what popover stack currently exists.

Therefore, the browser doesn't need to calculate anything.

It already knows the current interface state.

That is why Light Dismiss works significantly more reliably than any custom JavaScript.

---

### Closing on Escape

For popovers with mode

```html
popover="auto"
```

pressing the **Escape** key leads to automatic closing.

The developer does not need to write:

```javascript
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        ...
    }
});
```

The browser has already implemented this behavior.

Moreover, if several nested popovers are open, the browser closes **only the top one**.

This resembles a call stack:

```
Palette

    ↓

Settings

    ↓

Color Picker
```

After pressing Escape, only

```
Color Picker
```

will close.

The next press will close

```
Settings
```

And only then

```
Palette
```

Such behavior is practically impossible to implement universally using simple keyboard handlers.

---

### Closing on Outside Click

The most well-known part of Light Dismiss is automatic closing of a popover when clicking outside it.

```
┌──────────────────────────────┐
│                              │
│    ┌──────────────────┐      │
│    │    Popover       │      │
│    └──────────────────┘      │
│                              │
│         ← click here         │
│                              │
└──────────────────────────────┘

↓

Popover closes
```

The key point is that the browser understands exactly where the popover truly ends.

This seems obvious only until there are:

- Shadow DOM;
- nested popovers;
- Anchor Positioning;
- Top Layer;
- various stacking contexts.

JavaScript is usually forced to calculate such situations on its own.

The browser doesn't do that — it already knows the correct answer.

---

### Pointer Events

Light Dismiss is based not on the `click` event, but on a deeper understanding of user interaction.

Modern browsers work with a unified **Pointer Events** system.

It unifies:

- mouse;
- touch screen;
- stylus;
- trackpad;
- other pointing devices.

Therefore, popover closing works identically on:

- Windows;
- macOS;
- Linux;
- Android;
- iOS;
- tablets;
- hybrid input devices.

The developer no longer needs to account for differences between `mousedown`, `mouseup`, `touchstart`, `touchend`, and other events.

---

### Focus Loss

In some scenarios, the end of interaction is considered to be a focus change.

For example:

```
Search

↓

dropdown result list

↓

user moves to another form field
```

For such cases, the browser can automatically close the popover.

It is important to understand that the decision is made **not by JavaScript**, but by the interface state management mechanism inside the browser.

This makes behavior consistent across all modern browsers.

---

### One Open Popover

For mode

```html
popover="auto"
```

an important rule applies.

At any given moment, there is only one active popover at the same level.

For example:

```
Open

↓

File
```

```
File
```

Then open

```
Edit
```

The browser automatically does:

```
close "File"

↓

open "Edit"
```

No JavaScript is required for this.

This is what is called built-in state management.

---

### When Light Dismiss Does Not Work

The mechanism only works for popovers managed by the browser.

If using

```html
popover="manual"
```

no automatic closing occurs.

The following don't work:

- Escape;
- click outside;
- automatic closing when other popovers open.

Full control passes to the developer.

That is why the `manual` mode should only be used when custom logic is truly required.

---

### Why This Matters in 2026

Before the Popover API, virtually every UI library contained its own implementation of Light Dismiss.

Bootstrap.

Material UI.

Ant Design.

PrimeNG.

Headless UI.

Floating UI.

All of them solved the same problem:

> determine when the user has finished interacting with a popup interface.

In 2026, this task is gradually becoming the responsibility of the Web Platform itself.

This reflects the general trend of modern HTML development: the browser is taking on more and more behavior that was previously implemented exclusively in JavaScript.

Light Dismiss is one of the most vivid examples of this evolution. It shows that HTML is becoming not only a language for describing structure but also a declarative language for managing user interface state.

---

## 5.7. `beforetoggle` and `toggle`

One of the most interesting innovations of the modern Web Platform is the **`beforetoggle`** and **`toggle`** events. At first glance, they seem like ordinary element open and close events, but in practice, they represent a significantly more important architectural concept.

If previously HTML provided only static elements and the entire component lifecycle was implemented exclusively through JavaScript frameworks, today the browser is beginning to independently manage the lifecycle of declarative components.

That is why the Popover API can be seen as one of the first steps toward turning HTML into a declarative component platform.

---

### Why Regular Events Were Not Enough

Before the Popover API, developers manually changed element states.

For example:

```javascript
menu.classList.add('open');
menu.classList.remove('open');
```

or

```javascript
menu.hidden = false;
```

or

```javascript
menu.style.display = 'block';
```

After that, they had to manually generate events, start animations, check open conditions, and notify other components.

In other words — the lifecycle existed exclusively inside the application.

HTML knew nothing about it.

---

### Now the Browser Knows the Lifecycle

When using the Popover API,

the browser becomes the owner of the component's state.

It knows:

- whether the popover is open or not;
- who initiated the opening;
- how the opening occurred;
- when closing is needed;
- what events need to be sent.

Therefore, along with state changes, the browser automatically generates lifecycle events.

```
Closed

↓

beforetoggle

↓

Open

↓

toggle
```

or

```
Open

↓

beforetoggle

↓

Closed

↓

toggle
```

It is the browser that determines the sequence of events.

The developer only needs to subscribe to them.

---

### The `beforetoggle` Event

This is the first lifecycle event.

It occurs **before the state change**.

This is where the application can decide:

> allow the state change or prevent it.

```
Closed

↓

beforetoggle

↓

Open
```

or

```
Open

↓

beforetoggle

↓

Closed
```

The main feature —

it is a **Cancelable Event**.

That is, the browser asks the application:

> "I'm about to change the state. Any objections?"

If the application responds:

```javascript
event.preventDefault();
```

then the state transition will not occur.

---

### Why `beforetoggle` Is Cancelable

This allows implementing a huge number of scenarios without rewriting the browser's logic.

For example:

do not close the popover,

if the user hasn't saved changes.

```javascript
popover.addEventListener('beforetoggle', (event) => {
  if (event.newState === 'closed' && hasUnsavedChanges) {
    event.preventDefault();
  }
});
```

The popover will remain open.

The browser will not change the state.

At the same time:

- the Top Layer remains correct;
- Focus remains correct;
- Accessibility continues to work;
- no synchronization is required.

---

You can prevent opening.

For example,

if the user is not authenticated.

```javascript
popover.addEventListener('beforetoggle', (event) => {
  if (event.newState === 'open' && !user.isAuthenticated) {
    event.preventDefault();
  }
});
```

So,

HTML provides a built-in lifecycle extension point.

---

### The `toggle` Event

After a successful state change, the browser generates the

```
toggle
```

event.

It signals

that the change has already occurred.

At this moment, the browser's state is fully synchronized.

That is why it's convenient to perform:

- analytics;
- logging;
- animation startup;
- data loading;
- interface updates.

---

### Old and New State

One of the most useful features is having information about the transition.

The event contains two properties:

```
oldState

↓

newState
```

For example

```
closed

↓

open
```

or

```
open

↓

closed
```

This is significantly more convenient

than storing the component's state manually.

---

Example:

```javascript
popover.addEventListener('toggle', (event) => {
  console.log(event.oldState);
  console.log(event.newState);
});
```

Output:

```
closed

↓

open
```

or

```
open

↓

closed
```

The browser has already performed the transition.

You can react to it.

---

### Complete Lifecycle Example

```javascript
const popover = document.getElementById('menu');

popover.addEventListener('beforetoggle', (event) => {
  console.log('Before toggle');
  console.log(event.newState);
});

popover.addEventListener('toggle', (event) => {
  console.log('After toggle');
  console.log(`${event.oldState} → ${event.newState}`);
});
```

When opening, the sequence will be:

```
showPopover()

↓

beforetoggle

↓

state change

↓

toggle
```

When closing:

```
hidePopover()

↓

beforetoggle

↓

state change

↓

toggle
```

This is a complete component lifecycle.

---

### Why This Is Much More Important Than the Popover API Itself

At first glance,

it seems that the events are needed exclusively for popovers.

In fact, they reflect a much deeper trend in Web Platform development.

HTML is gradually ceasing to be only a markup language.

It is beginning to describe:

- components;
- their states;
- valid transitions;
- lifecycle;
- interaction between states.

In other words,

HTML is beginning to provide a **declarative state model (State Machine)**.

The browser becomes the owner of this model.

---

### Connection to the Finite State Machine

In the previous section, we considered Popover as a finite state machine.

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

Now it becomes clear

where the events appear.

```
Closed

↓

beforetoggle

↓

Opening

↓

Open

↓

toggle
```

and

```
Open

↓

beforetoggle

↓

Closing

↓

Closed

↓

toggle
```

Events become part of the automaton.

They accompany transitions between states.

That is why the lifecycle is built directly into the platform.

---

### Why This Is Especially Important in 2026

In 2026, it becomes obvious that browser APIs are evolving toward **declarative components with their own lifecycle**.

The same approach is used not only in the Popover API but also in:

- `<dialog>`;
- View Transition API;
- Navigation API;
- Declarative Shadow DOM;
- future Web Platform elements.

In all these APIs, the browser takes on state management, transitions, and interface synchronization.

This means a fundamental shift in frontend architecture:

> **If previously HTML described only document structure, modern HTML describes component behavior, and the browser becomes their runtime.**

That is why the `beforetoggle` and `toggle` events are not just new Popover API events. They are the first signs of a full-fledged declarative component lifecycle model appearing in HTML, which will become one of the key ideas of the Web Platform in the second half of the 2020s.

---

## 5.8. Popover and CSS Anchor Positioning

One of the most revolutionary features of the modern Web Platform is **CSS Anchor Positioning** — a technology that for the first time allows positioning interface elements **relative to other elements declaratively**, without calculating coordinates in JavaScript.

If the Popover API freed developers from having to independently manage the lifecycle of popup elements, Anchor Positioning frees them from having to calculate their position.

Together, these technologies form a new architectural level of the modern platform.

---

### Before Anchor Positioning

For almost twenty years, positioning any popup interface looked roughly the same.

It was necessary to:

```
getBoundingClientRect()

↓

get button coordinates

↓

scrollX / scrollY

↓

account for page scroll

↓

resize

↓

recalculate coordinates after window change

↓

MutationObserver

↓

track DOM changes

↓

IntersectionObserver

↓

track element appearance

↓

requestAnimationFrame()

↓

constantly update position
```

Almost every UI library contained thousands of lines of code dedicated exclusively to coordinate calculation.

That is why projects like:

- Floating UI;
- Popper.js;
- Tippy.js;
- Headless UI;
- Radix UI

emerged.

Most of their complexity was not related to displaying menus at all, but to correctly calculating their position.

---

### Why Regular Positioning Is Not Suitable

At first glance, it seems enough to write

```css
position: absolute;
```

and the problem is solved.

In practice, this only works in the simplest cases.

It is necessary to account for:

- page scroll;
- window resizing;
- zoom;
- CSS Transform;
- `overflow`;
- nested containers;
- various stacking contexts;
- mobile keyboard;
- content size changes;
- RTL languages;
- different writing directions.

This turns into a huge interface geometry task.

This is precisely what JavaScript libraries have been doing for years.

---

### What Has Changed

Anchor Positioning completely changes the positioning model.

Now instead of calculating coordinates, the developer describes a **relationship** between two elements.

Not coordinates.

Not pixels.

Not calculations.

But a connection.

For example:

> This Popover should be located near this button.

It is the browser that determines:

- where to place the element;
- how to shift it;
- how to avoid going outside the window;
- when to automatically change the position.

---

### New CSS Capabilities

Anchor Positioning adds several new mechanisms.

#### `anchor-name`

Allows declaring an element as an anchor.

```css
button {
  anchor-name: --menu-button;
}
```

Now the browser knows

that this element can be used as an anchor point.

---

#### `position-anchor`

Allows specifying

which anchor to bind the element to.

```css
.menu {
  position-anchor: --menu-button;
}
```

After this, a declarative connection appears between the two elements.

---

#### The `anchor()` Function

Allows using anchor coordinates directly in CSS.

For example:

```css
.menu {
  left: anchor(left);
  top: anchor(bottom);
}
```

When the button's position changes,

the browser automatically updates the popover's position.

JavaScript is no longer needed.

---

#### `position-area`

In many cases, coordinates don't need to be calculated at all.

You can simply tell the browser

where the element should be located.

For example:

```css
.menu {
  position-area: bottom center;
}
```

Or

```css
.menu {
  position-area: right;
}
```

Or

```css
.menu {
  position-area: top;
}
```

This is much closer to how humans describe interfaces.

---

#### `position-try`

But what if

there isn't enough space near the button?

Previously, complex JavaScript had to be written.

Today, it's enough to tell the browser the possible options.

```css
.menu {
  position-area: bottom;
  position-try: top, right, left;
}
```

The browser will independently try each position.

If there's no space at the bottom,

it will automatically move the popover up.

If there's no space there either —

to the right.

And so on.

This is a built-in intelligent positioning mechanism.

---

### Instead of Coordinates — Intention

The most important change is not even in the new CSS properties.

The way of thinking itself has changed.

Previously, the developer told the browser:

> Place the element at coordinates X = 425 and Y = 318.

Today, they say something completely different:

> I want this Popover to be next to this button.

This is a fundamentally different level of abstraction.

The developer describes **intent**.

The browser independently implements it.

---

### Implicit Anchors

What's particularly interesting is how the Popover API integrates with Anchor Positioning.

If using

```html
<button popovertarget="menu"></button>
```

and

```html
<div id="menu" popover></div>
```

the browser automatically understands

that the button is the anchor for this Popover.

That is, the connection is created without additional markup.

This is what's called an **Implicit Anchor**.

In many cases, writing only HTML is sufficient.

---

### Together with the Popover API

This results in an almost completely declarative interface.

HTML:

```html
<button popovertarget="menu">Menu</button>

<div id="menu" popover>...</div>
```

CSS:

```css
#menu {
  position-area: bottom;
  position-try: bottom, top, right, left;
}
```

JavaScript:

```javascript
// absent
```

The browser independently:

- opens the Popover;
- positions it near the button;
- moves it to the Top Layer;
- closes it via Light Dismiss;
- changes position when space is insufficient;
- updates coordinates when the window resizes;
- recalculates position when the page scrolls.

All of this happens at the browser engine level.

---

### Why Floating UI Won't Disappear

After the introduction of Anchor Positioning, it might seem that libraries like Floating UI are no longer needed.

In practice, this is not the case.

Anchor Positioning excellently solves most standard tasks:

- dropdown menus;
- Popover;
- context menus;
- action panels;
- tooltips;
- simple inspectors.

However, there are scenarios that require more complex control:

- custom positioning algorithms;
- binding to multiple elements at once;
- complex constraints inside containers;
- non-standard animations;
- legacy browser support;
- integration with virtual elements (e.g., text selection or cursor coordinates).

Therefore, Anchor Positioning does not completely replace Floating UI, but takes on the main, most common set of tasks. This allows significantly reducing JavaScript volume and using specialized libraries only where truly complex logic is required.

---

### Why This Is Especially Important in 2026

Anchor Positioning is not just a new CSS property.

It is another step in the evolution of the modern Web Platform philosophy.

Together with:

- `<dialog>`;
- Popover API;
- View Transition API;
- Declarative Shadow DOM;
- Navigation API;

it demonstrates the general trend of browser development.

The platform is gradually moving the most complex interface development tasks from JavaScript to declarative HTML and CSS mechanisms.

The developer no longer describes a sequence of calculations.

They describe **relationships between elements**, and the browser independently chooses the optimal strategy for implementing them.

That is why the combination of **Popover API + CSS Anchor Positioning** is considered one of the most significant architectural innovations of the Web Platform in the mid-2020s. It marks the transition from coordinate programming to declarative interface description — an approach that will likely become the standard for future generations of web applications.

---

## 5.9. Popover and Accessibility

One of the main reasons for the Popover API's emergence was not only simplifying the creation of popup interfaces but also moving a significant portion of accessibility (a11y) logic from the JavaScript library level to the Web Platform itself.

Before the Popover API, every developer independently implemented the behavior of popup menus, tooltips, and panels. This meant manually managing focus, tracking keyboard events, correctly handling closure via the <kbd>Escape</kbd> key, synchronizing ARIA attributes, and ensuring the component was understandable to screen reader programs.

Practice showed that even popular UI libraries regularly contained accessibility errors.

The modern browser takes a significant part of this work on itself.

---

### What the Browser Does Automatically

The Popover API is integrated directly into the browser's display mechanism.

Therefore, the browser knows:

- which element is a popover;
- which element opened it;
- which popover is currently active;
- when the user interacts with the surrounding interface;
- which events should lead to closure.

This allows automatically implementing numerous accessibility mechanisms.

---

### Keyboard Management

For `auto` mode popovers, the browser automatically supports standard keyboard interaction scenarios.

For example:

- closing via <kbd>Escape</kbd>;
- correct handling of opening;
- preventing multiple incompatible popovers from opening simultaneously.

The developer no longer needs to write code like:

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopover();
  }
});
```

The platform already knows which Popover should be closed.

---

### Focus Management

Unlike `<dialog>`, Popover **is not a modal component**.

Therefore, the browser **does not block** the rest of the page and **does not create a Focus Trap**.

This is a fundamental architectural difference.

```
<dialog>

↓

all focus is inside the window
```

```
popover

↓

focus can freely move
between the popover
and the document
```

That is why Popover is suitable for:

- menus;
- dropdowns;
- toolbars;
- tooltips;
- search panels;
- filters.

---

### Top Layer and Accessibility

Since Popover is placed in the **Top Layer**, the browser no longer has to guess which element is on top.

This allows:

- correctly determining the active interface layer;
- correctly handling Escape;
- closing the right popover;
- maintaining a logical order of user interaction.

Previously, JavaScript had to independently maintain a stack of open windows.

Now this is handled by the browser engine.

---

### ARIA

One common misconception is that Popover automatically turns any element into a fully accessible component.

This is not the case.

Popover tells the browser:

> "This element is a popup layer."

But the browser **does not know** what exactly the content represents.

For example, it could be:

- a menu;
- a list;
- a search panel;
- a command palette;
- a user list;
- a calendar;
- a color palette.

That is why the developer is still responsible for using correct semantics.

For example:

```html
<button popovertarget="menu" aria-haspopup="menu" aria-expanded="false">
  Menu
</button>

<ul id="menu" popover role="menu">
  <li role="menuitem">Open</li>
  <li role="menuitem">Save</li>
</ul>
```

Popover does not replace HTML.

It works **together** with HTML semantics.

---

### Screen Readers

Modern screen reader programs rely on multiple sources of information simultaneously:

- DOM;
- Accessibility Tree;
- ARIA roles;
- element state;
- input focus.

Popover automatically becomes part of the Accessibility Tree.

However, the quality of speech output depends on how correctly the content itself is marked up.

For example:

```html
<div popover>Settings Profile Logout</div>
```

tells the user almost nothing.

It's much better to use semantic structure:

```html
<nav popover>
  <ul>
    <li><a href="#">Profile</a></li>
    <li><a href="#">Settings</a></li>
    <li><a href="#">Logout</a></li>
  </ul>
</nav>
```

Here the screen reader can announce:

> Navigation.

> List.

> Three items.

This significantly improves user experience.

---

### What Remains the Developer's Responsibility

Despite a large amount of automation, Popover does not relieve the developer of responsibility for interface architecture.

It is the developer who must:

- choose the correct HTML element;
- use correct ARIA roles where necessary;
- ensure logical tab order;
- label control buttons (`aria-label`, `aria-labelledby`);
- monitor contrast;
- ensure convenient operation without a mouse;
- avoid overloading the interface with simultaneously open popovers.

It can be said that Popover automates **mechanics**, but not the **meaning** of the interface.

---

### Common Mistakes

In practice, the following mistakes are most common.

#### Using `<div>` Instead of Semantic Elements

Bad:

```html
<div popover>
  <div>Settings</div>
  <div>Profile</div>
  <div>Logout</div>
</div>
```

Better:

```html
<nav popover>
  <ul>
    <li><a href="#">Profile</a></li>
    <li><a href="#">Settings</a></li>
    <li><a href="#">Logout</a></li>
  </ul>
</nav>
```

---

#### No Relationship Between Button and Popover

The button must explicitly control the popover.

```html
<button popovertarget="menu" aria-haspopup="menu">Menu</button>
```

Such a connection is understandable to both the browser and assistive technologies.

---

#### Using Popover as a Dialog

Sometimes developers try to replace `<dialog>` with a popover.

This is an architectural mistake.

If it is necessary to:

- confirm deletion;
- block the background;
- retain focus;
- wait for the user's decision,

`<dialog>` should be used.

Popover is intended for non-modal scenarios.

---

#### Using Popover Instead of Tooltip

Although the `hint` mode allows building tooltips, it should be remembered that classic tooltips have their own accessibility requirements.

Sometimes the best solution remains using an element with `role="tooltip"` and correct connection via `aria-describedby`.

---

### Why This Is Especially Important in 2026

Before the Popover API, accessibility of popup interfaces depended almost entirely on the quality of JavaScript libraries.

In 2026, the situation has changed.

The browser itself implements a significant part of the behavior that was previously considered the developer's responsibility:

- Top Layer management;
- Escape handling;
- Light Dismiss mechanism;
- state management;
- interaction between multiple popovers.

This means an important architectural shift.

If previously the developer created a component **from scratch**, now they **configure a built-in browser component**.

That is why knowledge of HTML semantics and accessibility principles is becoming more important than knowledge of numerous JavaScript hacks.

---

### Conclusion

The Popover API does not automatically make an interface accessible, but it significantly reduces the number of errors that occur when implementing popup components.

The browser takes on managing the popover's lifecycle, its display in the Top Layer, handling standard user actions, and interaction with the input system.

The developer's task shifts from implementing low-level mechanics to designing semantically correct user interfaces. This reflects the modern Web Platform philosophy: **use built-in browser capabilities rather than reproducing them in JavaScript**.

---

## 5.10. Popover Animation

One of the most interesting features of the modern Web Platform is full support for animation of built-in browser components. If previously the appearance and disappearance of popup elements required JavaScript or complex CSS hacks, in 2026 the Popover API and modern CSS allow implementing smooth transitions declaratively.

The emergence of the Popover API coincided with the development of a new browser animation model that can work not only with changing CSS property values but also with **changes in the element's state itself**.

That is why Popover became one of the first platform components to demonstrate the capabilities of the new generation of CSS.

---

### Why This Was Impossible Before

Historically, the main problem was the property:

```css
display: none;
```

An element with `display: none` is completely excluded from the rendering process.

This means the browser does not create for it:

- Render Object;
- Layout Box;
- Paint;
- Composite Layer.

In effect, the element ceases to exist for the rendering engine.

Therefore, a transition like:

```css
display: none;

↓

display: block;
```

had no intermediate states.

The browser had nothing to interpolate.

This resulted in instant switching:

```
no element

↓

element exists
```

No animation.

---

### How Modern CSS Solves the Problem

The modern animation model introduces the concept of **Discrete Transitions**.

Some properties cannot change smoothly.

For example:

```
display
```

or

```
overlay
```

They have no intermediate values.

But the browser can now synchronize the moment of changing these properties with the end of a CSS animation.

This is precisely why the

```
allow-discrete
```

mechanism was introduced.

---

#### The `:popover-open` Pseudo-class

After opening, the browser automatically adds a special state to the popover:

```css
:popover-open;
```

This is similar to how JavaScript used to add classes:

```css
.open
```

or

```css
.visible
```

But now no additional classes are required.

For example:

```css
[popover] {
  opacity: 0;
  transform: scale(0.95);
}

[popover]:popover-open {
  opacity: 1;
  transform: scale(1);
}
```

HTML itself tells CSS:

> "Popover is now open."

This makes styles significantly simpler.

---

#### `@starting-style`

The next problem that couldn't be solved in CSS for a long time is related to the first rendering of an element.

Suppose

a Popover opens.

Before opening, the element didn't exist.

After opening, the browser immediately renders it in its final state.

So we get:

```
opacity:1

↓

opacity:1
```

The animation doesn't start.

To solve this problem, a new mechanism appeared:

```css
@starting-style;
```

It allows explicitly specifying

which state the first animation should start from.

For example:

```css
[popover]:popover-open {
  opacity: 1;
  transform: scale(1);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

Now the browser knows:

```
first

opacity:0

↓

then

opacity:1
```

Even if the element has just appeared in the DOM.

---

#### `allow-discrete`

A key innovation of the modern CSS animation model.

Previously, writing

```css
transition: display 0.3s;
```

didn't work.

Now you can write

```css
transition: display 0.3s allow-discrete;
```

or

```css
transition: overlay 0.3s allow-discrete;
```

This means:

> the property change should occur at a strictly defined moment in time, coordinated with the animation.

It is precisely because of this that Popover can first disappear beautifully,

and only then become

```css
display: none;
```

---

#### The `overlay` Property

Another completely new concept.

Popover is not in the normal DOM flow.

After opening, the browser moves it to the

```
Top Layer
```

For this, a special internal state

```
overlay
```

is used.

Modern CSS allows synchronizing the change of this state with animation.

For example:

```css
transition: overlay 0.25s allow-discrete;
```

Now the browser knows

that the element should be removed from the Top Layer

not immediately,

but after the animation completes.

That is why Popover no longer disappears instantly.

---

#### Complete Example

```css
[popover] {
  opacity: 0;
  transform: translateY(-8px);
  transition:
    opacity 0.25s,
    transform 0.25s,
    overlay 0.25s allow-discrete,
    display 0.25s allow-discrete;
}

[popover]:popover-open {
  opacity: 1;
  transform: translateY(0);
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: translateY(-8px);
  }
}
```

This results in fully declarative animation.

Without JavaScript.

Without timers.

Without removing classes.

Without waiting for transition end.

---

### Why This Matters Architecturally

Previously, JavaScript was responsible for managing the component's lifecycle.

Typical code looked like:

```
add class

↓

wait for transitionend

↓

remove display:none

↓

remove DOM

↓

clear handlers
```

The modern browser does this on its own.

This results in a completely new architecture.

```
HTML

↓

Popover

↓

CSS Transition

↓

Top Layer

↓

Render Engine
```

JavaScript is no longer involved.

---

### Why This Is Especially Important in 2026

In recent years, CSS has ceased to be exclusively a styling language.

It is beginning to manage **platform component states**.

Popover became one of the first built-in elements to demonstrate this new philosophy.

Modern CSS can animate not only colors, sizes, and transparency, but also **interface state changes** related to the browser's own operation.

This means moving from animating individual properties to animating component lifecycles.

---

### Conclusion

Support for `:popover-open`, `@starting-style`, `allow-discrete`, and the `overlay` property shows how deeply modern CSS and HTML are integrated.

If previously popup element animation was built around JavaScript and manual class management, in 2026 the browser itself knows **when** the component appears, **when** it disappears, and **when** it can be safely removed from the rendering process.

This is another step toward the declarative Web Platform model, where the developer describes desired behavior and the browser handles the implementation.

---

## 5.11. Popover + View Transition API

One of the most interesting directions in modern Web Platform development is the unification of various browser APIs into a single system. If the first versions of HTML and CSS were independent technologies, in 2026 the boundaries between them are gradually disappearing.

A vivid example of this process is the combined work of **Popover API**, **View Transition API**, **Top Layer**, and modern CSS. These technologies were designed independently, but modern browsers are beginning to use them as parts of a single user interface architecture.

This is one of the newest trends in HTML development, which is why it has a dedicated section in this book.

---

### From Separate APIs to a Unified Platform

Until recently, most interactive components were built according to the following scheme:

```
JavaScript

↓

class change

↓

CSS Animation

↓

DOM
```

Each level existed almost independently.

After the emergence of modern APIs, the architecture becomes completely different.

```
HTML

↓

Popover API

↓

View Transition API

↓

Top Layer

↓

CSS Engine

↓

Rendering Engine
```

The browser begins to independently understand:

- which component appeared;
- which component disappeared;
- which state changed;
- how the transition should be performed.

The developer only describes the desired behavior.

---

### What Is the View Transition API

The View Transition API emerged as a mechanism for smooth transitions between two user interface states.

Initially, the technology was developed for page transitions.

For example:

```
Page A

↓

Page B
```

However, modern browsers allow using the same mechanism within a single page.

So we get:

```
Popover closed

↓

Popover open
```

or

```
Menu hidden

↓

Menu shown
```

The browser perceives this as an interface state change.

---

### Popover Becomes Part of the Transition

Before the View Transition API, opening a menu happened roughly like this:

```
display:none

↓

display:block
```

Even if CSS animations were used,

the browser didn't understand

what was happening.

For it, these were just changes to a few CSS properties.

Now the situation has changed.

```
Popover

↓

new interface state

↓

View Transition

↓

animation
```

The browser knows

that a new user interface layer has appeared.

---

### Top Layer Participates in Transitions

The most interesting change is related to the Top Layer.

Previously, there was a problem.

During animation, the element could:

```
end up under other layers

or

disappear too early
```

Now the browser knows

that the Popover is in the

```
Top Layer
```

Therefore, it can simultaneously manage:

- display;
- stacking order;
- component lifecycle;
- transitions between states.

This results in a unified system.

```
Top Layer

↓

Popover

↓

View Transition

↓

Composite
```

That is why modern transitions look significantly more natural.

---

### Beautiful Menu Transitions

One of the most obvious applications is opening a user menu.

Previously, the following would happen:

```
Click

↓

display:block

↓

opacity
```

Now the browser can perceive this as an interface state change.

```
Click

↓

Popover opens

↓

View Transition

↓

Smooth menu appearance
```

The menu can:

- smoothly expand;
- change transparency;
- move;
- emerge from the button;
- beautifully disappear.

At the same time, JavaScript is practically absent.

---

### Command Palette

An even more impressive example is the Command Palette.

```
Ctrl + K

↓

Popover

↓

View Transition

↓

Search Panel
```

The transition might look like this:

```
Search button

↓

expands

↓

becomes large panel

↓

search field appears

↓

results appear
```

In effect, the browser animates an interface state change, not just changes to individual CSS properties.

---

### Search Panel

Another example —

a modern search bar.

Before the new APIs, it was typically implemented as follows:

```
display:none

↓

class=open

↓

opacity

↓

transform
```

Now it's enough to describe two states:

```
Closed

↓

Open
```

The rest is handled by:

- Popover API;
- View Transition API;
- CSS Transition Engine;
- Top Layer.

This significantly reduces JavaScript volume.

---

### Transitions Between Interface States

Modern architecture is gradually moving away from thinking in terms of individual DOM operations.

Previously, the code looked roughly like this:

```
add class

↓

change opacity

↓

change transform

↓

wait for transitionend

↓

remove class
```

Now the browser begins to think differently:

```
Interface

↓

old state

↓

new state

↓

transition animation
```

This is much closer to declarative programming.

---

### Why This Is Especially Important in 2026

In previous years, the View Transition API was most often considered exclusively as a means for beautiful page transitions.

However, in 2026 it becomes obvious that its scope of application is much broader.

It is beginning to integrate with other platform APIs:

- Popover API;
- Navigation API;
- Top Layer;
- CSS Transitions;
- Anchor Positioning;
- modern browser rendering mechanisms.

This creates a new architectural idea.

Not separate technologies,

but **interacting Web Platform subsystems**.

That is why modern browsers are gradually becoming less like simple HTML rendering tools and more like a full-fledged declarative UI platform.

---

### Architecture of the Future

If we look at the platform's development as a whole, we can notice a pattern:

```
HTML

↓

describes structure
```

```
Popover API

↓

describes state
```

```
View Transition API

↓

describes transition
```

```
CSS

↓

describes appearance
```

```
Rendering Engine

↓

implements everything automatically
```

Each technology is responsible only for its own area of responsibility.

This is considered one of the main trends in Web Platform development after 2025.

---

### Conclusion

The integration of the Popover API with the View Transition API shows the direction of modern web platform development. The browser is ceasing to be a passive executor of HTML and CSS and is becoming an active participant in user interface management.

Instead of manual DOM changes and complex JavaScript coordination, the developer describes structure, state, and desired transitions, while the browser takes on synchronization of the Top Layer, animations, and component lifecycle.

For the developer, this means moving from programming individual effects to designing holistic interface states — an approach that will likely become the foundation of web application development in the coming years.

---

## 5.12. Popover and Modern Frameworks

One of the most interesting consequences of the **Popover API** has been the change in architecture of modern frontend frameworks. If previously almost every UI library contained its own implementation of dropdown menus, context menus, tooltips, and command palettes, in 2026 the situation is gradually changing.

The main question is no longer:

> **"How do I implement a Popover?"**

but:

> **"Should I even implement it myself?"**

This mindset shift is one of the key features of the modern Web Platform.

---

### Why Everyone Wrote Their Own Popovers Before

Before the Popover API, the browser simply didn't provide such a capability.

Each library was forced to independently solve a huge number of tasks:

```
positioning

↓

z-index

↓

stacking context

↓

overflow:hidden

↓

outside click closing

↓

Escape

↓

focus management

↓

ARIA

↓

animations

↓

SSR
```

Therefore, entire ecosystems emerged:

- Floating UI
- Popper.js
- Tippy.js
- Radix UI
- Headless UI
- Reach UI
- Angular CDK Overlay
- Material Overlay

Each solved roughly the same set of problems.

---

### What Changed in 2026

Today, a significant portion of this logic is already implemented inside the browser.

HTML provides:

- Popover API;
- Top Layer;
- Light Dismiss;
- lifecycle events;
- state management;
- integration with Anchor Positioning;
- built-in accessibility.

This creates a completely new architecture.

Previously:

```
HTML

↓

Framework

↓

UI Library

↓

Overlay Library

↓

Browser
```

Now:

```
HTML

↓

Browser

↓

Framework
```

The framework begins to use platform capabilities instead of re-implementing them.

---

### Angular

Angular was one of the first to actively move toward **Platform First**.

Just a few years ago, almost any Popover was built through:

```
Angular CDK Overlay
```

or

```
Angular Material Overlay
```

These components created their own infrastructure:

- OverlayContainer
- OverlayRef
- Portal
- PositionStrategy
- ScrollStrategy
- FocusTrap

Essentially, Angular was forced to build its own system on top of the browser.

---

### What Happens Now

Modern Angular increasingly uses native HTML capabilities where possible.

Instead of its own overlay, you can write:

```html
<button popovertarget="settings">Settings</button>

<div id="settings" popover>...</div>
```

Angular remains responsible only for:

- data;
- reactivity;
- Signals;
- templates;
- DI;
- routing.

The Popover itself becomes part of the platform.

---

### React

React has never contained its own Popover component.

Therefore, a huge number of libraries appeared around it:

- Radix UI
- Headless UI
- Reach UI
- Mantine
- Chakra UI
- MUI
- React Aria

All of them implemented the same task.

After the introduction of the Popover API, many libraries began to gradually transition to using native HTML.

---

### What Remains with React

React continues to manage:

```
state

↓

props

↓

render
```

but the opening mechanism itself can now look like this:

```jsx
<button popovertarget="menu">
  Menu
</button>

<div
  id="menu"
  popover>
  ...
</div>
```

The amount of JavaScript becomes significantly smaller.

---

### Vue

In Vue, the situation is similar.

Previously, almost any Popover used:

- Teleport;
- Floating UI;
- Popper.js.

Now many components are beginning to use the browser's platform capabilities.

Vue focuses on:

- reactivity;
- templates;
- computed properties;
- application state.

---

### Svelte

For Svelte, the transition turned out to be especially natural.

Svelte's philosophy has always been to generate minimal JavaScript.

Therefore, using:

```
popover
```

instead of a large amount of runtime code fully aligns with the project's ideology.

---

### Qwik

For Qwik, the Popover API has even greater significance.

Qwik's main goal is

**not to execute JavaScript until the user has actually started interacting with the page.**

If opening a Popover is done by the browser itself,

then client-side code loading is not required at all.

This pairs perfectly with the concept of **Resumability**.

---

### Astro

Astro follows the philosophy:

> HTML first.

Therefore, the Popover API fits perfectly into the Islands architecture.

You can get a fully working Popover with no hydration at all.

```
HTML

↓

Popover

↓

Browser

↓

0 KB JavaScript
```

That is why Astro is considered one of the main beneficiaries of HTML development.

---

### What Happens to Angular Material

Angular Material itself is not disappearing anywhere.

But its role is gradually changing.

Previously, the library was responsible simultaneously for:

- appearance;
- behavior;
- positioning;
- accessibility;
- state management.

Now part of the responsibility shifts to the browser.

For example:

```
Top Layer

↓

browser
```

```
Light Dismiss

↓

browser
```

```
Escape

↓

browser
```

```
ARIA

↓

browser
```

```
positioning

↓

Anchor Positioning
```

Material begins to focus more on:

- design;
- theme;
- tokens;
- adaptation to Material Design;
- integration with Angular.

---

### What Happens to React UI Libraries

Almost all modern React UI libraries are rethinking their component architecture.

Previously:

```
Popover

↓

2000–5000 lines of JS
```

Now:

```
Popover API

↓

small wrapper

↓

React Component
```

The component itself becomes significantly simpler.

---

### Why Floating UI Won't Disappear

Despite the emergence of the Popover API and Anchor Positioning, **Floating UI** and similar libraries will not disappear.

The reason is simple: the browser solves the most common scenarios, but not all possible tasks.

Floating UI remains relevant when you need:

- legacy browser support;
- complex positioning algorithms with custom strategies;
- binding to elements that are not popovers;
- dynamic following of moving objects;
- virtual elements (e.g., mouse cursor or text selection);
- complex tooltip and editor systems;
- completely custom interaction logic.

Thus, the role of such libraries changes: they become specialized tools rather than a mandatory dependency for every project.

---

### Platform First

More and more modern projects are adopting a new interface design principle:

```
Platform First
```

The development algorithm looks like this:

```
Can it be solved with HTML?

↓

Yes

↓

Use HTML
```

```
No

↓

Add CSS
```

```
CSS insufficient

↓

Add JavaScript
```

```
Only after this

↓

use a library
```

This is the opposite of the approach from a decade ago, when development started with choosing a UI framework.

---

### The Architectural Shift of 2026

The most important change is not the appearance of the new `popover` attribute, but the redistribution of responsibility between the platform and the application.

Previously, the browser provided only primitive building blocks, and all interactivity was created on top of them by libraries. Now the browser itself implements a significant portion of interface behavior, and frameworks focus on business logic, application state, and component composition.

That is why **Modern HTML 2026** considers the Popover API not as another HTML attribute, but as an example of the new Web Platform philosophy, where the browser is gradually becoming a full-fledged user interface platform, rather than just a page display mechanism.

---

## 5.13. Why Floating UI Won't Disappear

After the introduction of the **Popover API**, many developers made a hasty conclusion:

> **"Now Floating UI is no longer needed."**

At first glance, this seems logical. The browser has learned to independently open popup elements, place them in the **Top Layer**, close them on outside click, and even position them next to the control element using **CSS Anchor Positioning**.

However, reality is much more complex.

The Popover API and Floating UI solve **different classes of problems**.

If the Popover API is part of the HTML platform, Floating UI is a universal computational engine for spatial placement of interface elements.

That is why in 2026 these technologies **do not compete**, but **complement each other**.

---

### Two Philosophies

The main difference can be summarized in one phrase.

**Popover answers the question:**

> Do you need to show a popup element?

**Floating UI answers the question:**

> Where exactly should it be placed in any possible situation?

These are fundamentally different levels of abstraction.

---

### Popover Solves Standard Tasks

Most user interfaces consist of fairly typical components:

- user menus;
- dropdown lists;
- settings panels;
- filter panels;
- small tooltips;
- command palettes;
- context panels.

For them, the browser can already do almost everything on its own.

```text
Button

↓

Popover

↓

Top Layer

↓

Anchor Positioning

↓

Light Dismiss
```

Practically without JavaScript.

---

### Floating UI Is a Computational Library

Floating UI was never a library exclusively for Popover.

It is a coordinate calculation system.

Input:

```text
Anchor

+

Floating Element
```

Output:

```text
x

y

placement

collision

overflow

visibility
```

That is, the library is responsible for **interface geometry**, not its semantics.

---

### When Popover Is No Longer Enough

There are a huge number of interfaces that cannot be described by declarative HTML means.

---

#### Complex Tooltips

For example, professional tooltip systems.

```text
IDE

↓

hover

↓

500 ms

↓

show tooltip

↓

follow cursor

↓

disappear
```

Such tooltips require:

- complex appearance logic;
- delays;
- custom rules;
- dynamic resizing;
- intelligent position selection.

Popover is too simple here.

---

#### Drag & Drop

Imagine an interface editor.

During dragging, an element constantly changes coordinates.

```text
mouse

↓

movement

↓

new coordinates

↓

new panel position
```

Here the position needs to be recalculated dozens of times per second.

Popover is not designed for this.

---

#### Cursor Context Menus

A regular Popover binds to an element.

But sometimes the anchor is not an HTML element.

For example:

```text
mouse coordinates

↓

x = 534

y = 210
```

This is how they work:

- Photoshop;
- Figma;
- Blender;
- VS Code;
- game editors.

Floating UI can work with **Virtual Elements** that don't exist in the DOM at all.

---

#### Canvas

Imagine an image editor.

```text
Canvas

↓

object

↓

Popup
```

The object itself exists inside the Canvas.

There is no HTML element.

Popover has nothing to bind to.

Floating UI can calculate position relative to any coordinates.

---

#### SVG

The same situation occurs inside SVG.

For example:

```text
graph vertex

↓

Tooltip
```

or

```text
diagram node

↓

context menu
```

SVG objects require their own coordinate calculation logic.

---

#### Document Editors

Modern editors work differently.

For example:

```text
text selection

↓

formatting panel
```

Or

```text

caret

↓

autocomplete
```

The anchor becomes a text **Range**, not an HTML button.

Popover doesn't know about such scenarios.

---

#### IDEs

Take Visual Studio Code.

A tooltip may be bound to:

- a symbol;
- a line;
- the caret;
- a selection area;
- diagnostics;
- a breakpoint.

All coordinates are constantly changing.

They have to be calculated.

---

#### Figma

Almost the entire Figma interface consists of floating elements.

For example:

```text
object selected

↓

show panel

↓

zoom changed

↓

panel should stay nearby
```

With every zoom change, coordinates need to be recalculated.

Popover doesn't perform such calculations.

---

#### Miro

The same applies to infinite boards.

The panel should follow:

- a card;
- a note;
- a shape;
- an arrow;
- a group of objects.

All of them are constantly moving.

---

#### Diagrams

For example:

- BPMN;
- UML;
- ER;
- Mind Map;
- Flow Chart.

Each node may have its own positioning rules.

Sometimes a popup panel must avoid intersecting with other objects.

Popover can't do this.

---

#### Collision Detection

This is one of Floating UI's strongest features.

The library can automatically choose a position.

For example:

There's a button near the edge of the window.

Instead of

```text
Bottom
```

you can automatically choose

```text
Top
```

or

```text
Left
```

or

```text
Right
```

or calculate a completely new position.

In addition, you can use chains of strategies:

```text
Bottom

↓

Top

↓

Right

↓

Left

↓

Best Fit
```

or custom algorithms.

This is a full-fledged spatial computing system.

---

#### Middleware

Another unique feature of Floating UI is **middleware**.

For example:

```text
offset()

↓

flip()

↓

shift()

↓

size()

↓

arrow()

↓

hide()
```

Each stage can change the element's position.

This is a real computation pipeline.

HTML has no such concept.

---

### Popover vs. Floating UI

| Popover API           | Floating UI              |
| --------------------- | ------------------------ |
| Part of HTML          | JavaScript library       |
| Built into browser    | Loaded separately        |
| Declarative           | Imperative               |
| Baseline Web Platform | Custom code              |
| Top Layer             | Coordinate calculation   |
| Simple interfaces     | Any interface complexity |
| Menus                 | IDEs                     |
| Command palette       | Figma                    |
| User panel            | Miro                     |
| Dropdown              | Canvas                   |
| Tooltip               | SVG                      |
| Anchor Positioning    | Virtual Elements         |
| Light Dismiss         | Collision Detection      |
| Minimal JS            | Middleware               |
| Simplicity            | Maximum flexibility      |

---

### The Future

In 2026, a new architectural model is beginning to take shape.

For **80–90% of interfaces**, the platform's capabilities are sufficient:

```text
HTML

↓

Popover API

↓

Anchor Positioning
```

If professional-level interaction is required — graphic editors, IDEs, diagrams, visual builders, complex tooltip systems, or arbitrary positioning algorithms — specialized libraries like Floating UI come to the rescue.

That is why the question is no longer **"Popover or Floating UI?"**.

The right question is:

> **"Can this task be solved with platform capabilities, or does the project really require a full-fledged positioning computation engine?"**

This is one of the main ideas of **Modern HTML 2026**: the modern Web Platform is gradually taking on the solution of mass interface tasks, while specialized libraries are moving into the area of complex professional scenarios where calculations beyond declarative HTML's reach are needed.

---

## 5.14. Architectural Recommendations (Best Practices)

The Popover API is one of those HTML APIs that is easy to use incorrectly.

Most errors occur not because of syntax ignorance, but because of attempts to transfer architectural solutions from a decade ago into the modern Web Platform. Many developers out of habit continue to write JavaScript that is already implemented by the browser itself.

The modern approach can be summed up in one phrase:

> **Trust the platform. Add JavaScript only where HTML's capabilities truly end.**

This principle underlies most modern Web Platform APIs and is one of the key ideas of the book **Modern HTML 2026**.

---

### Use `auto` by Default

In most cases, **`auto`** mode is the correct choice.

It provides all the necessary functionality out of the box:

- opening;
- closing;
- **Light Dismiss**;
- `Escape` key handling;
- Top Layer integration;
- interaction with other popovers.

```html
<button popovertarget="menu">Menu</button>

<div id="menu" popover="auto">...</div>
```

No additional JavaScript is required.

> **Rule:** if you can't explain why you need `manual`, use `auto`.

---

### Use `manual` Only When Full Control Is Needed

Mode

```html
popover="manual"
```

is not an "enhanced" version of `auto`.

It is a completely different working model.

In this mode, the browser stops automatically managing the component's state.

The developer takes responsibility.

For example:

- tool panels;
- docking windows;
- professional editors;
- persistent panels;
- complex control systems.

If Light Dismiss is required — then `manual` is most likely chosen incorrectly.

---

### Use Anchor Positioning Instead of JavaScript

Before Anchor Positioning, almost any Popover was accompanied by a lot of code.

For example:

```javascript
const rect = button.getBoundingClientRect();
popover.style.left = `${rect.left}px`;
popover.style.top = `${rect.bottom}px`;
```

Event handlers were added:

- `scroll`;
- `resize`;
- `MutationObserver`;
- `IntersectionObserver`.

As a result, dozens of lines of code were dedicated exclusively to coordinate calculation.

Modern HTML allows completely abandoning this practice.

```css
button {
  anchor-name: --menu-button;
}

[popover] {
  position-anchor: --menu-button;
  position-area: bottom center;
}
```

Now the browser independently:

- calculates the position;
- accounts for scrolling;
- responds to window resizing;
- updates coordinates.

> **Best Practice:** if the task can be solved with Anchor Positioning, do not use JavaScript for coordinate calculation.

---

### Don't Use the Popover API for Modal Windows

One of the most common mistakes is using the Popover API as a replacement for `<dialog>`.

For example:

```html
<div popover>Confirm account deletion</div>
```

This is architecturally incorrect.

Popover is intended for **non-modal interfaces**.

For scenarios requiring the user's full attention, you should use:

```html
<dialog></dialog>
```

Because only `<dialog>` provides:

- background content blocking;
- setting the page to `inert` state;
- correct focus management;
- modal window semantics;
- accessibility compliance.

A simple rule:

| Use        | When                                          |
| ---------- | --------------------------------------------- |
| `<dialog>` | action confirmation, forms, wizards, settings |
| `popover`  | menus, panels, filters, tooltips, search      |

---

### Don't Duplicate Built-in Browser Logic

It's very common to see code like:

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});
```

or

```javascript
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target)) {
    closeMenu();
  }
});
```

For `popover="auto"`, such code is usually unnecessary.

The browser already implements:

- `Escape` handling;
- outside click closing;
- correct Top Layer behavior;
- interaction between multiple Popovers;
- state synchronization.

Duplicating this logic leads to:

- double closing;
- state conflicts;
- hard-to-find bugs;
- poor compatibility with future platform versions.

> **Best Practice:** don't override browser behavior without a good reason.

---

### Use Modern CSS Animation

Before the Popover API, opening a menu usually looked like this:

```javascript
element.classList.add('open');
```

after which JavaScript synchronized:

- `display`;
- `opacity`;
- `transform`;
- timers;
- animation end events.

Today, most of this logic can be moved to CSS.

For example:

```css
[popover] {
  transition:
    opacity 0.25s,
    transform 0.25s,
    overlay 0.25s allow-discrete,
    display 0.25s allow-discrete;
}

[popover]:popover-open {
  opacity: 1;
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
  }
}
```

The browser independently coordinates the element's state change and animation execution.

This makes the code simpler and more reliable.

---

### Design Interfaces with Progressive Enhancement in Mind

The Popover API is a modern Web Platform feature.

However, the application architecture should not depend entirely on it.

Follow the Progressive Enhancement principle:

```text
HTML

↓

works

↓

CSS improves

↓

JavaScript extends
```

If the browser supports the Popover API — the user gets a modern interface.

If not — basic functionality should remain accessible.

For example, a navigation menu should remain usable even without beautiful animation or automatic positioning.

---

### Minimize JavaScript Volume

One of the main goals of modern HTML is moving logic from the application level to the platform level.

Instead of:

```text
JavaScript

↓

controls everything
```

modern architecture looks like:

```text
HTML

↓

Browser

↓

JavaScript
```

JavaScript is included only where business logic is truly required.

For example:

- data loading;
- server communication;
- complex calculations;
- application state management.

But not for opening a regular user menu.

---

### Use the Semantically Correct Element

Popover is only responsible for behavior.

It does not define the meaning of the element.

Therefore, choose a container that matches the content:

```html
<nav popover></nav>
```

for a navigation menu,

```html
<section popover></section>
```

for a settings panel,

```html
<aside popover></aside>
```

for additional information,

```html
<form popover></form>
```

for a compact search or filter form.

This approach improves accessibility, code readability, and application maintainability.

---

### Track Platform Support, Not Just Libraries

One of the features of the Web Platform after the introduction of **Baseline** is the rapid spread of new capabilities.

Before including another UI library, it's useful to ask yourself:

> **Can't the browser already solve this task on its own?**

In many cases in 2026, the answer will be yes.

This allows:

- reducing JavaScript bundle size;
- reducing the number of dependencies;
- improving performance;
- lowering project maintenance complexity.

---

### Key Recommendations

As a brief summary, the following rules can be formulated:

| Recommendation                                             | Reason                                                                                                          |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Use `auto` by default                                      | This is the most natural and safest Popover API mode                                                            |
| Choose `manual` only when full control is needed           | Don't disable built-in functionality without a reason                                                           |
| Use Anchor Positioning                                     | Eliminates coordinate calculation and `scroll`/`resize` handlers                                                |
| Don't replace `<dialog>` with `popover`                    | These APIs are for different scenarios                                                                          |
| Don't duplicate Light Dismiss                              | The browser already implements `Escape` and outside click handling                                              |
| Use modern CSS animations                                  | `:popover-open`, `@starting-style`, and `allow-discrete` make JavaScript for animations practically unnecessary |
| Follow Progressive Enhancement                             | The interface should work even without modern capabilities                                                      |
| Minimize JavaScript                                        | Use the platform where it already provides a ready solution                                                     |
| Choose semantically correct elements                       | Popover defines behavior, not the meaning of content                                                            |
| Check Web Platform capabilities before including libraries | The modern browser often already does what used to require third-party code                                     |

---

### Why This Chapter Is Relevant in 2026

Just a few years ago, recommendations for creating popup interfaces inevitably came down to choosing a suitable JavaScript library. In 2026, the architectural starting point has changed: first, the platform's capabilities are evaluated, and only then is the decision made about the need for additional code.

That is why the modern approach can be expressed by a new rule:

> **Platform First → HTML First → CSS → JavaScript → Library.**

This sequence reflects the main change in development philosophy: the browser ceases to be a passive executor of JavaScript and becomes a full-fledged platform providing ready-made mechanisms for building user interfaces. The Popover API is one of the most vivid examples of this transformation.

---

## Chapter Conclusion

The Popover API has become one of the most significant innovations in modern HTML. Its emergence means not just adding another attribute to the specification, but changing the very architecture of the Web Platform.

For almost twenty years, popup interfaces were considered exclusively a JavaScript task. Every UI library implemented its own mechanisms for opening and closing elements, coordinate calculation, layer management, <kbd>Escape</kbd> handling, outside clicks, accessibility, and animations. This logic was duplicated thousands of times across millions of lines of code.

The modern platform offers a different approach.

Today, the browser takes on a significant portion of this work:

- manages the **Top Layer**;
- implements **Light Dismiss**;
- provides a declarative state model;
- supports component lifecycle via `beforetoggle` and `toggle` events;
- integrates with **CSS Anchor Positioning**;
- provides basic accessibility support;
- offers modern animation mechanisms.

As a result, JavaScript's role is gradually changing. Instead of implementing basic interface infrastructure, it is increasingly responsible only for application business logic, data handling, and server communication.

However, the Popover API is not a universal solution for all tasks. Professional graphic editors, IDEs, interface design systems, diagrams, Canvas and SVG applications, complex positioning algorithms, and custom placement strategies still require specialized libraries like Floating UI. There is no contradiction here: the platform takes on mass scenarios, and specialized tools remain for complex cases.

Another important takeaway from this chapter is that the Popover API should not be viewed in isolation, but as part of a broader Web Platform evolution. It is closely related to other modern technologies:

- **Top Layer** — a common overlay system above the document;
- **Anchor Positioning** — declarative element positioning;
- **View Transition API** — smooth transitions between interface states;
- modern CSS — `:popover-open`, `@starting-style`, `overlay`, `allow-discrete`;
- the **Baseline** concept, ensuring reliable platform feature support across major browsers.

All these technologies emerged at roughly the same time and complement each other, forming a new generation of declarative interfaces.

### Main Takeaway

The most important idea is not that a new `popover` attribute appeared.

What's much more important is this: **HTML is gradually transforming from a document description language into a declarative browser API**. The developer increasingly describes **what** should happen, and the browser independently determines **how** to implement it most efficiently, securely, and accessibly.

This transition from imperative programming to declarative interaction with the platform is one of the central themes of the book **Modern HTML 2026**.

It can be said that `<dialog>` and the Popover API opened a new era in HTML's evolution. They showed that modern browsers are capable of providing high-level user components as part of the platform itself, rather than as third-party library functionality. It's likely that in the coming years, this approach will only develop further, and more and more capabilities that are currently implemented in JavaScript will become built-in Web Platform features.

In the next chapter, we will look at another example of this trend — the `<details>` and `<summary>` elements, which allow creating disclosure widgets, accordions, and FAQ sections declaratively, without writing custom JavaScript, continuing the **HTML First** and **Platform First** philosophy.
