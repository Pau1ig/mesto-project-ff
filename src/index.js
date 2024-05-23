
import './pages/index.css';
import {handleAvatarFormSubmit,
        handleCardFormSubmit,
        handleProfileFormSubmit,
        renderAllData,
        nameInput,
        descriptionInput,
        profileName,
        profileDescription,
        popupTypeEdit,
        profileFormAvatar,
        popupTypeEditAvatar,
        cardForm,
        profileForm,
        profileAvatar,
        popupTypeNewCard} from './scripts/api.js';
import {openPopup} from './scripts/modal.js';
import {enableValidation, clearValidation, validationConfig} from './scripts/validation.js';

const btnProfile = document.querySelector('.profile__edit-button');
const btnNewCard = document.querySelector('.profile__add-button');

renderAllData();
enableValidation();

// Обработчики событий

profileAvatar.addEventListener('click', () => {
  clearValidation(popupTypeEditAvatar.querySelector(validationConfig.formSelector),
    validationConfig
  );
  cardForm.reset();
  openPopup(popupTypeEditAvatar);
});

btnNewCard.addEventListener('click', () => {
  clearValidation(popupTypeNewCard.querySelector(validationConfig.formSelector),
    validationConfig
  );
  cardForm.reset();
  openPopup(popupTypeNewCard);
});

btnProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(
    popupTypeEdit.querySelector(validationConfig.formSelector),
    validationConfig
  )
  openPopup(popupTypeEdit);
});

profileFormAvatar.addEventListener('submit', handleAvatarFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

