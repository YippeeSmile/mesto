//функция открытия модалки
export const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//функция закрытия модалки
export const closePopup = (modal) => {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

//функция закрытия модалки по Escape
export const closePopupEsc = (event) => {
    if (event.keyCode === 27 || event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}