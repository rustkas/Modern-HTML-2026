# Part III. Next-Generation Forms

# Chapter 7. Modern Web Forms: Declarative Interaction Architecture

Over the past few years, forms have become one of the most rapidly evolving parts of HTML.

If previously a form was perceived as a simple way to send data to a server, today it represents a full-fledged browser subsystem that includes:

- built-in validation;
- state management;
- modern mobile keyboards;
- system pickers;
- declarative data serialization;
- Accessibility;
- CSS integration;
- Progressive Enhancement support.

The modern Web Platform is gradually moving more and more form handling logic from JavaScript directly into the browser.

---

## 7.1. Why Forms Have Become Modern Again

Forms are one of the oldest mechanisms of the World Wide Web. They transformed the Web from a document viewing system into a platform for user interaction. Registration, search, order checkout, file uploads, payments, application management — virtually any web application begins with a form.

However, the history of HTML forms is not only the history of browser development but also the history of constant tension between platform capabilities and developer needs.

By 2026, this tension has practically resolved. After two decades of JavaScript dominance, modern browsers are once again becoming the primary handler of user input.

---

## From HTML Forms to the JavaScript Era

In the early days of the Web, HTML forms were practically the only way to send data.

```html
<form action="/login" method="post">
  <input name="login" />
  <input type="password" name="password" />
  <button>Log in</button>
</form>
```

The browser independently performed the entire chain of actions:

- collected form data;
- serialized it;
- sent an HTTP request;
- displayed the server's response.

The developer practically didn't need to write client-side code.

However, as interactive web applications evolved, the limitations of classic HTML forms became increasingly noticeable.

For example:

- instant field validation;
- asynchronous submission without page reload;
- complex dynamic forms;
- dependent fields;
- step-by-step wizards;
- intermediate state persistence.

The HTML of that time provided practically no built-in mechanisms for such scenarios.

---

## The Era of JavaScript Forms

In the mid-2000s, the situation changed dramatically.

AJAX allowed submitting forms without reloading the page.

A new architecture emerged:

```
HTML

↓

JavaScript

↓

XHR / Fetch

↓

Server
```

Almost all logic moved to JavaScript.

Developers began to independently implement:

- data serialization;
- field validation;
- error display;
- button disabling;
- loading indicators;
- form state management;
- success handling.

The browser gradually became merely a means of displaying the interface.

---

## The Era of React Forms

With the advent of React, Angular, Vue, and other SPA frameworks, form management became even more complex.

A huge number of libraries emerged:

- React Hook Form;
- Formik;
- Angular Reactive Forms;
- Final Form;
- Redux Form;
- VeeValidate;
- Yup;
- Zod.

The architecture looked roughly like this:

```
DOM

↓

Virtual DOM

↓

Component State

↓

Form State

↓

Validation State

↓

Network State
```

Even a simple text field was often accompanied by a large amount of additional state:

```text
value

dirty

touched

visited

focused

valid

invalid

pending

disabled

submitted

loading
```

In many projects, form management logic surpassed the HTML code itself in volume.

---

## 7.1. Why Developers Abandoned Native Forms

The reasons were quite objective.

For many years, HTML indeed couldn't do much of what modern applications required.

For example:

- declarative validation;
- custom error messages;
- convenient date handling;
- intelligent autocomplete;
- correct mobile keyboard behavior;
- modern CSS states;
- programmatic opening of system pickers;
- convenient integration with component architecture.

Therefore, JavaScript was not a luxury but a necessity.

---

### What Changed by 2026

The modern Web Platform is evolving completely differently.

If previously the browser provided only basic HTML elements, now it implements a significant portion of interface logic itself.

Modern browsers contain dozens of built-in form handling mechanisms:

- Constraint Validation API;
- ValidityState;
- `reportValidity()`;
- `setCustomValidity()`;
- `showPicker()`;
- intelligent `autocomplete`;
- specialized virtual keyboards;
- new CSS pseudo-classes (`:user-valid`, `:user-invalid`);
- improved accessibility;
- automatic integration with password managers;
- built-in serialization and data submission tools.

In other words, the browser is once again becoming an active participant in processing user input, not just an HTML rendering mechanism.

---

### The New Architecture of Modern HTML Forms

The evolution can be represented as follows:

```text
HTML Forms (1995)

↓

JavaScript Forms (2005)

↓

React Forms (2015)

↓

Modern HTML Forms (2026)
```

The main change is not the appearance of new tags but the redistribution of responsibility between the browser and the application.

| Approach          | Who Manages the Form         |
| ----------------- | ---------------------------- |
| Classic HTML      | Browser                      |
| JavaScript Forms  | Developer                    |
| React Forms       | JavaScript Framework         |
| Modern HTML Forms | Browser + Minimal JavaScript |

This is an important architectural trend of recent years: everything the platform can do should be done by the platform.

---

### Modern HTML 2026: The Browser as a User Input Engine

One of the main ideas of the modern Web Platform is abandoning the duplication of built-in browser mechanisms.

If previously developers wrote their own systems for:

- validation;
- state management;
- opening pickers;
- error handling;
- data serialization;

today, most of these capabilities are already built directly into HTML.

JavaScript is increasingly used not to implement basic form behavior but only for the business logic of a specific application.

This is what distinguishes **Modern HTML 2026** from the approaches of the previous decade.

HTML is no longer passive markup. Forms are becoming a high-level declarative browser API that takes on a significant portion of the work involved in user interaction. The better a developer understands the platform's built-in capabilities, the less custom code they need to write, the faster applications run, and the easier they become to maintain.

---

## 7.2. The Form as a Declarative Data Model

One of the most important ideas of modern HTML is that a form is not just a visual group of input fields. For the browser, a form represents a **structured data model** described declaratively.

When a developer creates a form, they are not writing a data collection algorithm. They are merely describing the structure of the information, and the browser independently transforms it into an object suitable for transmission, serialization, and processing.

This idea fully aligns with the overall philosophy of **Modern HTML 2026**: HTML describes **what the data represents**, and the browser decides **how to work with it**.

---

### From a Set of Elements to a Data Object

At first glance, a form is just a regular set of elements.

```html
<form>
  <input name="firstName" />
  <input name="lastName" />
  <input name="email" />
</form>
```

However, the browser perceives it completely differently.

```text
Form

↓

Form Controls

↓

Name / Value pairs

↓

FormData

↓

HTTP Request
```

Each control automatically becomes part of the form's data model.

The browser tracks:

- the field name (`name`);
- the value (`value`);
- the data type;
- the element's state;
- participation in serialization;
- validation rules;
- submittability.

The developer does not need to traverse the DOM and collect all field values manually — the platform does this automatically.

---

### The `name` Attribute as the Data Model Key

The most important attribute of any form element is `name`.

It determines whether the value will be included in the final data model.

```html
<form>
  <input name="firstName" value="Ivan" />
  <input name="lastName" value="Petrov" />
</form>
```

After serialization, the browser obtains a logical structure:

```text
firstName = "Ivan"

lastName = "Petrov"
```

If the `name` attribute is missing:

```html
<input value="Ivan" />
```

the element continues to work visually but becomes invisible to the serialization mechanism.

For the browser, such a field effectively does not exist as part of the form's data.

This is one of the most common mistakes made by beginner developers.

---

### FormData — The Universal Form Representation

Modern HTML provides the **FormData** object, which represents a form as a set of key-value pairs.

You can obtain it with one line:

```javascript
const form = document.querySelector('form');
const data = new FormData(form);
```

The browser then stores all form data in its own internal structure.

For example,

```html
<form id="profile">
  <input name="name" value="Alex" />
  <input name="email" value="alex@example.com" />
</form>
```

after creating the object:

```javascript
const data = new FormData(profile);
```

logically becomes

```text
name  → Alex

email → alex@example.com
```

It is important to understand that **FormData is not a JavaScript object** but a specialized Web API interface designed for transferring data between HTML, JavaScript, and the browser's network stack.

---

### Automatic Data Serialization

After submitting a form, the browser independently performs several sequential steps.

```text
HTML Form

↓

Constraint Validation Check

↓

Element Collection

↓

Serialization

↓

HTTP Body Formation

↓

Request Submission
```

The developer does not have to:

- find elements via `querySelector()`;
- read their values;
- manually build an object;
- encode parameters;
- account for the submission type (`GET`, `POST`, `multipart/form-data`).

All these operations are part of the platform.

This is precisely why HTML can be viewed as a **declarative data transfer API**.

---

### Which Elements Are Included in FormData

Not every form element automatically participates in serialization.

The browser uses strict specification rules.

The data model includes:

- `<input>`;
- `<textarea>`;
- `<select>`;
- selected `<option>`;
- checked `checkbox`;
- selected `radio`;
- files (`<input type="file">`);
- the submit button that initiated the form submission.

Excluded:

- disabled elements (`disabled`);
- fields without a `name` attribute;
- unchecked `checkbox`;
- unselected `radio`;
- elements not belonging to the form.

Thus, the browser automatically forms the final data model even before sending the request.

---

### FormData as a Bridge Between HTML and JavaScript

The modern Web Platform architecture allows using the same data model regardless of the submission method.

A traditional HTML form:

```html
<form action="/users" method="post"></form>
```

and modern JavaScript:

```javascript
const formData = new FormData(form);
await fetch('/users', {
  method: 'POST',
  body: formData,
});
```

use the same serialization mechanism.

JavaScript no longer has to independently build the request object.

It simply uses the already prepared data model formed by the browser.

---

### HTML as a Declarative Information Transfer API

This is where one of the key ideas of the book **Modern HTML 2026** emerges.

HTML describes not the form's appearance but the **structure of the information** that needs to be collected from the user.

The developer is essentially designing a data schema:

```text
User

├── firstName

├── lastName

├── email

├── phone

└── avatar
```

and the browser automatically transforms this schema into:

- a user interface;
- a data model;
- a serialization mechanism;
- an HTTP request;
- a `FormData` object.

This is fundamentally different from traditional programming, where the developer manually describes each stage of data processing.

---

### Modern HTML 2026: Declarative Data Instead of Imperative Code

The modern web platform is gradually moving more and more responsibility from JavaScript to the browser.

If previously developers manually wrote code for:

- traversing the DOM;
- reading field values;
- building objects;
- serialization;
- preparing network requests;

today, a significant portion of this work is already implemented inside the platform.

That is why a form should be viewed not as a set of interface elements but as a **declarative data model** built into the browser. This is one of the most important architectural shifts of the modern Web Platform and one of the central ideas of **Modern HTML 2026**: HTML is becoming a high-level API for describing and transferring data, not just a page markup language.

---

## 7.3. Constraint Validation as a Built-in Browser Engine

One of the most underestimated components of the modern Web Platform is the **Constraint Validation API** — a built-in data validation mechanism that is part of the HTML Living Standard. Many developers perceive attributes like `required`, `pattern`, `min`, or `max` as separate markup language features. In reality, they represent only a declarative interface to a full-fledged validation engine built directly into the browser.

