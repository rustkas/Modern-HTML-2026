Вот пример кода на JavaScript, который демонстрирует разницу между `childNodes` и `children` в DOM-дереве. Вы можете скопировать этот код и запустить его в консоли любого веб-санта (F12 -> Консоль).

```javascript
// Выберем корневой элемент страницы (<html>) или любой другой контейнер, например <body>
const rootElement = document.documentE; // или document.body

console.group('=== Исследование дерева узлов ===');

// 1. childNodes возвращает ВСЕ узлы (включая текст, комментарии и пробелы/переносы строк)
console.log('1. childNodes (все типы узлов):', rootElement.childNodes);
console.log(
  'Количество элементов в childNodes:',
  rootElement.childNodes.length,
);

// Посмотрим на типы узлов в childNodes
rootElement.childNodes.forEach((node, index) => {
  // nodeType: 1 - Element, 3 - Text, 8 - Comment
  console.log(
    `Узел #${index}: тип nodeType = ${node.nodeType}, тег/название = ${node.nodeName}`,
  );
});

console.log('-----------------------------------');

// 2. children возвращает ТОЛЬКО узлы-элементы (теги HTML)
console.log('2. children (только теги-элементы):', rootElement.children);
console.log('Количество элементов в children:', rootElement.children.length);

console.groupEnd();
```

### Ключевые выводы:

- **`NodeList` (`childNodes`)**: Содержит абсолютно все узлы внутри родительского элемента. Текстовые узлы (`nodeType === 3`) часто появляются из-за форматирования кода (переносы строк и отступы между тегами).
- **`HTMLCollection` (`children`)**: Содержит исключительно HTML-теги, игнорируя текст, пробелы и комментарии, что делает этот список удобнее для большинства практических задач верстки.
