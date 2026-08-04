# Part III. Next-Generation Forms

## Chapter 8. New Form Attributes: Fine-Tuning UX and Behavior

Modern HTML provides developers with a wide range of attributes for fine-tuning user experience, especially on mobile devices. These attributes allow declarative management of virtual keyboards, autofill logic, and even element accessibility, minimizing the need for complex JavaScript code.

---

## 8.1. Input Modality Management (`inputmode`, `enterkeyhint`, `virtualkeyboardpolicy`)

For devices with virtual keyboards (smartphones, tablets, interactive kiosks), it is critical to display the most appropriate keyboard layout for each field.

- **`inputmode`**: This global attribute indicates to the browser which type of virtual keyboard would be most useful to the user. Unlike strict typing via the `type` attribute, `inputmode` allows using a standard `<input type="text">` (for example, for entering account or card numbers) while invoking a specialized layout. Supported values:
  - `numeric`: Numeric keyboard (integers).
  - `decimal`: Numeric keypad with support for a decimal separator.
  - `tel`: Telephone keypad with `+`, `*`, `#` symbols.
  - `email`: Layout with quick-access keys for `@` and `.`.
  - `url`: Keyboard with `/`, `:`, `.com` symbols.
  - `search` / `text`: General-purpose text layouts.

- **`enterkeyhint`**: Allows customizing the label or icon on the virtual keyboard's confirmation ("Enter") key. The developer can choose one of the values — `enter`, `done`, `go`, `next`, `previous`, `search`, or `send` — to more accurately reflect the context and the action that will occur upon form submission.
- **`virtualkeyboardpolicy`**: Allows programmatically controlling the display of the virtual keyboard (values `auto` or `manual`) for editable elements or custom components, preventing unwanted overlap of the interface.

### Example of Extended Input Configuration

```html
<form class="checkout-form">
  <label for="card-pin">Card PIN:</label>
  <input
    type="password"
    id="card-pin"
    name="pin"
    inputmode="numeric"
    enterkeyhint="done"
    maxlength="4"
  />
</form>
```

---

## 8.2. Text Automation and Verification (`autocomplete`, `autocapitalize`, `spellcheck`)

These attributes help users enter data faster, reduce cognitive load, and prevent accidental typos.

- **`autocomplete`**: Hints to the browser how to automatically fill the field based on previously saved user data. The attribute accepts standard specification tokens (e.g., `given-name`, `email`, `street-address`, `cc-number`). The value `off` is recommended for fields with highly sensitive data that should not be saved in the password manager (for example, one-time verification codes from SMS).
- **`autocapitalize`**: Controls automatic conversion of lowercase letters to uppercase on mobile devices. Supports modes:
  - `off` or `none`: Disables autocapitalization.
  - `words`: Capitalizes the first letter of each word (convenient for full name fields).
  - `sentences`: Capitalizes the first word of each sentence (for comment and review fields).
  - `characters`: All characters are automatically converted to uppercase (for codes, promo codes, or serial numbers).

- **`spellcheck`**: An enumerated attribute (`true` / `false`) that determines whether the browser should perform built-in spell and grammar checking for input fields, text areas, or `contenteditable` elements.

---

## 8.3. Technical Metadata and Validation (`dirname`, `pattern`)

Modern forms can transmit extended linguistic metadata to the server and perform strict value validation using platform capabilities.

- **`dirname`**: Allows sending information about the writing direction (`ltr` — left-to-right, or `rtl` — right-to-left) selected or determined by the user for the input field, to the server. If the element has the form `<input type="text" name="comment" dirname="comment.dir">`, upon form submission the server will receive two variables: the text itself and the direction metadata. This is critically important for multilingual platforms supporting Arabic or Hebrew.
- **`pattern`**: Specifies a regular expression that the entered value must match to pass client-side validation. When using `pattern`, it is strongly recommended to supplement the field with a `title` attribute containing a human-readable description of the expected format — this message is displayed by the browser in a system tooltip or read by screen readers upon validation error.

---

## 8.4. Interaction Control and Accessibility (`inert`)

- **`inert`**: A powerful global boolean attribute that makes the marked document section and all its child elements completely "inactive." Elements with the `inert` attribute are ignored during click attempts, keyboard focus, or page search (`Ctrl + F`).
- This mechanism underlies the native operation of modal dialogs: when a window is opened via the `showModal()` method, the entire rest of the page beneath it is automatically placed into an `inert` state by the browser, guaranteeing absolute unavailability of focus for background content.

---

## Chapter Conclusion

Skillful use of new form attributes transforms static input fields into intelligent interface elements. By shifting keyboard management, autofill, and focus locking logic to the browser's native core, developers create fast, accessible, and reliable web applications without requiring bulky third-party libraries.
