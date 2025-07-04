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
// icon
const profileEditIcon = document.querySelector('.profile__edit-icon');

const popupEdit = document.querySelector('.popup_type_edit');
setupPopupClose(popupEdit);

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
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
const formElementEditProfile = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;

const newPlaceCardForm = document.forms['new-place'];
const inputNameFormNewCard = newPlaceCardForm.elements['place-name'];
const inputLinkFormNewCard = newPlaceCardForm.elements['link'];
//// icon form
const popupTypeAva = document.querySelector('.popup_type_ava');
setupPopupClose(popupTypeAva);
const updateAva = document.forms['new-ava'];
const inputLinkAva = updateAva.elements['link'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
enableValidation(validationConfig);

function openImagePopup(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageCaption.textContent = data.name;
  openModal(imagePopupContainer);
}
let userId;
// @todo: Вывести карточки на страницу
Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cardsArray]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style = `background-image: url(${userData.avatar})`;
    cardsArray.forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        likeCard,
        openImagePopup,
        userId
      );
      placesList.append(cardElement);
    });

    // Нет необходимости возвращать данные return results
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });

// откр/ редактора карточки
profileEditButton.addEventListener('click', function (evt) {
  profileInfoInputName.value = profileName.textContent;
  profileInfoInputDescription.value = profileJob.textContent;
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
  evt.stopPropagation();
});

profileEditIcon.addEventListener('click', function (evt) {
  openModal(popupTypeAva);
  clearValidation(popupTypeAva, validationConfig);
  evt.stopPropagation();
});
updateAva.addEventListener('submit', function (evt) {
  evt.preventDefault();
  changeStateSubmitBtn(evt, true);
  api
    .updateProfileAvatar(inputLinkAva.value)
    .then((result) => {
      profileImage.style = `background-image: url(${result.avatar})`;
      updateAva.reset();
      closeModal(popupTypeAva);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      changeStateSubmitBtn(evt, false);
    });
});

// закр через  +
newPlaceCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  changeStateSubmitBtn(evt, true);
  api
    .addNewCard(inputNameFormNewCard.value, inputLinkFormNewCard.value)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        deleteCard,
        likeCard,
        openImagePopup,
        userId
      );
      placesList.prepend(cardElement);
      newPlaceCardForm.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      changeStateSubmitBtn(evt, false);
    });
});

profileAddButton.addEventListener('click', (evt) => {
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
  evt.stopPropagation();
});

//changeStateSubmitBtn button
function changeStateSubmitBtn(evt, load) {
  const submitButton = evt.submitter;
  if (load) {
    submitButton.textContent = 'Сохранение...';
    submitButton.disablaed = true;
  } else {
    submitButton.textContent = 'Сохранить';
    submitButton.disablaed = false;
  }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  changeStateSubmitBtn(evt, true);
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent

  api
    .updateEditProfile(nameValue, jobValue)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    })
    .finally(() => {
      changeStateSubmitBtn(evt, false);
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
