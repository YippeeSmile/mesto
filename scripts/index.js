const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const list = document.querySelector('.gallery__items')

initialCards.forEach(function(cardData) {
    console.log('cardData=>', cardData)

    const cardTemplate = document.querySelector('.card-template').content
    const cardElement = cardTemplate.cloneNode(true)

    const cardImage = cardElement.querySelector('.gallery__image')
    const cardTitle = cardElement.querySelector('.gallery__title')

    cardImage.src = cardData.link
    cardTitle.textContent = cardData.name

    list.prepend(cardElement)

})


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
    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);