This is an important shift in modern HTML philosophy.

Previously, data validation was almost entirely implemented in JavaScript. Each application contained its own system of rules, error messages, and event handling.

Modern HTML offers a different approach.

The developer **describes constraints**, and the browser independently:

- determines the validation moment;
- calculates the cause of the error;
- displays understandable messages to the user;
- reports element states via CSS;
- provides a programmatic API for process management.

In effect, HTML becomes a declarative language for describing domain constraints.

---

### Constraint Validation — Not a Set of Attributes but a Browser Subsystem

During HTML parsing, the browser builds an internal form model.

```
HTML

↓

DOM

↓

Form Controls

↓

Constraint Validation Engine

↓

ValidityState
```

Each control receives its own state object.

When the user changes a value or attempts to submit the form, the browser runs the validation algorithm described in the HTML Living Standard specification.

The developer does not need to independently perform dozens of checks.

It is enough to describe the constraints declaratively.

```html
<form>
  <label>
    Email
    <input type="email" required minlength="6" maxlength="100" />
  </label>

  <label>
    Age
    <input type="number" min="18" max="120" />
  </label>

  <button>Submit</button>
</form>
```

Each attribute becomes part of a unified validation model.

---

### What Happens Inside the Browser

During validation, the browser sequentially executes an algorithm.

```
User changed the value

↓

Element type is determined

↓

Constraints are checked

↓

ValidityState is formed

↓

Element receives state

↓

Form may be submitted
```

The following are taken into account:

- required status;
- value type;
- ranges;
- string length;
- regular expressions;
- custom constraints;
- whether the element participates in validation.

This is a single algorithm for all browsers.

That is why modern forms behave identically regardless of the JavaScript framework used.

---

### The ValidityState Object

After validation, each element receives a `ValidityState` object.

```
<input>

↓

.validity

↓

ValidityState
```

It contains information about the cause of the error.

```
ValidityState

├── valueMissing
├── typeMismatch
├── patternMismatch
├── tooShort
├── tooLong
├── rangeOverflow
├── rangeUnderflow
├── stepMismatch
├── badInput
├── customError
└── valid
```

For example:

```javascript
const email = document.querySelector('#email');

if (!email.validity.valid) {
  console.log(email.validity);
}
```

Instead of analyzing the string themselves, the developer receives a ready-made state model.

---

### Validation Is Not a Boolean

Many libraries return a simple result:

```
true

or

false
```

Constraint Validation works much more richly.

```
Input

↓

ValidityState

↓

Error Cause

↓

Message

↓

CSS State

↓

Submittability
```

The browser knows **not only** that the field is invalid.

It knows **exactly why** it is invalid.

For example:

```
email

↓

typeMismatch
```

or

```
age

↓

rangeUnderflow
```

or

```
password

↓

tooShort
```

This allows creating intelligent interfaces without a custom validation engine.

---

### Constraint Validation API Methods

The platform provides a small but very powerful API.

#### `checkValidity()`

Checks the constraints.

```javascript
if (form.checkValidity()) {
  console.log('Form is valid');
}
```

If there are errors, the browser generates an `invalid` event.

---

#### `reportValidity()`

Performs the validation and displays the browser's built-in messages to the user.

```javascript
form.reportValidity();
```

This is the method modern applications use when they want to preserve native UX.

---

#### `setCustomValidity()`

Allows adding a custom rule.

```javascript
password.setCustomValidity('Password is too weak.');
```

After fixing the error, the message must be cleared.

```javascript
password.setCustomValidity('');
```

Thus, custom logic integrates into the browser's overall mechanism rather than replacing it.

---

### CSS Gains Access to Validation State

One of the strongest aspects of the modern platform is the integration of the Validation Engine with CSS.

After validation, the browser automatically changes the state of elements.

```css
input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}
```

Modern browsers have also introduced more convenient pseudo-classes.

```
:user-valid

:user-invalid
```

They activate **only after the user has interacted with the element**, preventing the common problem where an empty form immediately appears red.

```
User opened the page

↓

No errors yet

↓

Started typing

↓

Validation occurred

↓

:user-invalid state appeared
```

This is the UX considered recommended today.

---

### Why Modern Applications Are Using Built-in Validation Again

Just a few years ago, virtually every React, Angular, or Vue project included its own validation library:

- Yup;
- Joi;
- Formik;
- React Hook Form;
- Angular Validators;
- Vuelidate;
- dozens of other solutions.

The reason was simple: native validation was long considered insufficiently flexible.

However, the modern Web Platform has changed significantly.

Today, browsers provide:

- a full-fledged Constraint Validation Engine;
- consistent behavior across all major browsers (Baseline);
- built-in error messages;
- a programmatic API;
- CSS integration;
- Accessibility support;
- correct screen reader operation;
- optimized performance.

As a result, the architecture is gradually changing.

Instead of completely replacing the built-in system, modern applications increasingly **extend** it.

```
HTML Validation

↓

Constraint Validation API

↓

Small custom checks

↓

Data submission
```

This aligns with one of the main ideas of **Modern HTML 2026**:

> Don't replace browser capabilities with custom code if the platform already provides a standard solution.

---

### Constraint Validation in the Modern HTML 2026 Architecture

If we look at the Web Platform's development over recent years, a general trend becomes apparent.

HTML is gradually ceasing to be a markup language and becoming a declarative interface for managing the browser's internal subsystems.

```
HTML

↓

Constraint Validation

↓

Browser Engine

↓

UI

↓

Accessibility

↓

CSS State
```

The developer no longer implements the validation mechanism themselves.

They describe domain constraints, and the browser performs all the infrastructure work.

That is why, in 2026, Constraint Validation should be viewed not as a set of convenient attributes but as a full-fledged built-in data validation engine that becomes the foundation of modern web form architecture.

---

## 7.4. Constraint Validation API

In the previous section, we examined the **Constraint Validation Engine** — the built-in constraint validation engine that is part of the browser. However, declarative attributes (`required`, `pattern`, `min`, `max`, and others) are insufficient for all scenarios. The modern Web Platform provides the developer with a programmatic interface for controlling this engine — the **Constraint Validation API**.

This fundamentally distinguishes modern HTML from the traditional approach where JavaScript completely replaced built-in validation. Now, JavaScript does not compete with the browser but interacts with its internal system.

---

### HTML API on Top of the Validation Engine

Architecturally, the Validation API can be represented as follows:

```text
HTML

↓

Constraint Validation Engine

↓

Constraint Validation API

↓

JavaScript
```

HTML describes the constraints.

The browser performs the validation.

JavaScript gains the ability to manage this process without disrupting the platform's internal architecture.

This is precisely why the Validation API is part of the **HTML Living Standard**, not a separate JavaScript library.

---

### The Validation Lifecycle

During form operation, the browser goes through several stages.

```text
User enters data

↓

Element state changes

↓

Validation Engine performs check

↓

ValidityState is formed

↓

Validation API provides result

↓

Form is submitted
or
errors are displayed
```

JavaScript is only involved where additional business logic is truly necessary.

---

#### The `checkValidity()` Method

The simplest API method is `checkValidity()`.

It runs the built-in validation algorithm and returns a boolean value.

```javascript
const form = document.querySelector('form');

if (form.checkValidity()) {
  console.log('Form is valid.');
}
```

If constraints are violated:

- the method returns `false`;
- an `invalid` event is generated for the relevant elements;
- the browser **does not show** built-in messages to the user.

In other words:

```text
checkValidity()

↓

check

↓

return true/false

↓

without showing errors
```

This is convenient when the application makes its own decisions about further actions.

For example:

- executing an AJAX request;
- saving a draft;
- validating multiple forms simultaneously;
- showing a custom error interface.

---

#### The `reportValidity()` Method

`reportValidity()` takes the next step.

It performs the same validation but additionally asks the browser to display the built-in user interface for errors.

```javascript
if (!form.reportValidity()) {
  return;
}
```

Inside the browser, the following happens:

```text
Validation Engine

↓

Constraint check

↓

Find the first erroneous field

↓

Move focus

↓

Show browser message

↓

Cancel submission
```

This is the method that provides the user experience expected from the modern Web Platform.

---

#### The `setCustomValidity()` Method

Sometimes built-in constraints are not enough.

For example:

- the username already exists;
- the password is too weak;
- the selected date is unavailable;
- the user violates business rules.

In such cases, `setCustomValidity()` is used.

```javascript
username.setCustomValidity('This username is already taken.');
```

After this, the element automatically becomes invalid.

```text
setCustomValidity()

↓

customError = true

↓

valid = false

↓

reportValidity()

↓

browser shows the message
```

After fixing the error, the message must be removed.

```javascript
username.setCustomValidity('');
```

This returns the element to its normal state.

It is important to understand that the developer **does not replace** the Validation Engine.

They only add one more validation rule.

---

#### The `willValidate` Property

Not every element participates in the validation process.

Before running the Validation Engine, the browser determines whether a particular element should be validated at all.

This is reflected in the `willValidate` property.

```javascript
console.log(input.willValidate);
```

For example,

the following do not participate in validation:

- `disabled`;
- `readonly` (for some element types);
- `type="hidden"`;
- elements excluded by specification rules.

Architecturally, this looks as follows:

```text
Form Control

↓

willValidate ?

↓

Yes

↓

Validation Engine

↓

ValidityState
```

Thanks to this, the browser does not waste resources on elements that cannot affect the form submission result.

---

### How the Validation API Interacts with ValidityState

All API methods work with the same data model.

```text
Input

↓

ValidityState

↓

Validation API

↓

CSS

↓

Accessibility

↓

UI
```

This is a very important architectural feature.

Instead of multiple independent mechanisms, the browser uses a single source of truth — the `ValidityState` object.

That is why:

- CSS receives pseudo-classes `:valid`, `:invalid`, `:user-valid`, `:user-invalid`;
- Screen Readers learn about errors;
- the browser shows messages;
- JavaScript receives the same information via the API.

All subsystems work with a single state model.

---

### When to Use the Built-in Validation Engine

The modern approach recommends maximizing the use of platform capabilities.

The Validation Engine is ideal for:

- required fields;
- email validation;
- URL validation;
- phone validation;
- number ranges;
- date validation;
- length constraints;
- regular expressions;
- most standard forms.

Practically all basic user input is already implemented inside the browser.

---

### When Custom Business Logic Is Necessary

However, there are validations that the browser cannot perform.

For example:

- checking if a user exists;
- checking email uniqueness;
- server communication;
- corporate security rules;
- complex financial calculations;
- access rights verification;
- comparing data with external systems.

In such cases, the architecture looks different.

```text
HTML Validation

↓

Validation API

↓

Business Validation

↓

Server Validation
```

That is, the built-in engine becomes the **first validation level**, not the only one.

---

