import './index.css';
import { Card } from '../components/Card.js';
import { initialCards, cardTemplate, validationConfig } from '../components/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//ищем модалки 
const cardEditModal = document.querySelector('.popup_card-edit') // модалка добавление новой карточки
const popupProfileEdit = document.querySelector('.popup_profile-edit'); //редактирование профиля
const cardList = document.querySelector('.gallery__items')

//кнопки
const profileOpenButton = document.querySelector('.profile__edit-button');
const openCardEditModal = document.querySelector('.profile__add-button');

//инпуты
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__further');
const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');

//cоздаем новые экземпляры класса
const editFormValidation = new FormValidator(validationConfig, popupProfileEdit)
const addCardFormValidation = new FormValidator(validationConfig, cardEditModal)
editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

//получаем данные пользователя
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__further'
});

//Функция Редактирование профиля
const submitProfileForm = (data) => {

    const { username, job } = data;
    profileName.textContent = username;
    profileJob.textContent = job;

    userInfo.setUserInfo(username, job);

    editProfilePopup.close();
}

// заполнение и отправка модалки добавления карточки
const submitCardEditModal = (data) => {
    const card = createCard({
        name: data.name,
        link: data.link
    })

    section.addItem(card);

    addCardPopup.close();
}

const createCard = (data) => {
    const card = new Card(data, cardTemplate, () => {
        imagePopup.open(data.name, data.link)
    });
    const cardElement = card.generateCard();
    return cardElement;
}

function renderCard(cardItem) {
    const CardElement = createCard(cardItem);
    cardList.prepend(CardElement);
}

//создаем новый экземляр Section и размещаем карточки из массива
const section = new Section({
    items: initialCards,
    renderer: renderCard
}, '.gallery__items');

//ImagePopup новый экземляр класса - открытие картинки
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

//создаем форму добавления карточки submitCardEditModal
const addCardPopup = new PopupWithForm('.popup_card-edit', submitCardEditModal);
addCardPopup.setEventListeners();

//Создаем форму редактирования профиля submitProfileForm
const editProfilePopup = new PopupWithForm('.popup_profile-edit', submitProfileForm);
editProfilePopup.setEventListeners();

section.renderItems();

//Обработчики событий
profileOpenButton.addEventListener('click', () => {

    const data = userInfo.getUserInfo();
    nameInput.value = data.name
    jobInput.value = data.job

    editFormValidation.resetValidation();
    editProfilePopup.open();
});

openCardEditModal.addEventListener('click', function() {
    addCardFormValidation.resetValidation();
    addCardPopup.open();
});