
import { delCardRequest, toLikeRequest, toDislikeRequest } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

export function createCard(name, link, cardLikes, idCard, userId, cardOwnerId, zoom) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const delBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like_count');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeCount.textContent = cardLikes.length;

  zoom(name, link, cardImage);

  if(hasMyLike(userId, cardLikes)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  };

  if(cardOwnerId === userId) {
    delBtn.addEventListener('click', event => delCard(event, idCard));
  } else {
    delBtn.style["display"] = "none";
    delBtn.removeEventListener('click', event => delCard(event, idCard));
  };

  cardLikeBtn.addEventListener('click', event => toggleLikeButtonState(event, idCard));
  
  return cardElement;
};

// Есть ли лайк пользователя на карточке

function hasMyLike(userId, cardLikes) {
  if(cardLikes.length > 0) {
    return cardLikes.some((like) => {
      return like._id === userId
    })
  } else {
    return false
  }
};

// Функция удаления карточки со страницы

export function delCard(evt, idCard) {
  delCardRequest(idCard)
  .then(() => {
    evt.target.closest('.places__item').remove();
  })
  .catch((err) => {
    console.log(err);
  });
  
};

// Переключение визуальных состояний кнопки лайка и счетчика

export function toggleLikeCount(res, evt) {
  evt.target.closest('.places__item').querySelector('.card__like_count').textContent = res.likes.length;
  evt.target.classList.toggle('card__like-button_is-active');
}

// Поставить/убрать лайк

export function toggleLikeButtonState(evt, idCardValue) {
  if(evt.target.classList.contains('card__like-button_is-active')) {
    toDislikeRequest(idCardValue)
      .then((res) => {
        toggleLikeCount(res, evt)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    toLikeRequest(idCardValue)
      .then((res) => {
        toggleLikeCount(res, evt)
      })
      .catch((err) => {
        console.log(err);
      });
  }
};