//функция отмены стандартного поведения браузера

function submitForm(event) {
    event.preventDefault();
}

//Функция, которая добавляет класс с ошибкой

function showError(input, errorContainer, { inputErrorClass, errorClass }) {

    input.classList.add(inputErrorClass);
    errorContainer.classList.add(errorClass);
    errorContainer.textContent = input.validationMessage;
}

//Функция, которая удаляет класс с ошибкой

function hideError(input, errorContainer, { inputErrorClass, errorClass }) {
    input.classList.remove(inputErrorClass);
    errorContainer.classList.remove(errorClass);
    errorContainer.textContent = '';
}

//Функция, которая меняет состояние кнопки

function toggleButton(form, { submitButtonSelector, inactiveButtonClass }) {
    const button = form.querySelector(submitButtonSelector);
    const isFormValid = form.checkValidity();

    if (isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled');
    } else {
        button.classList.add(inactiveButtonClass);
        button.setAttribute('disabled', '');
    }
}

//Проверка валидности формы

function validateInput(form, input, classes) {
    const errorContainer = document.querySelector('#' + input.id + '-error');

    if (input.validity.valid) {
        hideError(input, errorContainer, classes);
    } else {
        showError(input, errorContainer, classes);
    }

    toggleButton(form, classes);
}

//Функция, которая обходит все формы и добавдяет события
function enableValidation({ formSelector, inputSelector, ...rest }) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        form.addEventListener('submit', submitForm);

        const inputs = form.querySelectorAll(inputSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(form, input, rest);

            });
        });

        toggleButton(form, rest);
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: 'error-message_visible',
    errorSelector: '.error-message'
});