### Why the Validation API Is Part of HTML Architecture

The main idea of Modern HTML is that the browser is gradually becoming a full-fledged platform for executing user interfaces.

The Validation API is one of the best examples of this philosophy.

Before modern HTML standards, JavaScript fully controlled the validation process.

```text
JavaScript

↓

Validation

↓

DOM

↓

UI
```

The modern architecture looks different.

```text
HTML

↓

Validation Engine

↓

Validation API

↓

JavaScript
```

JavaScript no longer implements the validation infrastructure.

It only extends the built-in mechanism where business logic requires it.

---

### Constraint Validation API in Modern HTML 2026

In the context of **Modern HTML 2026**, the Constraint Validation API should be viewed not as a set of helper methods but as a programmatic interface to one of the browser's internal subsystems.

This trend is characteristic of the entire modern Web Platform:

- `<dialog>` provides an API for managing modal windows;
- Popover API — for popup interfaces;
- `<details>` — for disclosure components;
- View Transition API — for transitions between states;
- Constraint Validation API — for built-in user data validation.

All these technologies are evolving in one direction: **the browser takes on infrastructure tasks, and the developer describes behavior at a higher level of abstraction**.

That is why, in 2026, the Validation API should be perceived not as an auxiliary JavaScript function but as a full-fledged programmatic interface of the built-in HTML engine, reflecting the overall direction of Web Platform development toward declarative, component-based, and platform-native architecture.

---

## 7.5. Form States and Modern CSS Pseudo-classes

One of the most visible trends in the development of the modern Web Platform is the gradual shift of interface state management from JavaScript to the browser itself. If previously developers manually added and removed CSS classes (`.error`, `.success`, `.filled`, `.empty`, `.dirty`, `.touched`), today a significant portion of this work is performed by the browser engine.

Modern HTML forms can no longer be viewed as a set of independent input fields. For the browser, a form represents a system of interconnected objects, each constantly in a particular state.

That is why it is increasingly said that the modern form is becoming a **declarative state machine**.

---

### From a Set of Fields to a State Model

Historically, the architecture looked like this:

```text
JavaScript

↓

Validation

↓

Adding CSS classes

↓

Interface re-render
```

Almost every state change required writing custom code.

The modern Web Platform uses a completely different approach.

```text
HTML

↓

Validation Engine

↓

Browser State

↓

CSS Pseudo-classes

↓

Rendering
```

The developer describes the form structure and constraints, and the browser independently determines the state of each element and passes this information to CSS.

---

# The Form as a Finite State Machine

Each form element constantly transitions between different states.

```text
Empty field

↓

User started typing

↓

Constraint check

↓

Valid value

or

Invalid value
```

At each transition, the browser automatically changes the set of applied CSS pseudo-classes.

As a result, the interface becomes reactive without writing JavaScript.

---

### The `:valid` Pseudo-class

The `:valid` pseudo-class applies to elements that have successfully passed the built-in constraint validation.

```html
<input type="email" required />
```

```css
input:valid {
  border-color: #16a34a;
}
```

After the user enters a valid email address, the browser automatically applies the style.

The developer does not need to track the `input` event or manually change CSS classes.

---

### The `:invalid` Pseudo-class

If an element violates at least one Constraint Validation constraint, it receives the `:invalid` state.

```css
input:invalid {
  border-color: #dc2626;
}
```

For example,

```html
<input type="number" min="18" />
```

When entering a value:

```text
15
```

the browser automatically detects the `min` constraint violation and applies `:invalid`.

---

### The Problem with Early HTML Versions

For a long time, using `:invalid` came with a serious problem.

After the page opened, all required fields were already considered invalid.

As a result, the user saw a form roughly like this:

```text
🔴 Email

🔴 Password

🔴 Phone

🔴 Name
```

Even though they hadn't entered anything yet.

Such an interface was considered poor UX practice.

---

#### The Emergence of `:user-valid` and `:user-invalid`

Modern browsers solved this problem by introducing new pseudo-classes.

```text
:user-valid

:user-invalid
```

They consider not only the validation result but also the fact of user interaction with the element.

```text
Page opened

↓

Field is empty

↓

No errors yet

↓

User started typing

↓

Validation

↓

:user-invalid
```

or

```text
User fixed the error

↓

:user-valid
```

This allows displaying errors only when they actually make sense.

```css
input:user-invalid {
  border-color: #dc2626;
}

input:user-valid {
  border-color: #16a34a;
}
```

Today, this approach is considered recommended for most interfaces.

---

#### `:required` and `:optional`

The browser automatically knows which fields are required.

```html
<input required />
```

or

```html
<input />
```

Different states are applied accordingly.

```text
required

↓

:required
```

or

```text
optional

↓

:optional
```

For example,

you can visually mark required fields.

```css
input:required {
  border-left: 4px solid #2563eb;
}

input:optional {
  opacity: 0.85;
}
```

Again, without a single line of JavaScript.

---

#### `:placeholder-shown`

Another useful pseudo-class is `:placeholder-shown`.

It applies when the field does not yet contain a user value and displays a placeholder text.

```html
<input placeholder="Enter email" />
```

As long as the user hasn't entered anything,

the browser considers the element to be in the state:

```text
:placeholder-shown
```

After the first character is entered, the state automatically disappears.

This allows building modern interfaces with floating labels.

```css
input:placeholder-shown + label {
  transform: translateY(12px);
}

input:not(:placeholder-shown) + label {
  transform: translateY(-10px);
  font-size: 0.8rem;
}
```

No event handlers are needed anymore.

---

### Combining Pseudo-classes

The main strength of the modern platform is that all states can be combined.

For example,

```css
input:required:user-invalid {
  border-color: crimson;
}
```

or

```css
input:optional:user-valid {
  border-color: seagreen;
}
```

or

```css
input:placeholder-shown:user-invalid {
  border-color: transparent;
}
```

Thus, CSS begins to work as a language for describing interface behavior, not just its appearance.

---

### How the Browser Manages States

Architecturally, the process looks like this:

```text
HTML

↓

Form Control

↓

Constraint Validation Engine

↓

ValidityState

↓

Browser State

↓

CSS Pseudo-classes

↓

Rendering
```

It is important to understand that CSS does not compute anything on its own.

All states are already determined by the browser.

CSS only reacts to them.

---

### Why Less and Less JavaScript Is Needed

Just a few years ago, virtually every form contained code like this:

```javascript
input.addEventListener('input', () => {
  input.classList.remove('error');
  input.classList.add('success');
});
```

Or large form state management libraries were used.

Today, most such tasks are performed automatically.

```text
HTML

↓

Browser

↓

CSS
```

JavaScript is only involved when business logic is needed.

For example:

- server-side data validation;
- asynchronous validation;
- complex corporate rules;
- dynamic form structure changes.

In all other cases, the browser already knows how to independently maintain the current interface state.

---

### Forms as a Declarative State Machine

If we look at the modern HTML platform as a whole, a general trend becomes obvious.

Not only forms but also most new HTML components follow the same architectural model.

```text
HTML

↓

Browser Internal State

↓

CSS States

↓

Rendering
```

This idea is already used in:

- `<dialog>` (`open`);
- Popover API (`:popover-open`);
- `<details>` (`open`);
- Constraint Validation (`:valid`, `:invalid`);
- View Transition API;
- Fullscreen API;
- Picture-in-Picture API.

HTML is gradually ceasing to be a document structure description language and becoming a declarative language for describing user interface states.

---

### Why This Section Is Important for Modern HTML 2026

One of the key features of the modern Web Platform is that the browser is increasingly becoming an **interface state manager**. Instead of manually changing classes and constantly synchronizing the DOM through JavaScript, the developer describes the desired rules, and the browser independently maintains the current state of elements.

That is why, in **Modern HTML 2026**, CSS pseudo-classes should be viewed not as a styling tool but as a **declarative interface to the browser's internal state machine**. This is one of the most important architectural shifts of recent years, gradually changing the approach to designing modern web applications: less imperative code, more built-in platform capabilities, better performance, accessibility, and maintainability.

---

## 7.6. Modern Input Capabilities

If the first generations of HTML forms were only responsible for displaying fields and transmitting data to the server, modern browsers view input as an independent user interface subsystem. Today, HTML manages not only the form structure but also **exactly how the user interacts with the device**.

When a form opens, the browser analyzes the semantics of each field and automatically makes dozens of decisions:

- which virtual keyboard to show;
- which button to place instead of **Enter**;
- whether to perform autocorrection;
- whether to use autocomplete;
- whether to apply automatic capitalization;
- which spell-check dictionaries to use.

In other words, HTML is gradually becoming a **declarative user input API**. The developer describes the intent, and the browser independently chooses the optimal behavior for the specific platform.

---

### The Browser as an Intelligent Mediator

The modern input processing scheme is significantly more complex than it appears:

```text
HTML

↓

Field Semantics

↓

Browser

↓

Operating System

↓

Virtual Keyboard

↓

User
```

For example,

```html
<input type="email" />
```

does not just display a text field.

The browser understands that the user is entering an email address and automatically:

- shows a keyboard with `@` and `.` symbols;
- disables autocorrect;
- disables capitalization;
- suggests saved email addresses;
- enables built-in format validation.

Without a single line of JavaScript.

---

### `autocomplete`

One of the most important capabilities of modern HTML forms is the autofill mechanism.

Many developers perceive it as simply enabling or disabling the browser's saved data.

In fact, the HTML specification defines an entire **semantic system for describing user data**.

For example:

```html
<input autocomplete="given-name" />
<input autocomplete="family-name" />
<input autocomplete="email" />
<input autocomplete="street-address" />
<input autocomplete="postal-code" />
<input autocomplete="country" />
```

The developer tells the browser not the field name but its meaning.

Thanks to this, the browser can:

- use its own secure data storage;
- synchronize information across the user's devices;
- automatically fill forms;
- integrate with password managers;
- use operating system data.

Specialized values are particularly important:

```html
autocomplete="username" autocomplete="current-password"
autocomplete="new-password" autocomplete="one-time-code"
```

The last value allows automatically inserting one-time verification codes (OTP) received via SMS or other supported channels.

---

### `inputmode`

The field type (`type`) determines the meaning of the data.

But sometimes the meaning of the data and the input method differ.

For example, a bank account consists only of digits, yet it is **not a number**.

Using

```html
type="number"
```

is undesirable.

It's better to write:

```html
<input type="text" inputmode="numeric" />
```

Now the browser:

- shows a numeric keyboard;
- does not convert the value to a number;
- does not add value-change arrows;
- preserves leading zeros.

Various modes are supported:

```text
text

numeric

decimal

tel

email

url

search
```

Each tells the browser the most appropriate input method.

---

### `enterkeyhint`

On mobile devices, the **Enter** button can have different purposes.

Modern HTML allows telling the browser the expected user action.

For example:

```html
<input enterkeyhint="search" />
```

The keyboard will show a button labeled:

