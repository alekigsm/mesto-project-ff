// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = (
  cardTitle = 'затычкатайтла',
  cardImage = '#',
  deleteCallback,
  likeCallback
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = cardTitle;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', (evt) => deleteCallback(cardElement));

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => likeCallback(cardElement));
  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();
const likeCard = (cardElement) => {
  const likeBtn = cardElement.querySelector('.card__like-button');

  if (likeBtn.classList.contains('card__like-button_is-active') === false) {
    likeBtn.classList.add('card__like-button_is-active');
  } else {
    likeBtn.classList.remove('card__like-button_is-active');
  }
};
export { createCard, deleteCard, likeCard };
