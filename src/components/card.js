// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  deleteCardButton.addEventListener('click', () => onDeleteCard(cardElement));
  cardImage.addEventListener('click', () => onOpenImagePopup(cardData));
  likeButton.addEventListener('click', () => onLikeCard(likeButton));
  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();
// @todo: Функция добавления/удаления лайка

const likeCard = (likeButton) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
};

export { createCard, deleteCard, likeCard };
