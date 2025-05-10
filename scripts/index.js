// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardTitle = 'затычкатайтла', cardImage = '#', deleteCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', function (evt) {
      deleteCallback(cardElement);
    });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardElement = addCard(card.name, card.link, deleteCard);
  placesList.append(cardElement);
});
