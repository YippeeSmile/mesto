export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;

        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _submitForm = (event) => {
        event.preventDefault();
    }

    _showError = (inputElement) => {
        inputElement.classList.add(this._settings.inputErrorClass);
        this._errorContainer.classList.add(this._settings.errorClass);
        this._errorContainer.textContent = inputElement.validationMessage;
    }

    _hideError = (inputElement, errorContainer) => {
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorContainer.classList.remove(this._settings.errorClass);
        errorContainer.textContent = '';
    }

    _disableSubmitButton = () => {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass)
        this._buttonElement.disabled = true;
    }

    _enableSubmitButton = () => {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass)
        this._buttonElement.disabled = false;
    }

    _validateInput = (inputElement) => {
        this._errorContainer = this._form.querySelector('#' + inputElement.id + '-error');

        if (inputElement.validity.valid) {
            this._hideError(inputElement, this._errorContainer);
        } else {
            this._showError(inputElement, this._errorContainer);
        }

        this._toggleButton();
    }

    _haveInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButton = () => {

        if (this._haveInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._toggleButton();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', this._submitForm);

        this._setEventListeners()
    }
}