const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Вершины гор в районе Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область, река среди леса зимой'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново, спальный район вечером'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район, железная дорога через лес летом'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'озеро Байкал зимой'
    }
];

const cardList = document.querySelector('.gallery__items')

// Модалки
const popupProfileEdit = document.querySelector('.popup_profile-edit'); //редактирование профиля
const cardEditModal = document.querySelector('.popup_card-edit') // модалка добавление новой карточки
const imageModal = document.querySelector('.popup_type_image') // модалка картинки

// Кнопки
const profileOpenButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popupProfileEdit.querySelector('.popup__close');
const closeCardEditModal = cardEditModal.querySelector('.popup__close')
const openCardEditModal = document.querySelector('.profile__add-button')
const closeImageModal = imageModal.querySelector('.popup__close')
const popups = document.querySelectorAll('.popup')
const popupImage = imageModal.querySelector('.popup__image')
const popupImageName = imageModal.querySelector('.popup__image-name')
const submitButtonCardEditModal = document.querySelector('.popup__save-button_place_card-edit');


// Инпуты
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__further');
const profileNameInput = document.querySelector('.popup__input_card-name');
const inputLink = document.querySelector('.popup__input_card-link')

const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');

//Функция удаления карточки

function handleDeleteButton(e) {
    //cardElement.remove()
    e.target.closest('.gallery__item').remove()
}

//Функция поставить лайк

function handleLikeButton(e) {
    e.target.classList.toggle('like-button_field');
}

const cardTemplate = document.querySelector('.card-template').content

// Функция создает карточку и возвращает ее cardElement

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true)
    const cardImage = cardElement.querySelector('.gallery__image')
    const cardTitle = cardElement.querySelector('.gallery__title')
    const deleteButton = cardElement.querySelector('.gallery__delete-button')
    const likeButton = cardElement.querySelector('.gallery__like-button')

    cardImage.src = cardData.link
    cardImage.alt = cardData.name || cardData.alt
    cardTitle.textContent = cardData.name

    deleteButton.addEventListener('click', handleDeleteButton);
    likeButton.addEventListener('click', handleLikeButton);
    cardImage.addEventListener('click', () => {
        openModal(imageModal)
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name || cardData.alt;
        popupImageName.textContent = cardData.name;
    });

    return cardElement;
}

//Функция создания и отрисовки карточки

const renderPlaceCard = (data) => {
    const card = createCard(data);
    cardList.prepend(card)
}

//// очиститьь поля карточки и кнопка деактивации

initialCards.forEach(renderPlaceCard)

//Функция открытия попапа

function openModal(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//Функция закрытия попапа

function closePopup(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

//Функция закрытия попап по Esc

function closePopupEsc(event) {
    if (event.keyCode === 27 || event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
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

//Функция Редактирование профиля

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileEdit)
}

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
    openModal(cardEditModal);
});

popupProfileEdit.addEventListener('submit', handleProfileFormSubmit);


cardEditModal.addEventListener('submit', (event) => {
    event.preventDefault()

    renderPlaceCard({
        name: profileNameInput.value,
        link: inputLink.value,
    })

    profileNameInput.value = '';
    inputLink.value = '';

    disableSubmitButton(submitButtonCardEditModal);

    closePopup(cardEditModal);
});