export class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
            this._name = data.name;
            this._link = data.link;
            this._alt = data.alt || data.name;
            this._likes = data.likes;
            this._id = data.id;
            this._userId = data.userId;
            this._ownerId = data.ownerId;

            this._cardSelector = cardSelector;
            this._handleCardClick = handleCardClick;
            this._handleDeleteClick = handleDeleteClick;
            this._handleLikeClick = handleLikeClick;
            this._cardTemplate = document.querySelector('.card-template');
        }
        /* _getTemplate() {
             const cardItem = this._cardTemplate.cloneNode(true).content;
             return cardItem;
         }*/

    deleteCard() {
        //event.target.closest('.gallery__item').remove()
        this._cardElement.remove();
        // this._cardElement = null;
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard;
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        const likeCountElement = this._cardElement.querySelector('.gallery__like-button_count');
        likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._fillLike();
        } else {
            this._clearLike();
        }
    }

    _fillLike() {
        this._likeButton.classList.add('like-button_field');
    }

    _clearLike() {
        this._likeButton.classList.remove('like-button_field');
    }

    _fillCard = () => {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name || this._alt;
        this._cardTitle.textContent = this._name;

        this.setLikes(this._likes);

        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }
    }

    _setEventListeners = () => {

        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));

        this._likeButton.addEventListener('click', this._handleLikeClick(this._id));

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link, this.alt)
        });
    }

    generateCard = () => {
        this._cardElement = this._cardTemplate.content.querySelector('.card').cloneNode(true);
        //.cloneNode(true).content;
        this._cardImage = this._cardElement.querySelector('.gallery__image');
        this._cardTitle = this._cardElement.querySelector('.gallery__title')
        this._likeButton = this._cardElement.querySelector('.gallery__like-button');
        this._deleteButton = this._cardElement.querySelector('.gallery__delete-button');

        this._fillCard();

        this._setEventListeners();

        return this._cardElement;
    }
}