import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

        const image = this._popupSelector.querySelector('.popup__image');
        const name = this._popupSelector.querySelector('.popup__image-name');
    }
    open(name, link) {
        super.open()
        image.src = link;
        name.textContent = name;
        image.alt = name;
    }
}