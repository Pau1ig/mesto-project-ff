import { like } from "./card.js";
import { closePopup } from "./modal.js";
import { renderCard, delCard } from "./card.js";

export const profileForm = document.forms.edit_profile;
export const nameInput = profileForm.elements.name;
export const descriptionInput = profileForm.elements.description;
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const profileFormAvatar = document.forms.edit_avatar;
export const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
export const cardForm = document.forms.new_place;
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const profileAvatar = document.querySelector('.profile__image');
const linkInputAvatar = profileFormAvatar.elements.link;
const placeNameInput = cardForm.elements.place_name;
const linkInput = cardForm.elements.link;


const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '77b87e4d-b390-4e14-8b80-4ec91748b902',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function pushUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: descriptionInput.value
    })
  });
}

function pushAvatarData() {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkInputAvatar.value
    })
  });
}

function pushCardData() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeNameInput.value,
      link: linkInput.value
    })
  });
}

function userData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res);
  })
}


const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
};

const promises = [userData(), getInitialCards()];

export const renderAllData = () => {
  Promise.all(promises)
    .then((res) => {
      const userData = res[0];
      const cardData = res[1];

      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style["background-image"] = `url(${userData.avatar})`;
      
      cardData.forEach((item) => {
        const isThisCardMy = item.owner._id === userData._id;
        renderCard(item, "append", isThisCardMy, hasMyLike(userData, item));
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

// Есть ли лайк пользователя на карточке

function hasMyLike(user, cardItem) {
  const cardLikes = cardItem.likes;
  if(cardLikes.length > 0) {
    return cardLikes.some((like) => {
      return like._id === user._id
    })
  } else {
    return false
  }
}

// Поставить лайк

export function toLike(evt) {
  const idCardValue = evt.target.closest('.places__item').querySelector('.card__id').textContent;

  return fetch(`${config.baseUrl}/cards/likes/${idCardValue}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res)
    })
    .then((res) => {
      evt.target.closest('.places__item').querySelector('.card__like_count').textContent = res.likes.length;
      like(evt);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Удалить лайк

export function toDislike(evt) {
  const idCardValue = evt.target.closest('.places__item').querySelector('.card__id').textContent;

  return fetch(`${config.baseUrl}/cards/likes/${idCardValue}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res)
    })
    .then((res) => {
      evt.target.closest('.places__item').querySelector('.card__like_count').textContent = res.likes.length;
      like(evt);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Запрос на удаление карточки с сервера

export const delCardServer = (evt) => {
  const idCardValue = evt.target.closest('.places__item').querySelector('.card__id').textContent;
  console.log(idCardValue);
  return fetch(`${config.baseUrl}/cards/${idCardValue}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res)
    })
    .then(() => {
      delCard(evt)
    })
    .catch((err) => {
      console.log(err);
    });
}

// Изменение состояния кнопки Сохранить

function renderLoading(isLoading, evt) {
  const button = evt.target.querySelector('.popup__button');

  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

//Функция отправки формы профиля

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  pushUserData()
    .then(res => {
      return getResponseData(res);
    })
    .then ((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt)
    });
  closePopup(popupTypeEdit);
};

//Функция отправки формы аватара

export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt)
  pushAvatarData()
    .then(res => {
      return getResponseData(res);
    })
    .then ((data) => {
      profileAvatar.style["background-image"] = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt)
    });
  profileFormAvatar.reset();
  closePopup(popupTypeEditAvatar);
};

//Функция отправки формы новой карточки

export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  pushCardData()
  .then(res => {
    return getResponseData(res);
  })
    .then ((data) => {
      renderCard(data, "prepend", "true");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt)
    });
  cardForm.reset();
  closePopup(popupTypeNewCard);
};