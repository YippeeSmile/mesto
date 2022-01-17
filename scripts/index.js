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

// Функция создания карточек из массива

function createCard(cardData) {
    console.log('cardData=>', cardData)

    const cardTemplate = document.querySelector('.card-template').content
    const cardElement = cardTemplate.cloneNode(true)

    const cardImage = cardElement.querySelector('.gallery__image')
    const cardTitle = cardElement.querySelector('.gallery__title')

    cardImage.src = cardData.link
    cardTitle.textContent = cardData.name

    list.prepend(cardElement)
}

initialCards.forEach(createCard)

// Открытие попапа

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__save-button');

let profileElement = document.querySelector('.profile');
let profileName = profileElement.querySelector('.profile__name');
let profileJob = profileElement.querySelector('.profile__further');

let formElement = document.querySelector('.popup_profile-edit'); //('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_about');

function openPopup() {
    popupProfileEdit.classList.add('popup_opened');
    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;
}


function closePopup() {
    popupProfileEdit.classList.remove('popup_opened');
    cardEditModal.classList.remove('popup_opened');
}

//Добавление новой карточки

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

// Вторая модалка

const cardEditModal = document.querySelector('.popup_card-edit')
const closeCardEditModal = cardEditModal.querySelector('.popup__close')
const openCardEditModal = document.querySelector('.profile__add-button')

openCardEditModal.addEventListener('click', openPopup)
closeCardEditModal.addEventListener('click', closePopup)

// Редактирование названия и ссылки карточки



/*function openCardEditModal() {
    FormData.reset
    cardEditModal.classList.add('popup_opened')
}*/

cardEditModal.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputName = document.querySelector('.popup__input_card-name')
    const inputLink = document.querySelector('.popup__input_card-link')
    const nameValue = inputName.value
    const linkValue = inputLink.value

    const obj = {
        name: nameValue,
        link: linkValue
    }

    createCard(obj)

    closePopup()
})