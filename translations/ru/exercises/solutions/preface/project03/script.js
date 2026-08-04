// Определение класса компонента, наследуемого от HTMLElement
class UserCard extends HTMLElement {
    constructor() {
        super();

        // Создание Shadow DOM в режиме 'open' для инкапсуляции
        this.attachShadow({ mode: 'open' });

        // Получение шаблона из DOM
        const template = document.getElementById('user-card-template');

        // Клонирование содержимого шаблона и добавление его в Shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Регистрация кастомного элемента
customElements.define('user-card', UserCard);