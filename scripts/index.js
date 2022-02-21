import { Card } from './Card.js';
import { openModal, closePopup } from './utils.js';
import { initialCards, cardTemplate, validationConfig } from './constants.js';
import { FormValidator } from './FormValidator.js';

//ищем модалки 

const cardEditModal = document.querySelector('.popup_card-edit') // модалка добавление новой карточки
const popupProfileEdit = document.querySelector('.popup_profile-edit'); //редактирование профиля
const cardList = document.querySelector('.gallery__items')
    //const cardTemplateSelector = document.querySelector('.card-template');

// Кнопки
const profileOpenButton = document.querySelector('.profile__edit-button');
//const profileCloseButton = popupProfileEdit.querySelector('.popup__close');
//const closeCardEditModal = cardEditModal.querySelector('.popup__close')
const openCardEditModal = document.querySelector('.profile__add-button');
//const closeImageModal = imageModal.querySelector('.popup__close')
const popups = document.querySelectorAll('.popup')
const submitButtonCardEditModal = document.querySelector('.popup__save-button_place_card-edit');

// Инпуты
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__further');
const profileNameInput = document.querySelector('.popup__input_card-name');
const inputLink = document.querySelector('.popup__input_card-link')
const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');

//Функция Редактирование профиля
function submitProfileForm(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileEdit)
}

//Функция создания и отрисовки карточки
const renderCard = (data) => {
    const card = new Card(data, cardTemplate)
    const cardListElement = card.createCard()

    cardList.prepend(cardListElement)
}

initialCards.forEach((data) => {
    renderCard(data, cardList)
});

// заполнение и отправка модалки добавления карточки
function submitCardEditModal(event) {
    event.preventDefault()

    renderCard({
        name: profileNameInput.value,
        link: inputLink.value,
    })

    profileNameInput.value = '';
    inputLink.value = '';

    disableSubmitButton(submitButtonCardEditModal);

    closePopup(cardEditModal);
}

//Функция закрытия попап по overlay и крестик
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

//cоздаем новые экземпляры класса
const editFormValidation = new FormValidator(validationConfig, popupProfileEdit)
const addCardFormValidation = new FormValidator(validationConfig, cardEditModal)
editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

// Функция диактивации кнопки при добавлении новой карточки
function disableSubmitButton(submitButtonCardEditModal) {
    submitButtonCardEditModal.setAttribute('disabled', 'true');
    submitButtonCardEditModal.classList.add('popup__save-button_disabled');
}

//Обработчики событий
profileOpenButton.addEventListener('click', function() {
    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;

    openModal(popupProfileEdit)
});

openCardEditModal.addEventListener('click', function() {
    disableSubmitButton(submitButtonCardEditModal);
    openModal(cardEditModal);
});

popupProfileEdit.addEventListener('submit', submitProfileForm);
cardEditModal.addEventListener('submit', submitCardEditModal);