Для **Главы 10**, посвященной современной загрузке ресурсов и механизмам спекулятивного выполнения, основными источниками являются разделы спецификаций HTML и Fetch, описывающие типы связей `link` и API правил предсказания.

Ниже приведен список markdown-ссылок на соответствующие разделы:

### Базовые Resource Hints (Подсказки ресурсам)
*   **HTML Standard: Section 4.6.8.20 Link type "preload"** — декларативное принудительное скачивание ресурсов для текущей страницы.
    *   *Ссылка:* [https://html.spec.whatwg.org/multipage/links.html#link-type-preload](https://html.spec.whatwg.org/multipage/links.html#link-type-preload)
*   **HTML Standard: Section 4.6.8.19 Link type "prefetch"** — скачивание ресурсов, которые могут понадобиться при следующей навигации.
    *   *Ссылка:* [https://html.spec.whatwg.org/multipage/links.html#link-type-prefetch](https://html.spec.whatwg.org/multipage/links.html#link-type-prefetch)
*   **HTML Standard: Section 4.6.8.18 Link type "preconnect"** — упреждающее установление соединения с сервером (DNS + TCP + TLS).
    *   *Ссылка:* [https://html.spec.whatwg.org/multipage/links.html#link-type-preconnect](https://html.spec.whatwg.org/multipage/links.html#link-type-preconnect)
*   **HTML Standard: Section 4.6.8.5 Link type "dns-prefetch"** — разрешение доменного имени до фактического запроса ресурса.
    *   *Ссылка:* [https://html.spec.whatwg.org/multipage/links.html#link-type-dns-prefetch](https://html.spec.whatwg.org/multipage/links.html#link-type-dns-prefetch)
*   **MDN: Using dns-prefetch** — практическое руководство по оптимизации задержек DNS.

### Специализированная и спекулятивная загрузка
*   **HTML Standard: Section 4.6.8.12 Link type "modulepreload"** — оптимизированная загрузка JavaScript-модулей и их зависимостей.
    *   *Ссылка:* [https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload](https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload)
*   **HTML Standard: Section 7.6 Speculative loading** — общий раздел, описывающий механизмы предсказания действий пользователя для ускорения загрузки.
    *   *Ссылка:* [https://html.spec.whatwg.org/multipage/browsing-the-web.html#speculative-loading](https://html.spec.whatwg.org/multipage/browsing-the-web.html#speculative-loading)
*   **HTML Standard: Section 7.6.1 Speculation rules** — спецификация JSON-структур для программного управления предзагрузкой и пререндерингом.
*   **HTML Standard: Section 4.12.1 script (type="speculationrules")** — использование элемента `script` для внедрения правил спекулятивной загрузки.
*   **MDN Glossary: Prerender** — определение термина и концепции полной подготовки страницы в фоне.

### Инфраструктурная поддержка
*   **Fetch Standard: Section 3.8 The `Sec-Purpose` header** — описание заголовка, который информирует сервер о том, что запрос является предзагрузкой (prefetch).
    *   *Ссылка:* [https://fetch.spec.whatwg.org/#sec-purpose-header](https://fetch.spec.whatwg.org/#sec-purpose-header)
*   **HTML Standard: Section 4.2.4.5 Early hints** — взаимодействие с HTTP-статусом 103 для начала загрузки ресурсов до получения основного HTML-ответа.

Эти источники охватывают путь развития HTML от простых подсказок браузеру до сложных API на базе машинного обучения и правил, позволяющих достичь мгновенного отклика интерфейса.