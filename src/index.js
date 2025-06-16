// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей
import api from './components/api.js';
import { closeModal, openModal, setupPopupClose } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
setupPopupClose(popupEdit);

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')
const profileAddButton = document.querySelector('.profile__add-button');

const imagePopupContainer = document.querySelector('.popup_type_image');
setupPopupClose(imagePopupContainer);

const popupNewCard = document.querySelector('.popup_type_new-card');
setupPopupClose(popupNewCard);

const profileInfoInputName = popupEdit.querySelector('.popup__input_type_name');
const profileInfoInputDescription = popupEdit.querySelector(
  '.popup__input_type_description'
);

const popupImage = imagePopupContainer.querySelector('.popup__image');
const popupImageCaption = imagePopupContainer.querySelector('.popup__caption');

// работа с формой
// Находим форму в DOM
const formElementEditProfile = document.forms['edit-profile']; //document.querySelector(#edit-profile)
// Находим поля формы в DOM
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;

const newPlaceCardForm = document.forms['new-place'];
const inputNameFormNewCard = newPlaceCardForm.elements['place-name'];
const inputLinkFormNewCard = newPlaceCardForm.elements['link'];


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
enableValidation(validationConfig);

function openImagePopup(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageCaption.textContent = data.name;
  openModal(imagePopupContainer);
}

// @todo: Вывести карточки на страницу
Promise.all([api.getProfile(), api.getCards()])
  .then((results) => {
    profileName.textContent = results[0].name;
    profileJob.textContent = results[0].about;
    profileImage.style = `background-image: url(${results[0].avatar})`;
    results[1].forEach((card) => {
      const cardElement = createCard(card, deleteCard, likeCard, openImagePopup, profileName.textContent);
      placesList.append(cardElement);
    });

    return results
  });


// откр/ редактора карточки
profileEditButton.addEventListener('click', function (evt) {
  profileInfoInputName.value = profileName.textContent;
  profileInfoInputDescription.value = profileJob.textContent;
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
  evt.stopPropagation();
});


// закр через  +
newPlaceCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  api.addNewCard(inputNameFormNewCard.value, inputLinkFormNewCard.value)
    .then((res) => {
      const cardElement = createCard(
        res,
        deleteCard,
        likeCard,
        openImagePopup,
        profileName.textContent
      );
      placesList.prepend(cardElement);
      newPlaceCardForm.reset();
      closeModal(popupNewCard);
    });

});

profileAddButton.addEventListener('click', (evt) => {
  clearValidation(popupNewCard, validationConfig);
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
  api.updateEditProfile(nameValue, jobValue);
  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
