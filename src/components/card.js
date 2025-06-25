// @todo: Темплейт карточки
import api from './api.js';
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = (
  cardData,
  onDeleteCard,
  onLikeCard,
  onOpenImagePopup,
  ownerId
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const counterLikeCard = cardElement.querySelector('.card__likes_count');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  counterLikeCard.textContent = cardData.likes.length;

  if (
    cardData.likes.some((value) => {
      return value._id === ownerId;
    })
  ) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id === ownerId) {
    deleteCardButton.style = '';
    deleteCardButton.addEventListener('click', () =>
      onDeleteCard(cardElement, cardData._id)
    );
  }
  cardImage.addEventListener('click', () => onOpenImagePopup(cardData));
  likeButton.addEventListener('click', () =>
    onLikeCard(cardData._id, likeButton, counterLikeCard)
  );
  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardElement, cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove(); // 30 не понял
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });
};
// @todo: Функция добавления/удаления лайка

const likeCard = (cardId, likeButton, counterLikeCard) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    api
      .updateLikeCard(cardId, false)
      .then((res) => {
        counterLikeCard.textContent = res.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  } else {
    api
      .updateLikeCard(cardId, true)
      .then((res) => {
        counterLikeCard.textContent = res.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  }
};

export { createCard, deleteCard, likeCard };
