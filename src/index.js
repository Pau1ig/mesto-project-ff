
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopup} from './scripts/modal.js';
import {createCard, delCard, like} from './scripts/card.js';

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popups = document.querySelectorAll('.popup');
const btnProfile = document.querySelector('.profile__edit-button');
const btnNewCard = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileForm = document.forms.edit_profile;
const cardForm = document.forms.new_place;
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;
const placeNameInput = cardForm.elements.place_name;
const linkInput = cardForm.elements.link;

// Вывод карточек на страницу

initialCards.forEach((item) => {
  renderCard(item, "prepend");
});

function renderCard(element, method) {
  const cardElement = createCard(element.name, element.link, delCard, like);
  placesList[ method ](cardElement);
};

//Функция отправки формы профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
};

//Функция отправки формы новой карточки

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(createCard(placeNameInput.value, linkInput.value, delCard, like));
  cardForm.reset();
  closePopup(popupTypeNewCard);
};

//Механика закрытия модального окна по клику на фоне и X

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
});

// Обработчики событий

btnNewCard.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
});

btnProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);







// const profileForm = document.getElementById('edit-profile-form');
// const cardForm = document.getElementById('new-card-form');
// const nameInput = document.querySelector('.popup__input_type_name');
// const descriptionInput = document.querySelector('.popup__input_type_description');
// const placeNameInput = document.querySelector('.popup__input_type_card-name');
// const linkInput = document.querySelector('.popup__input_type_url');