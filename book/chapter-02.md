# Part I. HTML as a Language of Structure

# Chapter 2. Modern Semantics

> **Main Idea of the Chapter**
>
> Modern HTML is not a collection of "pretty tags," but a language for describing the meaning of a document.
> Semantic elements allow browsers, search engines, accessibility technologies, and other software agents to understand the page's structure without analyzing its appearance.
> You will also learn why their significance has grown in the era of SSR, AI, component architectures, and the ever-expanding Web Platform.

---

# Why This Chapter Is Relevant in 2026

Semantic HTML elements appeared more than fifteen years ago. So it might seem that the topic of modern semantics has long been exhausted.

In fact, the opposite has happened.

If in the HTML5 era semantics were perceived primarily as a means of improving accessibility and search engine optimization, then in 2026 it has become the foundation of the entire Web Platform.

Modern HTML simultaneously serves as a data source for the browser engine, CSS, JavaScript, the Accessibility Tree, search engines, generative artificial intelligence, Server-Side Rendering, streaming rendering, and component architectures.

That is why today the choice between `<article>` and `<div>` is no longer a matter of programming style. It is an architectural decision that affects how the page interacts with numerous web platform subsystems.

In this chapter, we will examine semantic elements not as "new HTML5 tags," but as a language for describing the domain model of a modern web application.

# Why Semantics Emerged

Before the advent of HTML5, most websites looked roughly the same.

```html
<div id="header">
  <div id="menu">
    <div id="content">
      <div id="sidebar">
        <div id="footer"></div>
      </div>
    </div>
  </div>
</div>
```

This approach came to be known as **div soup**.

For the browser, all these elements were completely identical.

It was impossible to determine:

- where the main content began;
- where the navigation was located;
- where the article was;
- where the document ended.

A similar problem was experienced by:

- search engines;
- screen reader programs;
- browser extensions;
- voice assistants;
- machine analysis systems.

HTML5 solved this problem by introducing **semantic elements**.

Now developers can explicitly tell the browser the purpose of each block on the page.

---

# Semantics as a Contract

When a developer writes

```html
<nav></nav>
```

they are telling the browser:

> This section contains navigation.

When

```html
<main></main>
```

is used, the browser understands:

> This is where the main content of the page is located.

When

```html
<article></article>
```

is used, it becomes clear:

> This is an independent publication.

HTML has ceased to be merely a display language.

It has become a language for describing the domain.

---

# Semantics and the Accessibility Tree

The modern browser builds multiple document models simultaneously.

```
HTML

↓

DOM

↓

Accessibility Tree

↓

Screen Reader
```

It is precisely semantic elements that allow the browser to automatically create a correct accessibility tree.

For example,

```html
<nav></nav>
```

becomes Landmark Navigation.

```
Navigation

↓

Main site menu
```

And

```html
<main></main>
```

becomes

```
Main Landmark
```

Thanks to this, a screen reader user can instantly jump to the main content of the page, skipping menus and sidebars.

---

# Landmarks

One of the most important features of modern semantics is **Landmarks**.

They allow users to navigate the page not by element order, but between logical areas of the document.

These elements include:

| Element    | Landmark                   |
| ---------- | -------------------------- |
| `<header>` | Banner (when top-level)    |
| `<nav>`    | Navigation                 |
| `<main>`   | Main                       |
| `<aside>`  | Complementary              |
| `<footer>` | Contentinfo (for document) |
| `<form>`   | Form                       |
| `<search>` | Search                     |

Landmarks are one of the primary reasons for the introduction of most modern semantic elements.

---

# Document Structural Elements

## `<header>`

- `<header>`: Represents a group of introductory or navigational aids. It typically contains headings (`<h1>`–`<h6>`), logos, navigation menus, or search forms.
- _Important to remember:_ `<header>` is not sectioning content and does not create a new section in the document outline. It can be used multiple times (for example, in the site header, article header, etc.).

```
<header>

↓

Banner

↓

Accessibility Tree
```

---

## `<main>`

It is very important to understand that

```
<main>
```

does not mean

> The central column of the site.

It means

> The main content of this document.

There should be only one active `<main>` on a page.

---

## `<footer>`

- `<footer>`: Contains information about the nearest ancestor—a section or the entire document (authorship, links to related documents, legal notices, copyright).
- _Features:_ Like `<header>`, it does not create a new subsection. A footer does not necessarily have to be at the very end of a section or page, although that is where it is most often placed.

```
<footer>

↓

Content Information
```

---

# Semantic Sections

## `<article>`

The main rule.

If an element could be published independently—

then most likely,

it is `<article>`.

For example:

- article;
- comment;
- product card;
- forum post;
- social media post.

---

## `<section>`

A very common mistake is using `<section>` as a replacement for `<div>`. This is incorrect. `<section>` is not a container, but a thematic section of a document.

A practical rule: if a section has its own heading, you should most likely use `<section>`.

---

## `<aside>`

Modern `<aside>` is most often used for:

- sidebars;
- supplementary materials;
- advertisements;
- lists of related articles;
- reference information.

Its content should not be essential for understanding the main text.

---

# Specialized Elements

## `<figure>`

It is important to understand that

```
<figure>
```

can contain not only images.

For example:

```html
<figure>
  <pre>
program code
  </pre>
  <figcaption>Listing 2.1</figcaption>
</figure>
```

or

```html
<figure>
  <blockquote>...</blockquote>
  <figcaption>Quote from Tim Berners-Lee</figcaption>
</figure>
```

---

## `<time>`

You should always use the

```
datetime
```

attribute in the ISO-8601 format.

This facilitates:

- indexing;
- machine processing;
- calendar export;
- data analysis.

---

# When to Use `<div>`

The most important question in modern semantics.

The rule can be stated very simply:

