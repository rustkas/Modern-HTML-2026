class UserCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.getElementById('user-card-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Метод вызывается, когда компонент появляется на странице
    connectedCallback() {
        this.updateRole();
    }

    // Указываем браузеру, за какими атрибутами следить
    static get observedAttributes() {
        return ['role'];
    }

    // Метод вызывается при изменении отслеживаемых атрибутов
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'role') {
            this.updateRole();
        }
    }

    // Логика обновления текста роли
    updateRole() {
        const roleSpan = this.shadowRoot.getElementById('role-text');
        // Берём значение из атрибута role="" или ставим дефолтное
        const roleValue = this.getAttribute('role') || 'Разработчик';
        roleSpan.textContent = roleValue;
    }
}

customElements.define('user-card', UserCard);