// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
import { closeModal, openModal, initModal } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
initModal(popupEdit);

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const profileAddButton = document.querySelector('.profile__add-button');

const imagePopupContainer = document.querySelector('.popup_type_image');
initModal(imagePopupContainer);

const popupNewCard = document.querySelector('.popup_type_new-card');
initModal(popupNewCard);

const profileInfoInputName = popupEdit.querySelector('.popup__input_type_name');
const profileInfoInputDescription = popupEdit.querySelector(
  '.popup__input_type_description'
);

const popupImage = imagePopupContainer.querySelector('.popup__image');
const popupCaption = imagePopupContainer.querySelector('.popup__caption');

// работа с формой
// Находим форму в DOM
const formElementEditProfile = document.forms['edit-profile']; //document.querySelector(#edit-profile)
// Находим поля формы в DOM
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;
const newForm = document.forms['new-place'];
const newNameInput = newForm.elements['place-name'];
const newLinkInput = newForm.elements['link'];

function openImagePopup(cardElement) {
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__title').textContent;
  popupImage.src = cardImageElement.src;
  popupImage.alt = cardImageElement.alt;
  popupCaption.textContent = cardCaption;
  openModal(imagePopupContainer);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, likeCard, openImagePopup);
  placesList.append(cardElement);
});

// откр. закр редактора карточки

profileEditButton.addEventListener('click', function (evt) {
  /*   const title = document.querySelector('.profile__title').textContent;
  const description = document.querySelector(
    '.profile__description'
  ).textContent;  уже получал*/
  profileInfoInputName.value = profileName.textContent;
  profileInfoInputDescription.value = profileJob.textContent;
  openModal(popupEdit);
  evt.stopPropagation();
});

// откр. закр через  +

newForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardData = { name: newNameInput.value, link: newLinkInput.value };
  const cardElement = createCard(
    cardData,
    deleteCard,
    likeCard,
    openImagePopup
  );
  placesList.prepend(cardElement);
  newForm.reset();
  closeModal(popupNewCard);
});

profileAddButton.addEventListener('click', (evt) => {
  openModal(popupNewCard);
  evt.stopPropagation();
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
