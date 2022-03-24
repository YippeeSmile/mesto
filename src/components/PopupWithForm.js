import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }
    _getInputValues() {
        this._inputValues = {};

        // добавляем в созданный объект значение полей
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}