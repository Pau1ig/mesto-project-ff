// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const placesList = document.querySelector('.places__list');

// Функция создания карточки

function createCard(name, link, delCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;

  delButton.addEventListener('click', delCard);

  return cardElement;
};

// Функция удаления карточки

function delCard(evt) {
  evt.target.closest('.places__item').remove();
};

// Вывести карточки на страницу

initialCards.forEach((element) => {
  let card = createCard(element.name, element.link, delCard);
  placesList.append(card);
});