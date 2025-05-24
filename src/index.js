
// index.js

import '../pages/index.css'; // добавьте импорт главного файла стилей
import {initialCards} from '../scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

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

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link, deleteCard);
  placesList.append(cardElement);
});