```
Does a semantic element exist?

↓

Yes

↓

Use it.

↓

No

↓

Use <div>.
```

That is why

```
<div>
```

is called a

> generic container

or

> the element of last resort.

---

# Semantics and Modern Frameworks

Sometimes you may hear the opinion:

> Angular generates HTML anyway.

That's true.

But Angular cannot independently determine what your component means.

For example,

```html
<app-news-list></app-news-list>
```

for the browser—

is not an article.

If inside the component there is

```html
<article></article>
```

the browser understands its purpose.

Therefore, modern frameworks do not eliminate the need for proper semantics.

They only help generate HTML.

---

# Architectural Recommendations

When designing a page, it is useful to follow this order of questions:

```
What does this object represent?

↓

Is there a semantic element for it?

↓

Yes

↓

Use it.

↓

No

↓

Use div.
```

---

# How the Role of Semantics Has Changed in the Modern Web Platform

And here, a lot of truly new things have emerged.

---

## 1. Semantics Is No Longer Just About Accessibility

In books from 2015–2024, they typically wrote:

> Use `<article>` because it's good for SEO.

or

> Use `<nav>` because Screen Readers will understand the page structure.

In 2026, this is only a small part of the picture.

Today, HTML is the **Single Source of Truth** for multiple browser subsystems simultaneously.

```
HTML

      │

      ├────────► DOM

      ├────────► Accessibility Tree

      ├────────► Search Engine

      ├────────► AI Agents

      ├────────► Browser APIs

      ├────────► View Transitions

      ├────────► Web Components

      └────────► Rendering Engine
```

That is, semantics has become a contract for many consumers at once.

---

## 2. HTML Has Become a Declarative Programming Language

This is perhaps the most significant change in recent years.

Previously, HTML was almost exclusively responsible for document structure.

Today, HTML is increasingly becoming a declarative browser API.

For example

```
<dialog>
```

no longer just denotes

> a dialog.

It tells the browser

> Create a fully functional modal window.

Without JavaScript.

---

The same applies to

```
popover
```

```
commandfor
```

```
inert
```

```
details
```

```
template
```

```
slot
```

```
shadowrootmode
```

HTML is gradually beginning to describe not only document structure but also **interface behavior**.

This is a fundamentally new trend in the Web Platform.

---

## 3. Semantics Is Becoming an API for Artificial Intelligence

Previously, HTML was analyzed by:

- browsers;
- search engines;
- Screen Readers.

Now new consumers have emerged.

For example:

- AI Search;
- LLMs;
- AI Agents;
- browser assistants;
- autonomous web agents.

For them, semantic structure is much more important than CSS.

Imagine two documents.

The first:

```html
<div class="big-title">News</div>
```

The second:

```html
<article>
  <h1>News</h1>
</article>
```

To a human, both look the same.

To AI—

they don't.

In the second case, the model immediately understands:

- this is an article;
- there is a main heading;
- the content follows.

---

## 4. Semantics Is Becoming Part of SSR

Before the advent of SSR, many pages were fully generated by JavaScript.

Today, the situation has changed.

Almost all modern frameworks emphasize:

- SSR;
- Streaming SSR;
- Partial Hydration;
- Islands Architecture.

This means that HTML is once again the first object the browser receives.

Consequently, the quality of HTML is once again critically important.

---

## 5. Semantics Is Becoming Part of Performance

It may seem that

```
<article>
```

has nothing to do with performance.

But it does.

The better structured the HTML, the easier it is to:

- perform streaming rendering;
- split the page into components;
- perform partial hydration;
- build Islands;
- implement Server Components.

That is, modern performance architecture starts with HTML.

---

## 6. Semantics Has Become the Foundation of Design Systems

Previously, a Design System consisted roughly of:

```
Button

Card

Input

Modal
```

Today, a good Design System starts by asking:

> What HTML should the component generate?

For example:

```
Card
```

should it render as

```
<div>
```

or

```
<article>
```

If the component represents an independent object,

then

```
<article>
```

is almost always more correct.

So, a Design System doesn't just design CSS.

It designs HTML.

---

## 7. Semantics Is Becoming Part of Component Architecture

In Angular,

```
<app-product-card>
```

tells the browser nothing.

But if inside the component there is

```html
<article>...</article>
```

then the browser understands that this is an independent publication.

This leads to an interesting thought.

A modern component has **two architectures**.

The external one:

```
Angular Component
```

and the internal one:

```
Semantic HTML
```

It is the internal architecture that interacts with the Web Platform.

---

## 8. HTML Is Becoming the Interface Between Humans and Browsers

Previously, they said:

> HTML describes a page.

Today, it's more accurate to say:

> HTML describes the domain model of the interface.

CSS is responsible for appearance.

JavaScript is responsible for state changes.

HTML is responsible for the meaning of objects.

---

# Key Takeaways

After studying this chapter, remember:

- Semantics describes meaning, not presentation.
- Modern HTML provides dozens of specialized elements.
- Semantic elements are automatically used by the Accessibility Tree.
- Proper semantics improves SEO.
- Modern frameworks work on top of semantic HTML.
- `<div>` remains an important element, but only when no more suitable semantic tag exists.

---

## How the Browser "Sees" a Page

```
HTML
   │
   ▼
DOM
   │
   ├────────► CSSOM
   │             │
   │             ▼
   │        Render Tree
   │
   ├────────► Accessibility Tree
   │
   ├────────► SEO Parser
   │
   ├────────► View Transition API
   │
   └────────► JavaScript
```

---

# What's Next

In the next chapter, we will see that modern HTML is not only a language of structure but also a **declarative browser interface**.

We will explore the concept of **HTML as the Web Platform API** and see why new HTML features continue to emerge even more than thirty years after the language was created.
