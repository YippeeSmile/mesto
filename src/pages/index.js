import './index.css';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig } from '../components/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import { UserInfo } from '../components/UserInfo';

const cardEditModal = document.querySelector('.popup_card-edit');
const cardList = document.querySelector('.gallery__items');
const profileOpenButton = document.querySelector('.profile__edit-button');
const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');


//Создаем форму редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_profile-edit', submitProfileForm);
editProfilePopup.setEventListeners();

//получаем данные пользователя
const userInfo = new UserInfo({ profileNameSelector: '.popup__input_name', profileJobSelector: '.popup__input_about' });
userInfo.setUserInfo(title, job);

//валидация формы редактирования профиля
const editFormValidation = new FormValidator(validationConfig, popupProfileEdit);
editFormValidation.enableValidation();

//открываем и заполняем Profile
profileOpenButton.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    nameInput.textContent = name;
    jobInput.textContent = job;
    editFormValidation.resetValidation();
    editProfilePopup.open();
});

//редактируем и закрываем Profile
const submitProfileForm = (data) => {
    const { name, description } = data;
    userInfo.setUserInfo(name, description);
    editProfilePopup.close();
};

//ImagePopup новый экземляр класса - открытие картинки
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

//создаем карточку
const createCard = (data) => {
    const card = new Card(data, cardSelector, () => {
        imagePopup.open(data.name, data.link);
    });

    const cardElement = card.generateCard();
    return cardElement;
}

//функция отрисовки картчки
function renderCard(cardItem) {
    const CardElement = createCard(cardItem);
    cardList.prepend(CardElement);
}

//создаем новый экземляр Section и размещаем карточки из массива
const section = new Section({
    items: initialCards,
    renderer: renderCard
}, '.gallery__items');

section.addItem();

//создаем форму добавления карточки
const addCardPopup = new PopupWithForm('.popup_card-edit', submitCardEditForm);
addCardPopup.setEventListeners();

//валидация формы заполнения карточки
const addCardFormValidation = new FormValidator(validationConfig, cardEditModal)
addCardFormValidation.enableValidation();

// заполнение и отправка модалки добавления карточки
const submitCardEditForm = (data) => {
    console.log(data, 'data')
    const card = createCard({
        name: data['place-name'],
        link: data.link
    });
    section.addItem(card);
    addCardPopup.close();
}


/*
//функция открытия карточек
function handleCardClick(name, link) {
    popupImage.src = link;
    popupImageName.textContent = name;
    popupImage.alt = name;

    openModal(imageModal);
}*/
//popupProfileEdit.addEventListener('submit', submitProfileForm);
//cardEditModal.addEventListener('submit', submitCardEditModal);

//section.renderItems();