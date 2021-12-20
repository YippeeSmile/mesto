//Открытие попапа

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupSaveButton = document.querySelector('.popup__save-button');

let profileElement = document.querySelector('.profile');
let profileName = profileElement.querySelector('.profile__name');
let profileJob = profileElement.querySelector('.profile__further');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_about');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSaveButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);