// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (cardData, onDeleteCard, onLikeCard, onOpenImagePopup) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.alt;

  deleteCardButton.addEventListener('click', () => onDeleteCard(cardElement));
  cardImage.addEventListener('click', () => onOpenImagePopup(cardElement));
  likeButton.addEventListener('click', () => onLikeCard(cardElement));
  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();
// @todo: Функция добавления/удаления лайка
const likeCard = (cardElement) => {
  const likeBtn = cardElement.querySelector('.card__like-button');

  if (likeBtn.classList.contains('card__like-button_is-active')) {
    likeBtn.classList.remove('card__like-button_is-active');
  } else {
    likeBtn.classList.add('card__like-button_is-active');
  }
};

export { createCard, deleteCard, likeCard };
