// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './scripts/cards.js';
import { closeModal, openModal, initModal } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

initModal(popupEdit);
const profileAddButton = document.querySelector('.profile__add-button');

const popupImg = document.querySelector('.popup_type_image');
initModal(popupImg);

const popupNewCard = document.querySelector('.popup_type_new-card');
initModal(popupNewCard);

function popupImgOpen(cardElement) {
  const cardUrl = cardElement.querySelector('.card__image').src;
  const cardAlt = cardElement.querySelector('.card__image').alt;
  popupImg.querySelector('.popup__image').src = cardUrl;
  popupImg.querySelector('.popup__image').alt = cardAlt;
  const cardCaption = cardElement.querySelector('.card__title').textContent;
  popupImg.querySelector('.popup__caption').textContent = cardCaption;
  openModal(popupImg);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(
    card.name,
    card.link,
    deleteCard,
    likeCard,
    popupImgOpen
  );
  placesList.append(cardElement);
});

const popupTypeImage = document.querySelectorAll('.card__image');

// откр. закр редактора карточки

profileEditButton.addEventListener('click', function (evt) {
  const title = document.querySelector('.profile__title').textContent;
  const desc = document.querySelector('.profile__description').textContent;
  popupEdit.querySelector('.popup__input_type_name').value = title;
  popupEdit.querySelector('.popup__input_type_description').value = desc;
  openModal(popupEdit);
  evt.stopPropagation();
});

// откр. закр через  +

profileAddButton.addEventListener('click', (evt) => {
  openModal(popupNewCard);
  // новое
  const newForm = document.forms['new-place'];
  newForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newName = newForm.elements['place-name'].value;
    const newLink = newForm.elements['link'].value;
    const cardElement = createCard(
      newName,
      newLink,
      deleteCard,
      likeCard,
      popupImgOpen
    );
    placesList.prepend(cardElement);
    closeModal(popupNewCard);
  });
  evt.stopPropagation();
});

// Находим форму в DOM
const formElement = document.forms['edit-profile']; //document.querySelector(#edit-profile)
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
