const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Вершины гор в районе Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'река среди леса зимой'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'спальный район вечером'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'равнина и вдали гора'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'железная дорога через лес летом'
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
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupProfileEdit.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__save-button');
const closeCardEditModal = cardEditModal.querySelector('.popup__close')
const openCardEditModal = document.querySelector('.profile__add-button')
const closeImageModal = imageModal.querySelector('.popup__close')


// Инпуты
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__further');
const inputName = document.querySelector('.popup__input_card-name')
const inputLink = document.querySelector('.popup__input_card-link')

const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');
//nameInput.textContent = nameInput.value;
//jobInput.textContent = jobInput.value;

//Функция удаления ex deleteHandler

function handleDeleteButton(e) {
    //cardElement.remove()
    e.target.closest('.gallery__item').remove()
}

//Функция лайк ex likeHandler

function handleLikeButton(e) {
    e.target.closest('.gallery__like-button').classList.toggle('like-button_field');
}

const cardTemplate = document.querySelector('.card-template').content

// Функция создает карточку и возвращает ее cardElement

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true)
    const cardImage = cardElement.querySelector('.gallery__image')
    const cardTitle = cardElement.querySelector('.gallery__title')
    const deleteButton = cardElement.querySelector('.gallery__delete-button')
    const likeButton = cardElement.querySelector('.gallery__like-button')
    const popupImage = imageModal.querySelector('.popup__image')
    const popupImageName = imageModal.querySelector('.popup__image-name')

    cardImage.src = cardData.link
    cardTitle.textContent = cardData.name

    deleteButton.addEventListener('click', handleDeleteButton);
    likeButton.addEventListener('click', handleLikeButton);
    cardImage.addEventListener('click', () => {
        openModal(imageModal)
        popupImage.src = cardData.link;
        popupImage.alt = cardData.alt;
        popupImageName.textContent = cardData.name;
    });

    return cardElement;
}

//Функция создания и отрисовки карточки

const renderPlaceCard = (data) => {
    const card = createCard(data);
    cardList.prepend(card)
}

initialCards.forEach(renderPlaceCard)


//Функция открытия попапа

function openModal(modal) {
    modal.classList.add('popup_opened');
}

//Функция закрытия попапа

function closePopup(modal) {
    modal.classList.remove('popup_opened');
}

//Функция Редактирование профиля ex formSubmitHandler

function handleSubmitButton(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileEdit)
}

//Обработчики событий

popupOpenButton.addEventListener('click', function() {
    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;

    openModal(popupProfileEdit)
});

popupCloseButton.addEventListener('click', function() {
    closePopup(popupProfileEdit)
});

openCardEditModal.addEventListener('click', function() {
    openModal(cardEditModal)
});

closeCardEditModal.addEventListener('click', function() {
    closePopup(cardEditModal)
});

popupProfileEdit.addEventListener('submit', handleSubmitButton); // ex formElement

cardEditModal.addEventListener('submit', (event) => {
    event.preventDefault()

    renderPlaceCard({
        name: inputName.value,
        link: inputLink.value
    })

    closePopup(cardEditModal)
})

closeImageModal.addEventListener('click', function() {
    closePopup(imageModal)
});