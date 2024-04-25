
// @todo: Темплейт карточки

import {cardTemplate} from '../index.js';

// Функция создания карточки

export function createCard(name, link, delCard, like) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const delBtn = cardElement.querySelector('.card__delete-button');
  
  
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;

  delBtn.addEventListener('click', delCard);

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