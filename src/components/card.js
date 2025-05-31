export {createCard}
// @todo: Функция создания карточки
const createCard = (
  cardTitle = 'затычкатайтла',
  cardImage = '#',
  deleteCallback
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = cardTitle;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', (evt) => deleteCallback(cardElement));
  return cardElement;
};