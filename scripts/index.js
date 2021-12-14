//Открытие попапа

const popupOpenButton = document.querySelector('.edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);



// редактирование формы
let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__text');
let jobInput = formElement.querySelector('.form__extra');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let inputs = document.querySelectorAll('input');
    nameInput = inputs[0].value;
    jobInput = inputs[1].value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileElement = document.querySelector('.profile');
    let profileName = profileElement.querySelector('.profile__name');
    let profileJob = profileElement.querySelector('.profile__further');

    // Вставьте новые значения с помощью textContent
    profileName.textContent = `${nameInput}`;
    profileJob.textContent = `${jobInput}`;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const popupSaveButton = document.querySelector('.form__save-button');
popupSaveButton.addEventListener('click', closePopup);