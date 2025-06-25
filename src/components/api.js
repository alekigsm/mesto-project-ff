const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'cc30cf87-5e95-4f37-b531-4cbe11b441db',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

const updateEditProfile = (nameValue, jobValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue,
    }),
  }).then(checkResponse);
};

const addNewCard = (inputNameFormNewCardValue, inputLinkFormNewCardValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameFormNewCardValue,
      link: inputLinkFormNewCardValue,
    }),
  }).then(checkResponse);
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

const updateLikeCard = (cardId, isLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLike ? 'PUT' : 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

const updateProfileAvatar = (inputLinkAva) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputLinkAva,
    }),
  }).then(checkResponse);
};
export default {
  getCards,
  getProfile,
  updateEditProfile,
  addNewCard,
  deleteCard,
  updateLikeCard,
  updateProfileAvatar,
};
