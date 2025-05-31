
// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей
import {initialCards} from './scripts/cards.js';
import {closeModal, openModal, initModal } from './components/modal.js';
// import {createCard} from './components/card.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupClose = document.querySelector('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');

//

/* const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption'); */

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

const popupTypeImage = document.querySelectorAll('.card__image');



// откр. закр редактора карточки
profileEditButton.addEventListener ('click', function (evt){
  const title = document.querySelector('.profile__title').textContent;
  const desc = document.querySelector('.profile__description').textContent;
  openModal(popupTypeEdit,title,desc);
  evt.stopPropagation();
})
popupClose.addEventListener ('click', function (evt){
  closeModal(popupTypeEdit)
})

// откр. закр через  +
profileAddButton.addEventListener ('click', (evt) => {
  openModal(popupTypeEdit)
  evt.stopPropagation();
})
popupClose.addEventListener ('click', function (evt){
  closeModal(popupTypeEdit)
})

//откр. закр через картинку
popupTypeImage.forEach((image) => {
  image.addEventListener ('click', (evt) => {
  openModal(popupTypeEdit)
  evt.stopPropagation();
})
})

popupClose.addEventListener ('click', function (evt){
  closeModal(popupTypeEdit)
})

initModal()