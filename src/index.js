
import './pages/index.css';
import {pushCardData, getUserData, getInitialCards, pushUserData, pushAvatarData} from './scripts/api.js';
import {openPopup, closePopup} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {createCard} from './scripts/card.js';

// Конфигурация валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  inactiveButtonClass: 'popup__button_inactive'
};

const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const btnProfile = document.querySelector('.profile__edit-button');
const btnNewCard = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const imageCaptionPopup = document.querySelector('.popup__caption');
const profileForm = document.forms.edit_profile;
const profileFormAvatar = document.forms.edit_avatar;
const cardForm = document.forms.new_place;
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;
const placeNameInput = cardForm.elements.place_name;
const linkInput = cardForm.elements.link_card;
const linkInputAvatar = profileFormAvatar.elements.link_avatar;
// const avatarForm = document.forms.edit_avatar;


// Изменение состояния кнопки Сохранить

function renderLoading(isLoading, evt) {
  const button = evt.target.querySelector('.popup__button');

  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
};

// Инициализация

const renderAllData = () => {
  const promises = [getUserData(), getInitialCards()];

  Promise.all(promises)
    .then((res) => {
      const userData = res[0];
      const cardData = res[1];

      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style["background-image"] = `url(${userData.avatar})`;
      
      cardData.forEach((item) => {
        renderCard(item, "append", userData._id, zoom);
      })
    })
    .catch((err) => {
      console.log(err);
    });
};

renderAllData();

// Рендеринг карточки

function renderCard(element, method, userId, zoom) {
  const card = createCard(element.name, element.link, element.likes, element._id, userId, element.owner._id, zoom);
  placesList[ method ](card);
};

//Механика закрытия модального окна по клику на фоне и X

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
});

// Функция отправки формы профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  pushUserData(nameInput, descriptionInput)
    .then ((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt)
    });
};

// Функция отправки формы аватара

export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt)
  pushAvatarData(linkInputAvatar)
    .then ((data) => {
      profileAvatar.style["background-image"] = `url(${data.avatar})`;
      closePopup(popupTypeEditAvatar);
      profileFormAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt)
    });
};

enableValidation(validationConfig);

// Функция отправки формы новой карточки

export function handleCardFormSubmit(evt) {
  const promises = [pushCardData(placeNameInput, linkInput), getUserData()];

  evt.preventDefault();
  renderLoading(true, evt);
  Promise.all(promises)
    .then((data) => {
      const newCardData = data[0];
      const userDataUpd = data[1];

      renderCard(newCardData, "prepend", userDataUpd._id, zoom);
      closePopup(popupTypeNewCard);
      cardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt)
    });
};

// Зум картинки

function zoom (name, link, cardImage) {
  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    imageCaptionPopup.textContent = name;
    openPopup(popupTypeImage);
  })
};

// Обработчики событий открытия модальных окон

profileAvatar.addEventListener('click', () => {
  clearValidation(popupTypeEditAvatar.querySelector(validationConfig.formSelector), validationConfig);
  openPopup(popupTypeEditAvatar);
});

btnNewCard.addEventListener('click', () => {
  clearValidation(popupTypeNewCard.querySelector(validationConfig.formSelector), validationConfig);
  openPopup(popupTypeNewCard);
});

btnProfile.addEventListener('click', () => {
  clearValidation(popupTypeEdit.querySelector(validationConfig.formSelector), validationConfig);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});


// Обработчики событий отправки форм

profileFormAvatar.addEventListener('submit', handleAvatarFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);






// function a (formElement) {
//   const inputList = Array.from(formElement)
//   inputList.every(inputElement); {
//     if(inputElement.value.length >= inputElement.minlength) {
//       buttonElement.disabled = 'false'
//   }
// }
// }