```
Search
```

Other options:

```text
enter

next

previous

done

send

search

go
```

This may seem like a small detail, but it significantly improves user experience.

For example,

search,

chat,

registration form,

and checkout

can use different labels for the same key.

---

### `spellcheck`

Spell checking is also controlled declaratively.

```html
<textarea spellcheck="true"></textarea>
```

or

```html
<input spellcheck="false" />
```

The browser independently loads dictionaries for the corresponding language.

For fields like:

- passwords;
- email addresses;
- URLs;
- code,

spell checking is usually disabled.

---

### `autocapitalize`

On mobile devices, the browser can automatically change the case of entered text.

For example:

```html
<input autocapitalize="words" />
```

Each word will start with a capital letter.

Supported modes:

```text
off

none

sentences

words

characters
```

Example use cases:

| Mode         | Typical Scenarios     |
| ------------ | --------------------- |
| `sentences`  | comments, messages    |
| `words`      | first name, last name |
| `characters` | promo codes           |
| `off`        | email, logins         |
| `none`       | technical identifiers |

---

### Combining Attributes

These capabilities are most beneficial when used together.

For example:

```html
<label for="email">Email</label>

<input
  id="email"
  type="email"
  autocomplete="email"
  enterkeyhint="next"
  spellcheck="false"
  autocapitalize="off"
/>
```

Or a one-time code field:

```html
<input
  type="text"
  inputmode="numeric"
  autocomplete="one-time-code"
  enterkeyhint="done"
/>
```

The developer hardly controls the device directly.

They only describe the field's properties.

The browser and operating system handle the rest.

---

### HTML as a User Input API

The modern architecture looks like this:

```text
HTML

↓

Field Semantics

↓

Browser

↓

Operating System

↓

Keyboard

↓

Autofill

↓

Spell Check

↓

User
```

This is one of the main trends of the web platform in recent years.

HTML is ceasing to be a markup language and becoming a **high-level declarative interface for managing user input**.

Instead of writing JavaScript to select a keyboard, change the Enter button, or integrate with password managers, the developer describes intent with a few attributes, and the browser implements the optimal behavior for the specific platform.

---

### Why This Matters in 2026

By 2026, modern browsers have reached a level of maturity where most intelligent input capabilities work stably across all major engines (Blink, WebKit, and Gecko) and are part of the **Baseline** concept.

This means a change in frontend architecture itself:

- keyboard selection logic moves to HTML;
- autofill becomes part of the platform, not third-party libraries;
- mobile UX is determined by markup semantics, not JavaScript;
- forms are designed declaratively, and the browser automatically interacts with the operating system.

Therefore, modern HTML describes not only the document structure but also **user input behavior**. This evolution makes next-generation forms one of the most important topics in web development in 2026.

---

## 7.7. `showPicker()` and Browser System Components

One of the most noticeable trends in the development of the modern Web Platform has been the gradual movement of user interface from JavaScript libraries to the browser itself. If previously developers were forced to create their own calendars, color pickers, and file managers, today the browser provides these components as part of the platform.

The key role in this architecture is played by the **`showPicker()`** method, which allows programmatically opening the built-in system interface for selecting a value for supported form elements.

This is another example of how HTML is gradually becoming a **high-level browser API**, and the developer describes intent rather than implementing the interface independently.

---

### What Is `showPicker()`

The `showPicker()` method opens the built-in value selection interface as if the user had clicked on the corresponding field.

```javascript
const input = document.querySelector('input[type="date"]');
input.showPicker();
```

The browser independently decides:

- which interface to show;
- how it should look;
- which controls to use;
- how to interact with the operating system.

This is fundamentally different from JavaScript libraries that completely draw their own interface on top of the page.

---

### Which Elements Support `showPicker()`

Today, the method applies to several types of form elements.

#### Date Selection

```html
<input type="date" />
```

```javascript
document.querySelector('input[type="date"]').showPicker();
```

The browser opens the operating system's native calendar.

---

#### Time Selection

```html
<input type="time" />
```

or

```html
<input type="datetime-local" />
```

The user gets the familiar time selection interface specific to their platform.

---

#### Month Selection

```html
<input type="month" />
```

Instead of a calendar, a specialized month and year selection interface is displayed.

---

#### Week Selection

```html
<input type="week" />
```

The browser allows selecting a calendar week without needing to implement such a component independently.

---

#### Color Selection

```html
<input type="color" />
```

```javascript
colorInput.showPicker();
```

The system color palette opens.

It differs between Windows, macOS, Android, and iOS.

The developer does not need to account for each platform's specifics.

---

#### File Selection

```html
<input type="file" />
```

```javascript
fileInput.showPicker();
```

Instead of artificially simulating file uploads, the browser opens the system file manager.

This is particularly important from a security perspective, as file system access is always controlled by the browser and operating system.

---

### Why the Browser Provides Its Own Interfaces

Many developers ask:

> Why can't we just write a nice calendar in JavaScript?

You can.

But it creates many problems.

A custom calendar must independently implement:

- keyboard navigation;
- localization;
- support for different calendars;
- timezone handling;
- touch device adaptation;
- Accessibility;
- screen reader support;
- interface scaling;
- interaction with the user's system settings.

The native component already handles all of this.

That is why the modern Web Platform increasingly encourages using built-in browser capabilities instead of custom implementations.

---

### The Architecture of `showPicker()`

From the platform's perspective, the process looks like this:

```text
HTML

↓

<input>

↓

showPicker()

↓

Browser Engine

↓

Operating System

↓

Native Picker

↓

Selected Value

↓

DOM
```

Notice that the browser does not create a calendar using HTML.

It calls the operating system's system interface and then synchronizes the selected value back to the DOM.

This creates a kind of bridge between HTML and the OS capabilities.

---

### When a Custom Calendar Is No Longer Needed

Before modern browser APIs, most projects included libraries like:

- Flatpickr;
- Pikaday;
- Air Datepicker;
- Bootstrap Datepicker;
- jQuery UI Datepicker.

The reasons were obvious:

- no unified browser support;
- system pickers were unavailable from JavaScript;
- interfaces looked different across browsers;
- consistent behavior across all browsers was required.

By 2026, the situation has changed significantly.

If the application needs a simple selection of:

- date;
- time;
- month;
- week;
- color;
- file,

native HTML elements are almost always the better choice.

They:

- work faster;
- weigh less;
- are automatically accessible;
- are adapted for mobile devices;
- are supported by the browser at the platform level.

---

### When Custom Components Are Still Needed

Despite the platform's development, there are tasks that cannot be solved with standard pickers.

For example:

- date range selection;
- multiple calendars simultaneously;
- corporate booking rules;
- complex business calendars;
- availability visualization;
- drag-and-drop scheduling;
- time selection with multiple time zones;
- specialized medical or financial interfaces.

In such cases, JavaScript components are still necessary.

Thus, `showPicker()` does not replace all libraries but covers the most common scenarios.

---

### Progressive Enhancement

One of the main advantages of `showPicker()` is its adherence to the **Progressive Enhancement** philosophy.

If the browser supports the method, the application receives a full-fledged system interface.

If not, the user can still interact with the element in the standard way.

For example:

```javascript
if ('showPicker' in HTMLInputElement.prototype) {
  dateInput.showPicker();
} else {
  dateInput.focus();
}
```

This allows using modern capabilities without losing compatibility.

---

### HTML as an API for System Components

The development of `showPicker()` reflects another fundamental trend of the modern Web Platform.

Previously, the architecture looked like this:

```text
HTML

↓

JavaScript

↓

UI Library

↓

Calendar
```

Today, a different model is increasingly used:

```text
HTML

↓

Browser

↓

Operating System

↓

Native Component
```

HTML is becoming a declarative interface for accessing the capabilities of the browser and operating system. The developer no longer creates a calendar, color palette, or file dialog — they only describe **what type of data needs to be obtained**, and the browser independently provides the most appropriate system interface.

---

### Why This Matters in 2026

By 2026, `showPicker()` has ceased to be an experimental feature and has become part of the mature architecture of the modern Web Platform. This reflects the overall direction of HTML development: instead of creating custom JavaScript components, developers are increasingly using built-in browser mechanisms.

Together with `<dialog>`, Popover API, `<details>`, Constraint Validation API, and CSS Anchor Positioning, the `showPicker()` method demonstrates a new philosophy of web development:

> **modern HTML describes not only the document structure but also provides declarative access to high-level browser and operating system capabilities.**

This trend — moving more and more interface tasks from JavaScript to the platform level — is one of the key ideas of the book **Modern HTML 2026**.

---

## 7.8. FormData as a Data Transfer Architecture

If in the early versions of HTML the form was perceived merely as a mechanism for sending data to the server, the modern web platform views it as a **declarative data model**. Today, the browser not only displays input fields — it automatically builds a data object, serializes it into the required format, and transmits it over the network.

That is why `FormData` should be viewed not as a small JavaScript class but as one of the central elements of the modern Web Platform architecture.

---

### From Document to Data

The modern form processing path looks like this:

```text
HTML

↓

<form>

↓

Form Controls

↓

FormData

↓

HTTP Request

↓

Server
```

Notice that the developer does not manually iterate over fields.

It is enough to write:

```javascript
const formData = new FormData(form);
```

The browser independently:

- finds all controls;
- determines their names (`name`);
- extracts current values;
- excludes disabled elements (`disabled`);
- correctly handles checkboxes, radio buttons, files, and multiple values;
- forms a ready-made data model.

---

### FormData as a Data Object

In effect, the browser transforms an HTML form into a collection of pairs:

```text
name → value
```

For example,

```html
<form id="registration">
  <input name="firstName" value="John" />
  <input name="lastName" value="Smith" />
  <input name="email" value="john@example.com" />
</form>
```

after executing

```javascript
const data = new FormData(registration);
```

becomes the logical structure:

```text
firstName → John

lastName → Smith

email → john@example.com
```

The `FormData` object can contain:

- strings;
- multiple values for one field;
- binary data (`File`);
- `Blob` objects.

In essence, it is a universal browser data transfer model.

---

### Why the Browser Performs Serialization

Before modern Web APIs, developers often built requests manually:

```javascript
const body =
  'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email);
```

or

```javascript
JSON.stringify(...)
```

Today, this is almost never required.

The browser already knows:

- which elements belong to the form;
- which values need to be sent;
- which fields should be absent;
- which MIME type is used;
- how to encode special characters;
- how to form boundaries when transmitting files.

Thus, serialization becomes a built-in platform function.

---

### Integration with `fetch()`

The most modern scenario looks like this:

```javascript
const form = document.querySelector('form');
const formData = new FormData(form);

await fetch('/api/profile', {
  method: 'POST',
  body: formData,
});
```

Notice:

no

```javascript
JSON.stringify();
```

no need to specify

```javascript
Content - Type;
```

If the request body is `FormData`, the browser independently:

