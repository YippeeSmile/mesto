import '../pages/index.css';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

//ищем модалки 
const popupProfileEdit = document.querySelector('.popup_profile-edit'); //редактирование профиля
const cardList = document.querySelector('.gallery__items');

//const openAvatarEditModal = document.querySelector('.popup_avatar-edit');

//кнопки
const profileOpenButton = document.querySelector('.profile__edit-button');
const openCardEditModal = document.querySelector('.profile__add-button');
const openAvatarEditButton = document.querySelector('.profile__avatar_edit-button');


//инпуты
const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');

const cardSelector = '.card-template';

let userId;

api.getProfile()
    .then(res => {

        userInfo.setUserInfo(res.name, res.about, res.avatar)

        userId = res._id
    })

api.getCards()
    .then(cardWrap => {
        cardWrap.forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            })
            section.addItem(card)
        })
    })

const formValidators = {}

// Включение валидации
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationConfig, formElement)
            // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationConfig);

//получаем данные пользователя
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__further',
    profileAvatarSelector: '.profile__image'
});

const submitAvatarEditModal = (data) => {
    renderLoading(true)
    const { avatarlink } = data;

    api.changeAvatar(avatarlink)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            avatarPopup.close()
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false)
        })
}

//Функция Редактирование профиля
const submitProfileForm = (data) => {
    renderLoading(true)
    const { username, userjob } = data;

    api.editProfile(username, userjob)
        .then((res) => {

            userInfo.setUserInfo(res.name, res.about, res.avatar);
            editProfilePopup.close();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false)
        })
}

// заполнение и отправка модалки добавления карточки
const submitCardEditModal = (data) => {
    renderLoading(true)
    api.addCard(data.name, data.link)
        .then(res => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            })
            section.addItem(card);
            addCardPopup.close();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false)
        })
}

const createCard = (data) => {
    const card = new Card(
        data,
        '.card-template',
        () => {
            imagePopup.open(data.name, data.link)
        },
        (id) => {
            confirmPopup.open()
            confirmPopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard()
                        confirmPopup.close()
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            }
        },
    );
    const cardElement = card.generateCard();
    return cardElement;
}

function renderCard(cardItem) {
    const cardElement = createCard(cardItem);
    cardList.prepend(cardElement);
}

//создаем новый экземляр Section и размещаем карточки из массива

const section = new Section({ items: [], renderer: renderCard }, '.gallery__items');

//ImagePopup новый экземляр класса - открытие картинки
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

//создаем форму добавления карточки submitCardEditModal
const addCardPopup = new PopupWithForm('.popup_card-edit', submitCardEditModal);
addCardPopup.setEventListeners();

//Создаем форму редактирования профиля submitProfileForm
const editProfilePopup = new PopupWithForm('.popup_profile-edit', submitProfileForm);
editProfilePopup.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_card-delete');
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_avatar-edit', submitAvatarEditModal);

avatarPopup.setEventListeners();

section.renderItems();

//Обработчики событий
profileOpenButton.addEventListener('click', () => {

    const data = userInfo.getUserInfo();
    nameInput.value = data.name
    jobInput.value = data.job

    formValidators['profile-form'].resetValidation();
    editProfilePopup.open();
});

openCardEditModal.addEventListener('click', function() {
    formValidators['card-form'].resetValidation();
    addCardPopup.open();
});

openAvatarEditButton.addEventListener('click', () => {
    formValidators['avatar-form'].resetValidation();
    avatarPopup.open();
})

function renderLoading(isLoading) {
    const buttons = Array.from(document.querySelectorAll('.popup__save-button'))
    buttons.forEach((button) => {
        if (isLoading) {
            button.textContent = "Сохранение..."
        } else {
            button.textContent = button.value;
        }
    })
}