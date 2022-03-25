import Popup from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

        this._confirmButton = document.querySelector('.popup__save-button_confirm');
    }

    submitHandler(data) {
        this._submitHandler = data;
    }

    setEventListeners() {
        super.setEventListeners();

        this._confirmButton.addEventListener('click', (e) => {
            e.preventDefault();
            this._submitHandler();
        })
    }
}