- chooses the transfer format;
- generates the necessary HTTP headers;
- creates `multipart` boundaries;
- serializes all values.

---

### Data Transfer Architecture

The modern scheme looks like this:

```text
HTML

↓

Form

↓

FormData

↓

fetch()

↓

HTTP

↓

Server
```

JavaScript here merely connects two built-in browser mechanisms.

All the complex work is done by the platform.

---

### Three Standard Serialization Formats

HTML defines several standard formats for transmitting form data.

The choice depends on the `enctype` attribute value.

---

#### `application/x-www-form-urlencoded`

This is the format used by the browser by default.

```html
<form method="post"></form>
```

or

```html
<form method="post" enctype="application/x-www-form-urlencoded"></form>
```

Data is transformed into a string:

```text
name=John&email=john%40example.com
```

Features:

- compact format;
- suitable for text data;
- used by most HTML forms;
- supported by virtually all web servers.

---

#### `multipart/form-data`

If the form contains files,

the browser automatically uses:

```html
enctype="multipart/form-data"
```

Each field becomes a separate part of the HTTP request.

A simplified scheme looks like this:

```text
------Boundary

Content-Disposition: form-data

John

------Boundary

Content-Disposition: form-data

photo.jpg

------Boundary--
```

Main advantages:

- transferring files of any size;
- support for mixed data;
- no need to encode binary files.

This is the format used by the `FormData` object.

---

#### `text/plain`

The simplest serialization mode.

```html
<form enctype="text/plain"></form>
```

Data is sent with virtually no additional processing:

```text
name=John

email=john@example.com
```

In practice, it is used extremely rarely.

Typically used for:

- debugging;
- demonstration examples;
- specialized protocols.

---

### FormData and Files

One of the reasons for `FormData`'s introduction was support for binary data.

For example,

```html
<input type="file" name="avatar" />
```

After creating

```javascript
const data = new FormData(form);
```

the file automatically becomes part of the object.

The developer does not need to:

- read the file's contents;
- encode it manually;
- calculate the MIME type;
- build a `multipart` request.

The browser does all of this.

---

### FormData as a Universal Container

The object can be modified programmatically.

For example,

```javascript
const data = new FormData(form);

data.append('token', csrfToken);
data.append('version', '2026');
```

or

```javascript
data.set('email', 'new@example.com');
```

Thus, `FormData` combines:

- user input;
- automatically serialized form data;
- additional application data.

---

### HTML as a Declarative Data Transfer API

The evolution of the Web Platform is gradually leading to the following architecture:

```text
HTML

↓

Declarative Form

↓

Browser

↓

FormData

↓

HTTP

↓

Server
```

The developer no longer handles data packaging.

They describe the form structure, and the browser automatically transforms it into a correct HTTP request.

That is why modern HTML can be viewed as a **declarative data exchange API**, and `FormData` as the standard serialization model for user input.

---

### Why This Matters in 2026

For many years, JavaScript frameworks built their own form models and data serialization. However, by 2026, most modern applications are again actively using the platform's built-in capabilities: `FormData`, `fetch()`, Constraint Validation API, and native forms work as a unified system.

This represents an important architectural shift. The browser is ceasing to be a passive executor of user code and is increasingly becoming a full participant in data processing. HTML describes the form structure, the browser automatically builds the data model (`FormData`), serializes it into the required format, and transmits it to the server. Such integration of declarative markup, the network stack, and built-in APIs is one of the key features of the modern Web Platform and an important idea of the book **Modern HTML 2026**.

---

## 7.9. Modern Form Events

In the era of single-page applications and complex client-side logic, the form has ceased to be just a container for input fields. The modern browser views the form as a full-fledged finite state machine, providing the developer with detailed control at every stage of user interaction with data.

Understanding the form lifecycle is not just a list of events. It is an architectural pattern that allows separating validation, data collection, submission, and state reset, making code predictable and resilient to bugs.

Let's examine six key events that cover 100% of form interaction scenarios in modern browsers.

---

### 1. `input` — Instant Response (Input Event)

This is the "hottest" form event. It fires **synchronously** on every change to the value of an `<input>`, `<textarea>`, or `<select>` element.

**Features:**

- Fires on every keystroke, paste from clipboard, voice input, or text drag-and-drop.
- Unlike `keydown`/`keyup`, `input` is guaranteed to reflect the current field state after DOM updates.

**Why this matters for the lifecycle:**
This event is at the earliest stage. It allows implementing **"live" validation** (for example, highlighting a password as it's being typed) or **input masking** (phone, date) _before_ the data enters the form store.

```javascript
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  // Mask input on the fly, without waiting for focus loss
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 2) value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  e.target.value = value;
});
```

---

### 2. `change` — Decision Confirmation (Change Event)

This event signals that the user has **finished** editing the field. It is the "lazy" antagonist of `input`.

**Trigger rules:**

- For text fields: on focus loss (`blur`), if the value was changed.
- For `<select>`, radio buttons, and checkboxes: fires **immediately** on option selection.

**Role in the lifecycle:**
This is the decision point. If `input` is a draft, `change` is a commit to local state. At this stage, it's common to perform "heavy" validation (for example, checking username uniqueness via API) that consumes resources and should not run on every keystroke.

```javascript
select.addEventListener('change', (e) => {
  // Activate dependent fields only after the user has definitively selected a country
  updateShippingOptions(e.target.value);
});
```

---

### 3. `submit` — The Gateway to Data (Submit Event)

The key form event. It marks the transition from "Editing" state to "Submitting" state.

**Critical nuances:**

- The event is generated **only** by the `<form>` element, not its child buttons.
- By default, it reloads the page (or navigates to `action`). The modern approach is to always call `preventDefault()` to take control.

**Lifecycle stage:**
This is the **last line of defense** before sending data to the server. Here, we perform final comprehensive form validation, collect data, and send it via the Fetch API. If validation fails, we abort the submission (without calling `preventDefault`), thereby allowing the browser to show native error hints (field validity).

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Take control

  // Check custom condition (e.g., terms agreement)
  if (!form.checkValidity() || !termsCheckbox.checked) {
    // If the form is invalid, the browser will highlight the first invalid fields
    form.reportValidity();
    return;
  }

  // Transition to loading state
  submitButton.disabled = true;
  await sendData(new FormData(form));
  submitButton.disabled = false;
});
```

---

### 4. `invalid` — Error Navigator (Invalid Event)

This event fires on a specific form element when browser validation (attributes like `required`, `pattern`, `type="email"`) fails.

**Important context:**
In the lifecycle, `invalid` occurs **before** the `submit` event, provided we haven't called `preventDefault()` in `submit`. The browser attempts to show the standard tooltip, but we can intercept `invalid` to build our own error system (for example, placing messages below the field).

**Modern approach:**
The `invalid` event does not bubble to `document` by default (in some browsers), so it's better to use delegation on the form:

```javascript
form.addEventListener(
  'invalid',
  (e) => {
    const field = e.target;
    field.classList.add('error-border');
    // Show custom message, disabling the native tooltip
    field.setCustomValidity(' '); // Empty string removes the tooltip but keeps invalid state
    showCustomError(field, field.validationMessage);
  },
  true,
); // capture phase for reliability
```

---

### 5. `formdata` — Interception Before Submission (Data Collection Event)

This is the **youngest** and most powerful event on the list. It was introduced for working with `FormData`.

**What happens:**
The `formdata` event is generated on the `<form>` element at the moment the browser builds the data set for submission (inside the `new FormData(form)` constructor or before native submission).

**Role in the lifecycle:**
This event allows modifying data **on the fly**, adding fields not present in the DOM, or signing the request before it goes to `submit`. This is the ideal place to inject CSRF tokens or session metadata.

```javascript
form.addEventListener('formdata', (e) => {
  // Add a service field not in the HTML
  e.formData.append('timestamp', Date.now());
  e.formData.append('client_id', getClientId());

  // Modify an existing value (e.g., encrypt before sending)
  // Important: set replaces the value if the key exists
  const email = e.formData.get('email');
  e.formData.set('email', email.toLowerCase().trim());
});
```

After this handler, the `formData` passed to `fetch` will already contain these changes.

---

### 6. `reset` — Return to Initial State

An event that fires when `form.reset()` is called or when `<input type="reset">` is clicked.

**Caution:**
Unlike other events, `reset` does not cancel the "dirty" (changed) state of fields in the browser. It simply resets values to their original ones (from the `value` or `checked` attribute) but does not automatically clear validation state.

**Role in the lifecycle:**
This event is typically used to clear custom UI states (remove error highlights, reset timers, clear cached dropdown data) that the browser does not reset by default.

```javascript
form.addEventListener('reset', () => {
  // Manual cleanup of custom errors, because the browser doesn't clear them
  form
    .querySelectorAll('.error-border')
    .forEach((el) => el.classList.remove('error-border'));
  form.querySelectorAll('.custom-error-message').forEach((el) => el.remove());
  // Reset button state if it was disabled
  submitButton.disabled = false;
});
```

---

### Complete Form Lifecycle (Event Map)

To visualize what happens, let's trace the user's path:

1. **User types** → `input` fires (real-time masking and light validation).
2. **User leaves the field** → `change` fires (value confirmation, heavy validation).
3. **User attempts to submit (click on button or `Enter`)** → The browser calls `checkValidity()`.
   - If the field is invalid → `invalid` fires (error display). The process stops, `submit` is **not** called.
4. **If all is valid** → The browser initiates the submission process.
   - The `new FormData(form)` constructor generates the `formdata` event (we sign the request).
5. **Data is ready** → `submit` fires (final check, Fetch submission).
6. **User clicks "Reset"** → `reset` fires (clean UI).

**Final conclusion:** Browsers provide this full spectrum of events not just for convenience but for **security and UX**. The `invalid` event protects against sending garbage, `formdata` protects against parameter tampering (preventing XSS in parameters), and the distinction between `input` and `change` allows saving user CPU resources. By using all six events together, you get a form that behaves like a native desktop application.

---

## 7.10. HTML Forms and Progressive Enhancement

This is one of the most important chapters of the book — not because it introduces anything new in the specification, but because it discusses a principle that is older than most frameworks on the market, yet is experiencing a true revival in 2026.

### Why a Form Must Work Without JavaScript

The statement sounds almost like a conservative slogan, but behind it lies a very practical argument: **JavaScript is the only part of the web stack that may fail to load.**

HTML almost always reaches the browser — it's the first byte of the server's response. CSS usually arrives too, albeit with some delay. But JavaScript may fail to execute for a dozen reasons, most of which have nothing to do with the quality of the developer's code:

- slow or unstable network — the script hasn't had time to load and parse, but the user has already clicked the button;
- an error in a neighboring, completely unrelated script — it can halt all JS execution on the page if the exception isn't isolated;
- a corporate proxy or browser extension blocking some scripts;
- an outdated or low-power device where a large bundle takes several seconds to execute;
- the simple fact that the user has disabled JavaScript — such users are a minority, but they are not zero, and in some domains (government services, banking, accessibility) this is not a hypothetical but a normative scenario.

The form is often the most critical interaction point on the page: login, order checkout, payment submission, search. If it stops working when JS fails, the failure is not cosmetic but blocking. Hence the rule: **the form must function on bare HTML**, and JavaScript should add convenience, not be a prerequisite for its operation.

This is the essence of Progressive Enhancement — an old idea formulated in the early 2000s, but gaining new relevance in a world where web applications are by default designed as "JS-first."

### Why `<form> → POST → Server` Remains the Best Architecture

```
<form>
    ↓
