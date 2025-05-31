
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
const popupEdit = document.querySelector('.popup_type_edit');
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
  openModal(popupEdit,title,desc);
  evt.stopPropagation();
})
popupClose.addEventListener ('click', function (evt){
  closeModal(popupEdit)
})

// откр. закр через  +
profileAddButton.addEventListener ('click', (evt) => {
  openModal(popupEdit)
  evt.stopPropagation();
})
popupClose.addEventListener ('click', function (evt){
  closeModal(popupEdit)
})

//откр. закр через картинку
popupTypeImage.forEach((image) => {
  image.addEventListener ('click', (evt) => {
  openModal(popupEdit)
  evt.stopPropagation();
})
})

popupClose.addEventListener ('click', function (evt){
  closeModal(popupEdit)
})

initModal()


// Находим форму в DOM
const formElement = document.forms.edit-profile //document.querySelector(#edit-profile)
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

console.log(formElement)
console.log(nameInput, jobInput)
/* // Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); */