const openBtn = document.getElementById('openBtn');
const dialog = document.getElementById('confirmDialog');

// Открытие модального окна с блокировкой страницы (метод showModal)
openBtn.addEventListener('click', () => {
    dialog.showModal();
});

// Событие close срабатывает при закрытии диалога (в том числе при отправке формы с method="dialog")
dialog.addEventListener('close', () => {
    // Свойство returnValue содержит значение атрибута value кнопки, которая закрыла форму
    const userChoice = dialog.returnValue;

    if (userChoice) {
        console.log(`Выбор пользователя: ${userChoice}`);

        if (userChoice === 'confirm') {
            console.log('Профиль успешно удален.');
        } else {
            console.log('Действие отменено пользователем.');
        }
    }
});