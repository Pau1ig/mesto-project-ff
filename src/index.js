
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, delCard, like} from './scripts/card.js';
import {openPopup, closePopup, closePopupEsc,closeOnBackDropClick} from './scripts/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const profileWindow = document.querySelector('.popup_type_edit');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const imageCaptionPopup = document.querySelector('.popup__caption');
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const descriptionInput = document.querySelector('.popup__input_type_description');
export const newCardWindow = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const profileForm = document.getElementById('edit-profile-form');
const cardForm = document.getElementById('new-card-form');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

// Вывести карточки на страницу

initialCards.forEach((element) => {
  placesList.append(createCard(element.name, element.link, delCard));
});

const keyHandler = (evt) => {
  closePopupEsc(evt);
  document.removeEventListener('click', keyHandler);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(createCard(placeNameInput.value, linkInput.value, delCard));
  cardForm.reset();
};

// Обработчики событий

placesList.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    like(evt);
  }
});

document.addEventListener('click', openPopup);
document.addEventListener('click', closePopup);
document.addEventListener('keydown', keyHandler);
document.addEventListener('click', closeOnBackDropClick);
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

