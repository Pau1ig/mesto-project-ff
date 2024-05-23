import { openPopup } from "./modal";
import { delCardServer, toLike, toDislike } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const imageCaptionPopup = document.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');
const placesList = document.querySelector('.places__list');

// Функция создания карточки

export function createCard(name, link, likes, isThisCardMy, idCard, myLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const delBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like_count');
  const cardId = cardElement.querySelector('.card__id');
  cardId.textContent = idCard;

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeCount.textContent = likes.length;

  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    imageCaptionPopup.textContent = name;
    openPopup(popupTypeImage);
  });

  if(myLike) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  };

  if(isThisCardMy) {
    delBtn.addEventListener('click', delCardServer);
  } else {
    delBtn.style["display"] = "none";
    delBtn.removeEventListener('click', delCardServer);
  };

  // delBtn.addEventListener('click', delCardServer);
  cardLikeBtn.addEventListener('click', toggleLikeButtonState);
  
  return cardElement;
};

// Рендеринг карточки

export function renderCard(element, method, verify, myLike) {
  const card = createCard(element.name, element.link, element.likes, verify, element._id, myLike);
  placesList[ method ](card);
};

// Функция удаления карточки со страницы

export function delCard(evt) {
  evt.target.closest('.places__item').remove(); 
};

// Переключение визуальных состояний кнопки лайка

export function like(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Состояние кнопки лайк

export function toggleLikeButtonState(evt) {
  if(evt.target.classList.contains('card__like-button_is-active')) {
    toDislike(evt)
  } else {
    toLike(evt)
  }
};
