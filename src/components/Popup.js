export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupOpenClass = 'popup_opened';
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add(this._popupOpenClass);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove(this._popupOpenClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(event) {
        if (event.keyCode === 27 || event.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        // закрытие по оверлэй и на крестик
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(this._popupOpenClass)) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }
}