import { openPopup } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const imageCaptionPopup = document.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');

// Функция создания карточки

export function createCard(name, link, delCard, like) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const delBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    imageCaptionPopup.textContent = name;
    openPopup(popupTypeImage);
  });

  delBtn.addEventListener('click', delCard);
  cardLikeBtn.addEventListener('click', like);
  
  return cardElement;
};

// Функция удаления карточки

export function delCard(evt) {
  evt.target.closest('.places__item').remove(); 
};

// Функция, обрабатывающая события лайка

export function like(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}