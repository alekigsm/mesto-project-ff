// index.js

import './pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
import { closeModal, openModal, setupPopupClose } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
setupPopupClose(popupEdit);

// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

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

function openImagePopup(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageCaption.textContent = data.name;
  openModal(imagePopupContainer);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, likeCard, openImagePopup);
  placesList.append(cardElement);
});

// откр. закр редактора карточки

profileEditButton.addEventListener('click', function (evt) {
  profileInfoInputName.value = profileName.textContent;
  profileInfoInputDescription.value = profileJob.textContent;
  openModal(popupEdit);
  evt.stopPropagation();
});


////// работа с формами

// Передадим текст ошибки вторым параметром
const showInputError = (popupElement, popupInput, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  // Остальной код такой же
  popupInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (popupElement, popupInput) => {
  // Находим элемент ошибки
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  // Остальной код такой же
  popupInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};


// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (popupElement, popupInput) => {
  console.log('chek', popupInput.id, 'valid', popupInput.validity.valid)
  if (!popupInput.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(popupElement, popupInput, popupInput.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(popupElement, popupInput);
  }
};

const setEventListeners = (popupElement) => {
    // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(popupElement.querySelectorAll(`.popup__input`));
    // Найдём в текущей форме кнопку отправки
  const buttonElement = popupElement.querySelector('.popup__button');
      toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(popupElement, inputElement);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//
// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((popupInput) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !popupInput.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};

//

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((popupElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(popupElement);
  });
};

// Вызовем функцию
enableValidation();

// откр. закр через  +

newPlaceCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardData = {
    name: inputNameFormNewCard.value,
    link: inputLinkFormNewCard.value,
  };
  const cardElement = createCard(
    cardData,
    deleteCard,
    likeCard,
    openImagePopup
  );
  placesList.prepend(cardElement);
  newPlaceCardForm.reset();
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
