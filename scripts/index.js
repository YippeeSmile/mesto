//Открытие попапа

const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupSaveButton = document.querySelector('.form__save-button');

let profileElement = document.querySelector('.profile');
let profileName = profileElement.querySelector('.profile__name');
let profileJob = profileElement.querySelector('.profile__further');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__name');
let jobInput = formElement.querySelector('.form__about');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput = nameInput.value;
    jobInput = jobInput.value;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput;
    profileJob.textContent = jobInput;
}


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSaveButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);