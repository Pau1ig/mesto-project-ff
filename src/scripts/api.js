
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '77b87e4d-b390-4e14-8b80-4ec91748b902',
    'Content-Type': 'application/json'
  }
};

// Подтверждение ответа сервера

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Отправить данные нового пользователя

export function pushUserData(nameInput, descriptionInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: descriptionInput.value
    })
  })
  .then(res => {
    return getResponseData(res);
  })
};

// Отправить данные нового аватара

export function pushAvatarData(linkInputAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkInputAvatar.value
    })
  })
  .then(res => {
    return getResponseData(res);
  })
};

// Отправить данные новой карточки

export function pushCardData(placeNameInput, linkInput) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeNameInput.value,
      link: linkInput.value
    })
  })
  .then(res => {
    return getResponseData(res);
  })
};

// Запрос данных пользователя

export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res);
  })
};

// Запрос карточек

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res);
    })
};

// Запрос поставить лайк

export function toLikeRequest(idCardValue) {
  return fetch(`${config.baseUrl}/cards/likes/${idCardValue}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res)
    })
};

// Запрос убрать лайк

export function toDislikeRequest(idCardValue) {
  return fetch(`${config.baseUrl}/cards/likes/${idCardValue}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res)
    })
};

// Запрос на удаление карточки с сервера

export function delCardRequest(idCardValue){
  return fetch(`${config.baseUrl}/cards/${idCardValue}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      return getResponseData(res)
    })
};