POST
    ↓
Server
```

This chain has a property that is easy to underestimate because it is so fundamental that it no longer stands out: **it does not require JavaScript at any of its three steps.**

- `<form>` — the browser already knows how to collect field values into the request body.
- `POST` (or `GET`) — the browser already forms the HTTP request and sends it.
- `Server` — the server receives already serialized data and processes it.

None of these three steps needs `fetch`, `addEventListener('submit')`, `preventDefault()`, manual `FormData` assembly, or client-side validation to work at all. This is built-in platform behavior that has been working consistently since 1995.

Compare this to a typical SPA form architecture:

```
onSubmit handler
    ↓
preventDefault()
    ↓
manually collect field values (or via state)
    ↓
fetch() / axios.post()
    ↓
wait for response
    ↓
handle success/error in JS
    ↓
manually update UI
```

Each of these steps is code written and maintained by the developer, and each can break independently of the others. Forgot `preventDefault()` — the page reloads at the wrong time. Didn't handle a race condition between two fast submissions — the user submits the form twice. Forgot to disable the button during the request — the same thing. Made a mistake in network error handling — the user sees a frozen form with no feedback.

`<form action="/checkout" method="post">` is not susceptible to any of these bugs because all that logic has been implemented once — inside the browser, not once per project per team.

This doesn't mean server-side rendering and full page reloads are the only correct path in 2026. It means that **the basic, exception-free scenario should be built on this chain**, and everything that makes the interface more responsive — partial updates without reload, optimistic UI updates, inline validation — should be an enhancement on top of it, not a replacement.

### How Modern SPAs Are Gradually Returning to This Approach

It's telling that over the past few years, the major frameworks in the ecosystem have moved precisely in this direction — from "forms as pure client-side JS objects" to "forms as native HTML elements enhanced with JS."

- **React Server Actions** (Next.js, starting with App Router) allow specifying a server function directly in the form's `action` attribute: `<form action={createOrder}>`. With JS enabled, the request goes through client-side optimization without a full reload; with JS disabled, the browser does a regular `POST`, and the form still works because under the hood it's a regular HTML `<form>`.
- **Remix** was built from the start around the idea that forms should be real HTML forms with `action` and `method`, and all the JS layer (`useFetcher`, optimistic updates) is an enhancement on top of a working baseline scenario, not a replacement.
- **Hotwire / Turbo** (Rails ecosystem) intercepts regular form submissions at the event level and turns them into partial page updates, but in the absence of JS, the form continues to work as a regular HTML submit with a full reload.
- **htmx** directly declares this philosophy as its main one: regular HTML attributes (`hx-post`, `hx-target`) extend the behavior of a standard form, but the form itself remains syntactically and semantically a regular HTML form.

The common vector in all these solutions is one: **JavaScript handles the same action that the browser already knows how to perform**, intercepting it to improve UX, not replacing the mechanism that wouldn't exist without it. This is fundamentally different from the classic SPA model of 2015–2020, where `<form>` was often just a visual container with fields, and all submission logic was written from scratch in JS, as if HTML forms had never existed.

The practical takeaway: when designing any form in 2026, it makes sense to first design it so that it works with JavaScript completely disabled — with a real `action`, a real `method`, and server-side data processing — and only then layer client-side enhancements on top. This order guarantees that even in the worst-case scenario (network down, script didn't load, browser hopelessly outdated), the user can still perform the main action on the page — rather than hitting a button that silently does nothing.

---

## 7.11. HTML Forms and Modern Frameworks

Section 7.10 showed why `<form> → POST → Server` remains architecturally the correct baseline scenario. The logical next question is: how do specific frameworks view this — and does this change their relationship with third-party form libraries.

### Angular

Angular has historically offered two parallel approaches: **Template-driven Forms** (declarative, closer to native HTML, with `ngModel`) and **Reactive Forms** (imperative, with `FormGroup`, `FormControl`, fully described in TypeScript component code).

Reactive Forms have long been the "grown-up" choice for complex forms — they make it convenient to build custom validation, dependent fields, and dynamically added control groups. But this approach comes at a cost: the form structure is duplicated — once described in the template (`<input formControlName="email">`), and again in the component class (`this.form = new FormGroup({ email: new FormControl('') })`). This double-entry bookkeeping is a constant source of desynchronization between what is visible in the markup and what actually manages state.

Starting with Angular 14+ and especially in current versions with Signals, the Angular team is explicitly moving toward simplifying this model: typed reactive forms (`Typed Reactive Forms`) narrow the gap between template and code, and signals are fundamentally rethinking how reactive state is modeled, bringing it closer to a lighter and more predictable mechanism than the classic `FormGroup`.

### React

React has never had an "official" way to work with forms — the ecosystem filled this niche with third-party libraries, and there were reasons for that. React historically doesn't provide a convenient way to read values from a form without **controlled components**: each field stores its value in state, each change triggers `setState`, each re-render compares the current field value with this state. For a form with 20 fields, that's 20 `onChange` handlers and 20 pieces of state that need to be declared, synchronized, and not forgotten to validate.

Hence the popularity of **Formik** and **React Hook Form**: they solve precisely this artificial complexity by encapsulating value tracking, validation, and error handling in one place. React Hook Form, in this sense, has taken a step closer to the platform: it actively relies on **uncontrolled inputs** and native `FormData`, rather than `state` for each field — that is, it's already partially on the path of "trusting the browser" rather than fighting it.

### Vue

Vue, thanks to `v-model`, initially offers a lighter two-way binding syntax than "raw" React — `<input v-model="email">` replaces the manual `value` + `onChange` pair. This reduces the need for third-party libraries for simple and medium forms: Vue's basic reactivity already covers much of what drives React developers to pull in Formik.

For complex scenarios (dynamic fields, deep nested validation), the Vue ecosystem offers solutions like **VeeValidate** or **FormKit**, but the need for them is noticeably lower than in React, precisely because the basic DX (developer experience) of Vue is closer to how native HTML behaves.

### Svelte

Svelte goes even further toward nativity. Thanks to its compiled approach and bindings like `bind:value`, working with forms in Svelte feels syntactically closer to plain HTML than to the "React style" with explicit state management via hooks. Svelte 5 with runes (`$state`) continues this line: minimal ceremony between what is visible in the markup and what actually stores the field's value.

It's telling that in the Svelte ecosystem, form libraries play a far less central role than in React — the community more often solves validation tasks through lightweight utility libraries (for example, **Superforms** in combination with SvelteKit) on top of native `<form>`, rather than through heavy abstractions that completely replace the HTML form.

### Qwik

Qwik is a framework designed around the idea of **resumability** (instant state recovery without full hydration), and this philosophy directly affects forms: the less JS required before the first interaction, the better Qwik's model fits. Forms in Qwik by default lean toward server actions (`routeAction$` in Qwik City) — form data is sent to the server almost exactly like in a classic `<form method="post">`, and client-side JS is loaded as needed rather than all at once in advance.

This is architecturally the closest approach to "form as HTML, not as a JS object" among the listed frameworks.

### Astro

Astro occupies a special place in this row because by default it **does not send JS to the client at all** unless explicitly requested (the islands architecture principle). A form in an Astro component, if not "animated" separately, is exactly a native HTML `<form>` working according to the scheme from section 7.10 without any caveats. If interactivity is needed, it is added pointwise, via an island component in React/Vue/Svelte, not by default for the entire page.

Astro, in this sense, is the most radical illustration of Progressive Enhancement at the level of the entire framework architecture, not just a single pattern inside it.

### The Most Important Question

Are

```
Formik
React Hook Form
Angular Reactive Forms
```

needed, or are HTML's capabilities sufficient?

The answer is inconveniently clear: **it depends on the complexity of the form, but the boundary at which a library is truly necessary has shifted noticeably in recent years.**

For a login form, a newsletter subscription form, a simple contact block — native `<form>`, built-in HTML validation (`required`, `type="email"`, `pattern`, `minlength`), and `FormData` on the server are almost certainly sufficient. The library here doesn't solve any real problem — it adds a dependency, bundle size, and an abstraction layer for a task the platform already solves for free.

Such libraries are justified where the task goes beyond what the HTML specification describes:

- complex cross-field validation ("field B is required only if field A has value X");
- dynamically added/removed field groups (lists, repeating sections);
- complex asynchronous validation behavior (server-side email uniqueness check during typing);
- rich UX error management (focus management, error aggregation, design system integration).

In other words, the question has shifted from "is a form library needed at all" to "which specific part of my form does the platform not cover natively" — and it is for that part, not for the entire form, that a third-party solution should be included.

### What Has Changed After the Introduction of Modern Browser Capabilities

Several browser features that have become stable and widely supported in recent years have noticeably shortened the list of reasons to pull in a library:

- **Constraint Validation API** (`checkValidity()`, `setCustomValidity()`, `:invalid`/`:valid` pseudo-classes, `ValidityState`) — allows implementing not only basic but also custom validation without third-party solutions, including programmatic error messages.
- **`FormData` + `Object.fromEntries()`** — serializing the entire form into an object with one line, without manually enumerating fields.
- **`popover` and `<dialog>`** — multi-step forms and modal confirmations no longer require JS libraries for focus and overlay management; this is built into the browser.
- **`:has()` in CSS** — allows implementing part of conditional field display logic (show/hide a block depending on another field's state) purely through CSS, without JS at all.
- **`<input type="date">`, `type="color">`, `type="range">`, and other specialized types** — eliminated an entire class of third-party UI widgets that were previously a mandatory part of any form.
- **View Transitions API** — made smooth transitions between form states (for example, in a multi-step wizard) achievable without heavy animation libraries.

Each of these features closes exactly the type of task for which a third-party library was previously pulled in entirely — simply because there was no alternative.

### Why Many Frameworks Are Starting to Use Native Forms Much More Actively

The general trend visible in all the listed frameworks is: **the newer the approach in a particular ecosystem, the closer it is to the native form, not further from it**. React Hook Form instead of Formik, `routeAction$` in Qwik instead of client-side state management, Server Actions in React/Next.js, `v-model` instead of manual bindings, Astro's islands architecture — everywhere we see the same trajectory.

The reason is not fashion but that the base that had to be "filled in" by libraries has itself become more powerful. Previously, a third-party library closed the gap between what HTML could do and what a real product needed. This gap has not disappeared completely, but it has noticeably narrowed — and so has the territory where an abstraction on top of a native form brings more benefit than overhead. The practical takeaway is the same as in section 7.10: start with what the platform already knows, and include a library only for the part of the task that the platform objectively does not cover — not by default, "just in case," for every form in the project.

---

## 7.12. Accessibility of Modern Forms

The topic of accessibility is often presented as a separate, "additional" discipline — something layered on top of a ready-made form for the sake of WCAG compliance. In fact, for forms this is not the case: a significant portion of accessibility is simply what the browser does for free if the developer doesn't prevent it from doing so. Before writing `aria` attributes, it's worth understanding what already works without them.

### What the Browser Does Automatically

#### Label

```html
<label for="email">Email</label> <input id="email" type="email" />
```

If `<label>` is correctly associated with the field — via `for`/`id` or by wrapping (`<label>Email <input></label>`) — the browser and assistive technologies automatically:

- announce the label text when focusing on the field for screen readers;
- expand the clickable area — clicking on the label text moves focus to the associated field (this is especially important for checkboxes and radio buttons, where the input area itself is small);
- use the label text as the field's _accessible name_ in the Accessibility Tree, which the browser builds in parallel with the DOM.

All of this happens without a single line of ARIA. `<label>` is not a cosmetic element but part of the contract that the browser automatically fulfills if the contract is respected.

#### Focus

The browser itself manages the focus order based on the sequence of interactive elements in the DOM, itself draws the visible focus indicator (`:focus-visible`), itself handles focus movement between fields via `Tab`/`Shift+Tab`, itself excludes elements with `disabled` or `tabindex="-1"` from the sequence. The developer does not need to write code tracking which element is currently active — this state is maintained natively by the browser and provided via `document.activeElement` if ever needed in JS.

#### Keyboard

All standard form elements — `<input>`, `<select>`, `<textarea>`, `<button>` — are by default fully keyboard-controllable without a single line of code: `Tab` moves focus, `Space`/`Enter` activates buttons and checkboxes, arrow keys switch radio buttons within a group and options in `<select>`, `Enter` in a field inside `<form>` initiates submission. This behavior is part of the specification, not a "feature" one must remember when laying out.

#### Screen Reader

Screen readers (VoiceOver, NVDA, JAWS, TalkBack) rely on the accessibility tree that the browser builds from HTML semantics. A correctly marked-up form — with `<label>`, native `<input>`s of the right types, `<fieldset>`/`<legend>` for grouping fields — is announced correctly on its own: the screen reader declares the field's name, its type (`edit text`, `checkbox`, `combo box`), current value, and state (`required`, `invalid`, `checked`) without any manual configuration by the developer.

#### Error Messages

Starting with the Constraint Validation API, the browser itself can show an error message when attempting to submit a form with an invalid field — a tooltip near the problematic field, with automatic focus transfer to it. This happens without JS: attributes like `required`, `type="email"`, `pattern`, `minlength`/`maxlength` are sufficient.

#### Required

```html
<input type="text" required />
```

The `required` attribute is handled by the browser on several levels: visually (in most browsers the field is marked via `:required`/`:invalid` pseudo-classes that can be styled), functionally (the form will not submit while the field is empty), and semantically (the screen reader announces the field as required — "required" — automatically, without manual `aria-required="true"`, which is redundant in this case).

#### Invalid State

```css
input:invalid {
  border-color: red;
}
```

The `:invalid` pseudo-class (and its counterpart `:valid`) is automatically applied by the browser based on the current validation state of the field — the same `ValidityState` discussed in section 7.11. The developer does not need to manually calculate whether the field is "valid" or not and add/remove a class via JS — it's enough to describe styles for the pseudo-class once in CSS.

### What Remains the Developer's Responsibility

The browser's automation covers a lot, but not everything. Here is what does not appear on its own:

- **Meaningful rather than formal labels.** The browser will technically associate `<label>` with the field correctly, but it won't verify whether the label text is actually understandable to a human. "Enter value" is formally a correct label but useless in content.
- **Grouping related fields.** `<fieldset>` and `<legend>` for a group of radio buttons or checkboxes logically united by one question ("Delivery method") — the developer must place them themselves; the browser does not infer semantic connections between neighboring fields.
- **Linking an error message to the field via `aria-describedby`.** The native browser tooltip for `required`/`pattern` is only part of the story. If the developer outputs their own text error message next to the field (which is almost always necessary for consistent form design), the connection between this text and the field must be explicitly written via `aria-describedby`; otherwise the screen reader won't announce it.
- **`aria-invalid` during custom validation.** If validation is performed asynchronously on the server (for example, "this email is already registered") and does not reduce to built-in HTML constraints, the error state must be manually set via `aria-invalid="true"` — the Constraint Validation API knows nothing about this error.
- **Navigation order and logic during non-standard layout.** If the form is visually rearranged via CSS (`order`, `grid-template-areas`) so that the visual order diverges from the DOM order, the developer must either bring them into alignment or explicitly manage `tabindex` — otherwise keyboard navigation will stop matching what is visible on the screen.
- **Accessible names for custom widgets.** As soon as the developer replaces a native `<select>` with their own dropdown on `div`s, all the automation from the section above disappears and must be recreated manually via ARIA (`role="listbox"`, `aria-expanded`, `aria-activedescendant`, and so on) — a task an order of magnitude more complex than it seems at the start.
- **Contrast and non-color state indicators.** The browser will apply `:invalid`, but it is not obligated to guarantee that the style the developer wrote for it is sufficiently contrasty or readable not only through color (important for people with color vision deficiencies).
- **Autocomplete (`autocomplete`).** The `autocomplete` attribute with the correct value (`email`, `given-name`, `street-address`, `cc-number`, etc.) is the developer's responsibility; without it, browser and system password/autofill managers work worse, and this is also part of accessibility in the broad sense — reducing cognitive and motor load on the user.

### Common Mistakes

1. **`<div>` instead of `<label>` with CSS imitating a caption.** It looks like a label but is not programmatically associated with the field — the screen reader won't announce it at all.
2. **`placeholder` instead of `label`.** Placeholder disappears when typing begins, does not have sufficient contrast by default, and is not reliably announced by all assistive technologies as a substitute for a label. Placeholder is a hint about input format, not a replacement for a label.
3. **`div` with `onclick` instead of `<button>`.** Lost: focusability, `Space`/`Enter` handling, `button` role in the accessibility tree — all of this must then be recreated manually via `tabindex="0"`, `role="button"`, and key handlers, with a high probability of missing something.
4. **Removing the standard focus indicator without replacement.** `* { outline: none; }` — one of the most common and most harmful CSS lines in real projects: it removes the only visual signal of where the keyboard focus currently is, without offering anything in return.
5. **Error message not associated with the field.** The text "Invalid email" is displayed next to the field visually, but without `aria-describedby` — a sighted user sees the connection, but a screen reader does not establish it.
6. **Coloring the error only with color.** A red border without an icon, text, or other non-color marker is indistinguishable for users with certain types of color vision deficiencies.
7. **`required` without simultaneous visual and textual indication.** Relying only on the `:invalid` pseudo-class (which only appears after a submission attempt) without explicitly marking required fields in advance — the user learns that a field is required only after an error, not before filling out the form.
8. **Custom select/dropdown without full ARIA implementation.** Replacing `<select>` with a styled `div` widget is almost always a regression in accessibility unless the ARIA Authoring Practices Guide (APG) `listbox`/`combobox` pattern is fully implemented, including keyboard management, which in practice is rarely done and often contains errors.
9. **Auto-focus on the first form field without need (`autofocus`).** May unexpectedly "jump" the user past important page content (heading, instructions) directly to the input field, disorienting them, especially when navigating with a screen reader.
10. **Lack of `<fieldset>`/`<legend>` for groups of radio buttons and checkboxes.** Without them, the screen reader announces each field individually, not telling the user the general question they relate to — the form becomes a set of isolated elements instead of a coherent structure.

The overall conclusion of this section directly continues the logic of the previous three chapters: form accessibility is primarily not a set of ARIA attributes added post-hoc, but a consequence of how much the developer trusted native HTML semantics instead of recreating them manually on top of non-semantic `div`s. Every replacement of a native element with a custom widget is a conscious trade-off: a little more visual control in exchange for a large amount of accessibility logic that now has to be implemented and maintained independently.

---

## 7.13. Architectural Recommendations (Best Practices)

This chapter is not new theory but a concentration of everything said in sections 7.10–7.12, collected as practical rules. None of what follows works as an isolated piece of advice "just in case" — each point is based on a specific browser mechanism discussed above and has a specific cost for ignoring it.

### Use Built-in Constraint Validation by Default

```html
<input type="email" required />
<input type="number" min="1" max="100" />
<input type="text" pattern="[A-Za-z]{3,}" />
```

Before writing your own JS validation function, ask: can this constraint be described with a standard attribute? `required`, `type`, `min`/`max`, `minlength`/`maxlength`, `pattern` cover a significant portion of real form checks — field requiredness, number range, email format, string length. This is not a "simplified" validation for simple cases — it's the same `ValidityState` that you can later rely on in custom code via `checkValidity()` and `setCustomValidity()`. Custom validation from scratch is only justified where built-in constraints are objectively insufficient — not because it's more familiar.

### Use the Validation API Instead of Completely Replacing Native Validation

When built-in attributes are truly insufficient (cross-field rules, asynchronous server validation), the correct path is to **extend** the native mechanism rather than replace it entirely:

```js
input.addEventListener('input', () => {
  if (input.value !== confirmInput.value) {
    confirmInput.setCustomValidity('Passwords do not match');
  } else {
    confirmInput.setCustomValidity('');
  }
});
```

This preserves everything the browser already does for free: showing the error message, moving focus to the problematic field, `:invalid`/`:valid` CSS states, correct screen reader announcement. Completely replacing native validation with a custom UI layer (when `novalidate` is on the form and everything else is implemented manually) means you have to re-implement the entire set of behavior from section 7.12 — and with high probability implement it worse than it's already done in the browser engine.

### Use `autocomplete`, `inputmode`, and `enterkeyhint`

```html
<input
  type="email"
  autocomplete="email"
  inputmode="email"
  enterkeyhint="next"
