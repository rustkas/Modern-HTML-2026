# Part III. Next-Generation Forms

## Chapter 9. Web Form Accessibility (Accessibility / A11y)

Creating accessible forms is not just about following formal standards — it is about ensuring equal opportunity for all users, including people with disabilities and those who use assistive technologies (screen readers, alternative input devices), to effectively interact with web interfaces. In this chapter, we will examine the key elements and attributes that transform a set of input fields into an accessible and understandable tool.

---

## 9.1. Labels (`<label>`) and Accessible Name

The `<label>` element is a fundamental means of providing an **"accessible name"** for form controls.

- **Associating fields:** A label can be associated with a control in two ways:
  - **Explicit association:** Through the `for` attribute on the label, whose value strictly matches the `id` of the target input field.
  - **Implicit association:** By directly nesting the control inside the `<label>` tag.

- **Behavior and UX:** Clicking on the label text automatically moves focus to the associated field or activates it (for example, toggles a checkbox or radio button), expanding the hit target area.
- **ARIA alternatives:** In cases where visual rendering of a classic `<label>` is not possible by design, the following attributes are used to convey context to screen readers:
  - `aria-label`: Sets a string label directly.
  - `aria-labelledby`: References the `id` of one or more elements whose text serves as the name. _Note:_ `aria-labelledby` takes priority when computing an element's accessible name.

### Example of Correct Label Markup

```html
<!-- Explicit association (recommended standard) -->
<div class="field-group">
  <label for="username">Account name:</label>
  <input type="text" id="username" name="username" required />
</div>
```

---

## 9.2. Grouping via `<fieldset>` and `<legend>`

For logical organization of related controls (for example, groups of radio buttons, delivery addresses, or payment data), the `<fieldset>` and `<legend>` elements are used.

- **`<fieldset>`:** Creates a semantic group of elements, helping screen reader users perceive the context of the section. In the Accessibility Tree, this element corresponds to the `group` role.
- **`<legend>`:** The mandatory first child element inside `<fieldset>`, serving as the heading or description of the entire group.
- **Group control via `disabled`:** If the `disabled` attribute is set on the `<fieldset>` container itself, all nested interactive elements (except those inside `<legend>`) will automatically become inactive at the browser level.

---

## 9.3. Error Handling and Validation

Informing users of assistive technologies about errors requires clear semantic relationships.

- **`aria-invalid`:** Indicates to the screen reader that the entered value contains an error. Accepts values `true`, `false`, or `grammar` / `spelling`. Important rule: this attribute **should not** be set before the user has attempted to submit the form or leave the field empty, so as not to overload the interface with premature alerts.
- **`aria-errormessage`:** Allows programmatically linking a control to a specific text block containing the error description. For this relationship to work, the `aria-invalid="true"` attribute must be present on the field itself.
- **Message visibility:** The error text should be not only accessible via ARIA attributes but also visually displayed on the screen for all users.

---

## 9.4. Dynamic Notifications (Live Regions)

**Live Regions** allow assistive technologies to immediately notify the user about changes on the page (for example, successful form submission, appearance of warnings, or changes in validation status), even if the input focus is elsewhere.

- **`aria-live`:** Defines the priority and urgency of the notification:
  - `polite`: The screen reader will wait for a pause in the user's current speech before reading the change.
  - `assertive`: Immediately interrupts the current reading for urgent announcement of an important message.

- **Specialized roles:** The `alert` role (for critical errors) and `status` role (for status notifications) are built-in live regions. An element with the `alert` role has `aria-live="assertive"` by default.
- **`aria-atomic`:** If set to `true`, the screen reader will read the entire live region content in full upon any local change, rather than just the changed fragment.

---

## 9.5. Keyboard Navigation and Focus Management

All interactive form elements must be fully operable via keyboard (using `Tab`, `Shift + Tab`, `Enter`, `Space`, arrow keys).

- **`tabindex`:** The `tabindex="0"` attribute includes a custom or non-focusable element in the standard page tab order. Negative values (e.g., `tabindex="-1"`) make the element accessible for programmatic focus via JavaScript but exclude it from the cyclic `Tab` key sequence.
- **Focus management (`autofocus`):** Allows automatically moving focus to a key field when the page loads or a dialog opens. Overusing `autofocus` on regular pages is not recommended, as it may disorient screen reader users.
- **`aria-activedescendant`:** Used in complex composite widgets (for example, custom dropdowns or autocomplete) when the actual DOM focus remains on the container itself, and "virtual" focus moves between its child items.

---

## Chapter Conclusion

Using native semantic HTML elements (`<form>`, `<label>`, `<fieldset>`, `<button>`) instead of bulky imitations based on generic containers (`<div>` and `<span>`) ensures flawless support for keyboard navigation and assistive technologies "out of the box," freeing the developer from having to manually implement complex accessibility logic.
