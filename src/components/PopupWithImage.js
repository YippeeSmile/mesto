import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    open(text, link) {
        const image = this._popup.querySelector('.popup__image');
        const name = this._popup.querySelector('.popup__image-name');

        image.src = link;
        name.textContent = text;
        image.alt = text;

        super.open()
    }
}