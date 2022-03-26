import '../pages/index.css';
import { Card } from '../components/Card.js';
import { validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm';

//ищем модалки 
const popupProfileEdit = document.querySelector('.popup_profile-edit'); //редактирование профиля

//кнопки
const profileOpenButton = document.querySelector('.profile__edit-button');
const openCardEditModal = document.querySelector('.profile__add-button');
const openAvatarEditButton = document.querySelector('.profile__avatar-button');

//инпуты
const nameInput = popupProfileEdit.querySelector('.popup__input_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_about');

let userId;

Promise.all([api.getProfile(), api.getCards()])
    .then(([res, data]) => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);
        userId = res._id
        data.reverse()
        cardsSection.renderItems(data)
    })
    .catch((err) => {
        renderError(`Ошибка: ${err}`)
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


//создаем новую секцию для карточек
const cardsSection = new Section({
    items: [],
    renderer: (data) => {
        const card = createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
        })
        cardsSection.addItem(card);
    },
    containerSelector: '.gallery__items'
});

//функция редактирования аватара
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
    api.addCard(data.name, data.link) //data.like 
        .then(res => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            })
            cardsSection.addItem(card);
            addCardPopup.close();
        })
        .catch((err) => {
            renderError(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false)
        })
}

//создаем и возвращаем готовую карточку
const createCard = (data) => {
    const card = new Card(
        data,
        '.card-template',
        () => {
            imagePopup.open(data.name, data.link)
        },
        (id) => {
            confirmPopup.open()
            confirmPopup.submitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard()
                        confirmPopup.close()
                    })
                    .catch((err) => {
                        renderError(`Ошибка: ${err}`)
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch((err) => {
                        renderError(`Ошибка: ${err}`)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch((err) => {
                        renderError(`Ошибка: ${err}`)
                    })
            }
        },
    );
    const cardElement = card.generateCard();
    return cardElement;
}

//ImagePopup новый экземляр класса - открытие картинки
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

//создаем форму добавления карточки submitCardEditModal
const addCardPopup = new PopupWithForm('.popup_card-edit', submitCardEditModal);
addCardPopup.setEventListeners();

//Создаем форму редактирования профиля submitProfileForm
const editProfilePopup = new PopupWithForm('.popup_profile-edit', submitProfileForm);
editProfilePopup.setEventListeners();

//форма подтвержает удаление карточки
const confirmPopup = new PopupWithConfirm('.popup_card-delete');
confirmPopup.setEventListeners();

//модалка аватар
const avatarPopup = new PopupWithForm('.popup_avatar-edit', submitAvatarEditModal);
avatarPopup.setEventListeners();

//Обработчики событий
profileOpenButton.addEventListener('click', () => {

    const data = userInfo.getUserInfo();
    nameInput.value = data.name
    jobInput.value = data.job

    formValidators['profile-form'].resetValidation();
    editProfilePopup.open();
});

openCardEditModal.addEventListener('click', () => {

    formValidators['edit-card'].resetValidation();
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
//рендерим секцию карточек
//cardsSection.renderItems();