/>
<input type="tel" autocomplete="tel" inputmode="tel" />
<input type="text" autocomplete="cc-number" inputmode="numeric" />
```

These three attributes solve different but equally underestimated tasks:

- `autocomplete` hints to the browser and password/data managers what exactly is being entered — this directly determines whether the browser will offer autofill and how accurately;
- `inputmode` controls which **virtual keyboard** will appear on the mobile device (numeric, phone, email layout with `@` in a prominent place), without affecting the validation type, which is still handled by `type`;
- `enterkeyhint` changes the label on the screen keyboard's Enter key ("Next", "Done", "Search"), thereby telling the user what will happen when they press it, without a single line of JS.

Each of these attributes is free in terms of implementation cost and noticeably affects input UX on mobile devices — while their absence never manifests as an explicit "breakage" but quietly accumulates as a slightly less convenient form.

### Trust the Browser for System Picker Selection

```html
<input type="date" />
<input type="color" />
<input type="range" min="0" max="10" />
<input type="file" accept="image/*" />
```

Native `input` types hook into system interfaces — calendar, color palette, slider, file selection dialog — that are already adapted to the specific operating system, localization, screen orientation, and input method (finger, mouse, stylus). A custom JS datepicker almost never reaches the same level of native integration and is almost always heavier in weight and more complex to maintain than one `type="date"` attribute. This is the same principle as in sections 7.11–7.12: the platform has already solved the problem — the developer's task for the basic case is to not get in its way.

### Use CSS States Instead of JavaScript Where Possible

```css
input:invalid {
  border-color: var(--color-error);
}
input:required ~ .required-marker {
  display: inline;
}
input:disabled {
  opacity: 0.5;
}
input:focus-visible {
  outline: 2px solid var(--color-focus);
}
details[open] summary {
  font-weight: bold;
}
```

`:invalid`, `:valid`, `:required`, `:disabled`, `:checked`, `:focus-visible`, `:has()`, attribute selectors like `[open]` — all of these are states that the browser already computes and updates automatically (see sections 6.4 and 7.12). Styling directly through these selectors means the visual representation will never desynchronize from the element's actual state — unlike the "toggle a CSS class via JS on every change" approach, where the developer must manually maintain this correspondence at every point where the state might change.

### Keep the Form Functional Without JavaScript

This rule from section 7.10 is repeated here intentionally, because it is not a detail but the framework into which all other points in this chapter must fit. The practical test is simple: disable JavaScript in DevTools and try to go through the entire form — from filling to submission and receiving error feedback. If at any of these steps the form stops functioning, it's a signal that some part of the logic was tied to JS not for enhancement but for the very ability to work at all.

### Design Forms with Accessibility and Progressive Enhancement in Mind

Section 7.12 showed that much of what the browser does automatically — but only if the developer hasn't replaced semantic elements (`<label>`, `<button>`, `<select>`, `<fieldset>`) with their visual imitations on `div`s. The practical rule is simple and almost mechanical: **choosing to use a native element should be the default, not the exception**; moving away from a native element toward a custom widget is a conscious architectural decision that must be accompanied by a complete manual implementation of the accessibility that the native element would provide for free.

### View HTML as the Primary Layer of User Interaction

This is the overarching principle of the entire seventh chapter and, to some extent, the entire book. HTML is not "markup that is later animated by JavaScript" but an independent, functional interaction layer: it can collect data (`<form>`), validate it (Constraint Validation API), transmit it to the server (`method`/`action`), manage state (`open`, `checked`, `disabled`), group behavior (`name` on `<details>` and radio buttons), and be accessible (semantics and built-in assistive technology support) — all without a single line of script.

JavaScript in this model is not the foundation on which interaction is built, but an enhancement that makes an already working interaction faster, smoother, and more responsive to details the platform doesn't describe on its own. The difference between these two mental models is exactly the difference that determines whether the form (and with it, the application) will survive a disabled script, a slow network, an outdated device, or a simple human error in one line of code somewhere in the dependency chain — or not.

---

## 7.14. Why This Chapter Is Relevant in 2026

Forms have existed in HTML since the mid-90s — the `<form>` element is older than most of the technologies this book discusses. It might seem strange to dedicate an entire chapter to such an "old" topic in a book about _modern_ HTML. But it is precisely in 2026 that it has finally become clear: forms have ceased to be a "set of input fields," a mechanical way to collect values and send them to the server. Today, they are one of the most developed subsystems of the Web Platform — with their own state model, their own validation API, their own integration with the operating system, and their own accessibility model built in by default rather than added on top.

Sections 7.10–7.13 broke this down piece by piece — the `<form> → POST → Server` architecture, relationships with frameworks, accessibility, practical rules. This concluding section of the seventh chapter answers the question "why now" and ties the scattered observations into a single picture.

Modern forms demonstrate several global trends in HTML development.

### The Browser Independently Manages Data Validation

The Constraint Validation API, covered in sections 7.11–7.13, is not a cosmetic addition but a full-fledged data validation model living inside the browser: `ValidityState`, `:valid`/`:invalid` pseudo-classes, built-in error messages, programmatic extension via `setCustomValidity()`. What just ten years ago was exclusively a client-side JavaScript task (and often a separate npm library's task) is now by default solved by the platform. The developer only steps in where domain logic goes beyond what a declarative attribute can describe.

### HTML Is Becoming a Declarative User Interaction API

This is a direct continuation of the line this book has been drawing since chapter six: `open` as a reflection of component state (6.4), `name` as a built-in grouping mechanism without a single line of JS (6.5), and now — forms as a declarative layer for collecting, validating, and transmitting data. HTML in this model is not passive markup waiting for JavaScript to "bring it to life" but an active API whose behavior the browser implements itself, based solely on element attributes.

### Modern CSS Can Display Form State Without JavaScript

`:invalid`, `:required`, `:disabled`, `:focus-visible`, `:has()` — CSS in 2026 can react to form state directly, without an intermediary in the form of a class that JS would have to manually add and remove. This eliminates an entire class of bugs related to desynchronization between the visual representation and the actual element state — a topic that was central in section 6.4 for the `open` attribute and proves equally applicable to forms.

### System Pickers Are Replacing Custom Components

`<input type="date">`, `type="color">`, `type="range">`, `type="file">` — native widgets integrated with the operating system, localization, and device input method are displacing custom datepickers, color pickers, and file uploaders that were recently a mandatory line item in any non-trivial project's bundle. The user gets an interface they're already accustomed to at the OS level, and the developer gets an order of magnitude less code to maintain.

### Mobile Browsers Automatically Optimize Data Input

`inputmode`, `enterkeyhint`, `autocomplete`, specialized `input` types — all together make the mobile keyboard adapt to the field's context: a numeric layout for a card number, an email layout with a prominent `@`, a "Search" label on the Enter key in a search field. This is a subtle but cumulative difference in UX that previously required either ignoring it or complex manual device and layout detection in JS.

### The Volume of Client-Side JavaScript Is Decreasing

This is not an isolated fact but a consequence of all the previous points. Every task now handled natively by the browser — validation, state display, system pickers, input optimization — is code that no longer needs to be written, tested, delivered to the user, and kept up to date with dependency updates. Section 7.11 showed this with concrete framework examples: React Hook Form instead of Formik, `routeAction$` in Qwik, Astro's islands architecture — everywhere the same vector toward less client-side code handling what the platform already knows.

### Modern Frameworks Increasingly Use Built-in HTML Capabilities Instead of Fully Replacing Native Forms

The key observation from section 7.11 is worth repeating here in generalized form: the industry in 2026 is not moving from HTML to JavaScript, but in the opposite direction. Server Actions in React, Remix's `<form>`-oriented model, `v-model` in Vue, runes in Svelte, declarative accordions and validation in HTML — all of these are signs of the same shift: frameworks are ceasing to compete with the platform and are starting to be built on top of it.

### Conclusion

Forms have become one of the most vivid examples of how the Web Platform is gradually moving complex logic from user JavaScript directly into the browser. What previously required third-party code — validation, state, accessibility, input optimization — is today either fully built into the HTML specification or requires minimal extension of native behavior rather than its complete replacement.

This is not nostalgia for the "simple web of the nineties" and not a denial of the usefulness of JavaScript and frameworks as such. It is an acknowledgment of a narrower and far more practical fact: the platform, after thirty years, has become significantly more capable than it was when the industry first decided that forms needed to be rebuilt from scratch in JS. Chapter 7 in this book is not about how to get by without frameworks, but that the first question when designing a form in 2026 should not be "which library to include" but "what can the browser already do" — and only after an honest answer to that question should one move on to what truly requires writing custom code.

---

# Chapter Conclusion

Having traced the path from `<form> → POST → Server` (7.10) through relationships with frameworks (7.11), accessibility (7.12), practical rules (7.13), and why all of this became particularly noticeable in 2026 (7.14), it is fitting to condense this chapter into a single line — the evolution that the HTML form has undergone over its thirty years of existence.

```text
HTML Form
    ↓
