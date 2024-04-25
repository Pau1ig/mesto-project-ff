import {newCardWindow, nameInput, descriptionInput, profileName, profileDescription, profileWindow, popupImage, imageCaptionPopup, popupTypeImage} from '../index.js'

// Функция отрытия попапа

export function openPopup(evt) {

  if (evt.target.classList.contains('profile__edit-button')) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    profileWindow.classList.add('popup_is-opened');
  } 
  if (evt.target.classList.contains('profile__add-button')) {
    newCardWindow.classList.add('popup_is-opened');
  }
  if (evt.target.classList.contains('card__image')) {
    const cardImage = evt.target.closest('.card__image');

    popupImage.src = cardImage.src;
    imageCaptionPopup.textContent = cardImage.alt;
    popupTypeImage.classList.add('popup_is-opened');
  }
};

// Функция закрытия попапа

export function closePopup(evt) {

  const popup = evt.target.closest('.popup');

  if ((evt.target.classList.contains('popup__close')) || (evt.target.classList.contains('button'))) {
    popup.classList.remove('popup_is-opened');
  }
};

// Функция закрытия попапа по клавише Esc

export function closePopupEsc(evt) {
  const popupIsOpened = document.querySelector('.popup_is-opened');

  if (evt.key === 'Escape' && popupIsOpened) {
    popupIsOpened.classList.remove('popup_is-opened');
  }
};

// Функция закрытия попапа по клику на задний фон

export function closeOnBackDropClick({target}) {
  const popupIsOpened = document.querySelector('.popup_is-opened');
  const isClickedOnBackDrop = target === popupIsOpened;
  if (isClickedOnBackDrop) {
    popupIsOpened.classList.remove('popup_is-opened');
  }
};