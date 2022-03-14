import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        //this._name = this._popupSelector.querySelector('.profile__name');
        //this._job = this._popupSelector.querySelector('.profile__further');
    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._inputValues = {};

        // добавляем в созданный объект значение полей
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {

            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}