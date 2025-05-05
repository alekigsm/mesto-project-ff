// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list')

// @todo: Функция создания карточки
function addCard ( cardTitle = "затычкатайтла" ,cardImage = "#"){
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
cardElement.querySelector('.card__title').textContent = cardTitle;
cardElement.querySelector('.card__image').src = cardImage;
placesList.append(cardElement)
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
  addCard(card.name, card.link); // Передаём image и title из объекта
});