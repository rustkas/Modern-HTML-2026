Для **Главы 21**, посвященной оптимизации производительности средствами HTML, основными источниками являются разделы спецификаций HTML и Fetch, описывающие атрибуты ленивой загрузки, подсказки браузеру по приоритетам и ресурсам, а также механизмы адаптивных изображений и потокового парсинга.

Ниже приведен список ссылок на разделы источников, сгруппированный по вашим темам:

### Lazy Loading (Ленивая загрузка)

Этот механизм позволяет откладывать загрузку некритичных ресурсов (изображений и iframe) до тех пор, пока они не понадобятся пользователю.

- **HTML Standard: Section 2.5.7 Lazy loading attributes** — спецификация атрибута `loading`, описывающая состояния `lazy` и `eager`.
- **HTML Standard: Section 2.5.7.1 Intersection Observer** — механизм, с помощью которого браузер отслеживает приближение лениво загружаемых ресурсов к области видимости.
- **MDN Guide: Lazy loading** — руководство по использованию ленивой загрузки для сокращения критического пути рендеринга.

Спецификация [WHATWG HTML Living Standard](https://html.spec.whatwg.org/dev/urls-and-fetching.html) — основополагающий документ, описывающий механизм ленивой загрузки для элементов img и iframe. В спецификации детально рассмотрены: атрибут loading с состояниями lazy и eager, работа IntersectionObserver для отслеживания появления элемента в области просмотра, а также механизмы "lazy load resumption steps" и "lazy load scroll margin" .

W3Schools: [HTML <img> loading Attribute](https://www.w3schools.com/TAGS/att_img_loading.asp) — краткая справочная информация с примерами использования атрибута loading="lazy", таблицей поддержки браузерами и синтаксисом.

MDN Web Docs: Writing fast-loading HTML pages — практическое руководство, описывающее технику ленивой загрузки изображений через атрибут loading="lazy". В документе также рассматривается поведение события load при использовании ленивой загрузки и проверка загрузки через свойство complete [1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/How_to/Author_fast-loading_HTML_pages),[2](https://mdn.org.cn/en-US/docs/Learn/HTML/Howto/Author_fast-loading_HTML_pages).

GoIT JavaScript Textbook: [Lazy Loading](https://textbook.edu.goit.global/javascript-yk5evp/v2/en/docs/lesson-14/lazy-load/#lazysizes-library) — учебный материал, объясняющий концепции "above the fold" и "below the fold", нативную поддержку атрибута loading, а также использование JavaScript-библиотеки lazysizes для кросс-браузерной совместимости. Описана техника LQIP (Low Quality Image Placeholder) с CSS-эффектами при загрузке .

### Resource Hints (Подсказки ресурсам)

Механизмы, позволяющие браузеру заранее подготовиться к загрузке ресурсов, которые понадобятся в ближайшем будущем.

- **HTML Standard: Section 4.6.8.20 Link type "preload"** — декларативное принудительное скачивание ресурсов для текущей страницы.
- **HTML Standard: Section 4.6.8.19 Link type "prefetch"** — скачивание ресурсов, которые могут понадобиться при следующей навигации.
- **HTML Standard: Section 4.6.8.18 Link type "preconnect"** — упреждающее установление соединения с сервером (DNS + TCP + TLS).
- **HTML Standard: Section 4.6.8.5 Link type "dns-prefetch"** — разрешение доменного имени до фактического запроса ресурса.
- **HTML Standard: Section 4.2.4.5 Early hints** — взаимодействие с HTTP-статусом 103 для начала загрузки ресурсов до получения основного HTML-ответа.

**W3C Resource Hints Specification (Working Draft)** — официальная спецификация, определяющая примитивы `dns-prefetch`, `preconnect`, `prefetch` и `prerender` через элемент `<link>`. Описаны процессы обработки подсказок, условия инициализации, а также сценарии отмены спекулятивных загрузок. Подчеркивается, что эти примитивы позволяют разработчику помочь браузеру в принятии решений о подключении к источникам и предварительной загрузке ресурсов [Resource Hints](https://www.w3.org/TR/2018/WD-resource-hints-20180115/).

**Примечание**: В архиве рассылки W3C упоминается разделение спецификаций на "Preload" (с обязательной семантикой) и "Resource Hints" (с опциональной), что может быть полезно для понимания эволюции стандартов [Re: [resource-hints] splitting mandatory semantics into "preload" spec?](https://lists.w3.org/Archives/Public/public-web-perf/2014Dec/0034.html).

### Priority Hints (Приоритеты загрузки)

Атрибут `fetchpriority` позволяет явно указать браузеру относительную важность того или иного ресурса.

- **HTML Standard: Section 2.5.9 Fetch priority attributes** — общее определение атрибута и его состояний (`high`, `low`, `auto`).
- **Fetch Standard: Section 2.2.5 (Priority)** — техническое описание того, как приоритет ассоциируется с запросом.
- **Применение к элементам**: спецификация атрибута для изображений, скриптов и ссылок.

[**Priority Hints Explainer (GitHub WICG)**](https://raw.githubusercontent.com/WICG/priority-hints/main/EXPLAINER.md) — исчерпывающий документ-объяснение, описывающий атрибут `fetchpriority` со значениями `high`, `low` и `auto`. Рассмотрены варианты использования: сигналы высокоприоритетных изображений (например, главное изображение товара), управление приоритетом асинхронных скриптов и вызовов `fetch()` API. Указано, что подсказки должны применяться экономно, так как повышение приоритета одного ресурса обычно происходит за счет другого .

**Commit в репозитории WICG/priority-hints** — содержит ссылки на спецификацию WHATWG HTML для атрибута `fetchpriority`, а также указывает на наличие свойства `priority` в `RequestInit` для JavaScript `fetch()` API [Update explainer to reference HTML spec and redirect spec to explainer](https://github.com/WICG/priority-hints/commit/8f3320c491433a23418556c86c438e3b03fd4615).

### Responsive Images (Адаптивные изображения)

Технологии, позволяющие загружать наиболее подходящую версию изображения в зависимости от экрана устройства.

- **HTML Standard: Section 4.8.1 The `picture` element** — контейнер для предоставления альтернативных источников изображения.
- **HTML Standard: Section 4.8.4.2.1 Srcset attributes** — использование дескрипторов плотности пикселей (`x`) и ширины (`w`) для выбора ресурса.
- **HTML Standard: Section 4.8.4.2.2 Sizes attributes** — определение условий (media conditions) для выбора ширины изображения.
- **MDN Guide: Using responsive images in HTML** — практическое руководство по созданию адаптивных изображений.

**ImageKit.io: Responsive Images — A Reference Guide** — подробное практическое руководство с примерами использования атрибутов `srcset` (с дескрипторами плотности пикселей `1x`, `2x` и дескрипторами ширины `w`) и `sizes`. Документ объясняет, как браузер выбирает оптимальное изображение на основе размера области просмотра, плотности пикселей и ожидаемой ширины изображения в макете. Приведены живые демонстрации и рекомендации по выбору значений для `sizes` [Responsive Images](https://imagekit.io/responsive-images/).

**Gumlet Docs: Responsive Images** — краткое объяснение с примером кода, где атрибут `srcset` содержит варианты изображений с указанием ширины (`240w`, `300w`, `720w`), а `sizes` определяет условия отображения через медиа-выражения. Отмечено, что браузер выбирает ближайший больший вариант, если точное совпадение отсутствует [Responsive Images](https://docs.gumlet.com/docs/responsive-images).

**MDN Web Docs: Author fast-loading HTML pages** — в разделе общих рекомендаций упоминается важность указания размеров (`height` и `width`) изображений и таблиц для предотвращения перекомпоновки макета (layout shift) во время загрузки страницы [1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/How_to/Author_fast-loading_HTML_pages), [2](https://mdn.org.cn/en-US/docs/Learn/HTML/Howto/Author_fast-loading_HTML_pages).

### Streaming HTML (Потоковый HTML)

Способность браузерного парсера обрабатывать HTML-документ по мере его поступления из сети.

- **HTML Standard: Section 13.2.3 The input byte stream** — описание того, как парсер обрабатывает поток байтов.
- **HTML Standard: Section 4.12.3 (Streaming declarative shadow roots)** — спецификация атрибута `shadowrootmode`, позволяющего потоково отрисовывать теневые деревья (Declarative Shadow DOM).
- **HTML Standard: Section 1.8 (Errors incompatible with streaming user agents)** — информация о конструкциях, нарушающих работу потоковых агентов.

**ACM Digital Library: Low Latency Live Video Streaming over HTTP 2.0** — научная работа, исследующая использование функции Server Push в HTTP/2 для потоковой передачи видео с низкой задержкой. В исследовании реализован прототип на основе MPEG-DASH, демонстрирующий снижение задержки и устранение проблемы "request explosion" при уменьшении длительности сегментов [Low Latency Live Video Streaming over HTTP 2.0](https://dl.acm.org/doi/abs/10.1145/2578260.2578277).

**KCI: Video Streaming over HTTP/2: Design and Evaluation of Adaptive Server-Paced Push** — исследование, предлагающее схему доставки видео-сегментов с использованием Server Push HTTP/2 и серверного управления битрейтом. В работе показано превосходство предложенной схемы в условиях плохого сетевого соединения [Video Streaming over HTTP/2](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002715631#listCita).

**Примечание**: Хотя в поисковых результатах нет прямых ссылок на спецификации Streaming HTML, указанные академические работы дают понимание технологии Server Push, которая лежит в основе потоковой передачи.

### Partial Hydration (Частичная гидратация)

Хотя термин чаще используется во фреймворках, в стандартах он связан с процессом «оживления» кастомных элементов.

- **HTML Standard: Section 4.13.1.6 Upgrading elements after their creation** — описание процесса «апгрейда», когда элементы (например, из SSR) оживают по мере загрузки скриптов.
- **MDN: Declaratively with HTML (Shadow DOM)** — объяснение того, как Declarative Shadow DOM позволяет избежать задержек отрисовки, характерных для чисто клиентской гидратации.

**MESCIUS Blog: Potential Angular 19 Features and Trends** — статья, описывающая тренды Angular 19, включая улучшение техник гидратации. Упоминается, что подход частичной гидратации, при котором загружаются только наиболее критичные части страницы, ожидает более надежной поддержки с возможностью точного контроля запуска гидратации на основе взаимодействий пользователя или характеристик устройства [Potential Angular 19 Features and Trends](https://developer.mescius.com/blogs/potential-angular-19-features-and-trends).

**DEV Community: React Server Components vs Angular SSR** — сравнительная статья, объясняющая различия между React Server Components и Angular SSR с частичной гидратацией. Angular подход назван "инкрементальным и практичным", упрощающим внедрение SSR без кардинальных изменений кода. Частичная гидратация позволяет повторно гидратировать только интерактивные части приложения вместо перезапуска всего приложения на клиенте [React Server Components vs Angular SSR: Who’s Winning the Rendering Race?](https://dev.to/mridudixit15/react-server-components-vs-angular-ssr-whos-winning-the-rendering-race-1c7c).

### Дополнительные источники по оптимизации HTML

**MDN Web Docs: Author fast-loading HTML pages** — содержит комплексные рекомендации по оптимизации:

- Уменьшение веса страницы (минимизация, объединение файлов)
- Использование CDN для сокращения физического расстояния до сервера
- Кэширование с заголовком `Last-Modified`
- Сокращение количества DNS-запросов
- Использование `async` и `defer` для скриптов
- Оптимизация и сжатие изображений и SVG
- Современные CSS-подходы вместо табличной верстки
- Указание размеров изображений и таблиц для предотвращения перекомпоновки