Validation
    ↓
Constraint Validation API
    ↓
State Machine
    ↓
System Pickers
    ↓
FormData
    ↓
Progressive Enhancement
    ↓
Modern HTML 2026
```

**HTML Form** — the starting point, unchanged since the 90s: an element that can collect field values and send them to the server in a single request, without any code on the developer's part.

**Validation** — the first step toward complexity: forms needed data validation, and for a long time this was exclusively JavaScript's concern — manual checks, manual error messages, manual submission blocking.

**Constraint Validation API** — the moment when this validation returned to the browser, but at a new level: `required`, `pattern`, `min`/`max`, `ValidityState`, `setCustomValidity()` — an entire API living inside the platform, not on top of it (section 7.13).

**State Machine** — rethinking the form not as static markup but as an object with an explicit lifecycle of states: `:valid`/`:invalid`, `:required`, `:disabled`, `open` on `<details>` (chapter 6), `checked` — states that the browser tracks and updates itself, without a JS store.

**System Pickers** — delegating complex user interfaces (date, color, range, file selection) to the operating system instead of custom widgets written and maintained by the developer (section 7.13).

**FormData** — simplifying access to form data itself: serializing all fields into one object, without manually enumerating and processing each field individually.

**Progressive Enhancement** — the principle that ties all of the above into a single architecture: the form must work in the basic, most vulnerable scenario — without JavaScript — and everything JS adds is an enhancement on top of a working foundation, not a condition for its operation (section 7.10).

**Modern HTML 2026** — the point where all previous links in the chain converge: the form as a declarative, self-sufficient, accessible-by-default subsystem, not as a constructor that every project is forced to assemble anew.

The main idea of the chapter:

> **The modern HTML form is no longer just a container for input fields. It is a full-fledged browser subsystem with its own data model, built-in validation engine, lifecycle, system interfaces, and deep integration with CSS, Accessibility, and the Web Platform. In 2026, the developer's task is not to replace this system with JavaScript code but to make the most effective use of the platform's own capabilities.**

This perspective aligns with the philosophy of the book **Modern HTML 2026**: viewing HTML not as a markup language but as a high-level declarative API of the modern web platform. The form, in this sense, is not a special case or an exception but perhaps the most complete demonstration of this principle in the entire book: the only element where all the discussed themes converge — state reflected in markup (chapter 6), validation without JS, accessibility by default, integration with the operating system, and architecture resilient to the failure of any single stack layer.

The next chapter applies the same view — "platform first, then code" — to another area of modern HTML that was long considered exclusively JavaScript territory.
