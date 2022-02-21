import { imageModal, popupImage, popupImageName, cardTemplate } from './constants.js';
import { openModal } from './utils.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._cardSelector = cardSelector;
    }

    _handleDeleteButton = (event) => {
        event.target.closest('.gallery__item').remove()
            // this._cardElement.remove();
    }

    _handleLikeButton = () => {
        // e.target.classList.toggle('like-button_field');
        this._likeButton.classList.toggle('like-button_field');
    }

    _handlepreviewImage = () => {
        popupImage.src = this._link;
        popupImage.alt = this._name || this._alt;
        popupImageName.textContent = this._name;
        openModal(imageModal)
    }

    _fillCard = () => {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name || this._alt;
        this._cardTitle.textContent = this._name;
    }

    _setEventListeners = () => {
        this._deleteButton.addEventListener('click', this._handleDeleteButton);
        this._likeButton.addEventListener('click', this._handleLikeButton);
        this._cardImage.addEventListener('click', this._handlepreviewImage);
    }


    createCard = () => {
        this._cardElement = cardTemplate.cloneNode(true).content
        this._cardImage = this._cardElement.querySelector('.gallery__image');
        this._cardTitle = this._cardElement.querySelector('.gallery__title')
        this._likeButton = this._cardElement.querySelector('.gallery__like-button');
        this._deleteButton = this._cardElement.querySelector('.gallery__delete-button');

        this._fillCard();

        this._setEventListeners();

        return this._cardElement;
    }
}