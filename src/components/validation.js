/* const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; */

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
////// работа с формами

// Передадим текст ошибки вторым параметром
const showInputError = (
  popupElement,
  popupInput,
  errorMessage,
  validationConfig
) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  // Остальной код такой же
  popupInput.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (popupElement, popupInput, validationConfig) => {
  // Находим элемент ошибки
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  // Остальной код такой же
  popupInput.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (popupElement, popupInput, validationConfig) => {
  if (popupInput.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity('');
  }
  if (!popupInput.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(
      popupElement,
      popupInput,
      popupInput.validationMessage,
      validationConfig
    );
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(popupElement, popupInput, validationConfig);
  }
};

const setEventListeners = (popupElement, validationConfig) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(
    popupElement.querySelectorAll(validationConfig.inputSelector)
  );
  // Найдём в текущей форме кнопку отправки
  const buttonElement = popupElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(popupElement, inputElement, validationConfig);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      );
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
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//

const enableValidation = (validationConfig) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  // Переберём полученную коллекцию
  formList.forEach((popupElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(popupElement, validationConfig);
  });
};

const clearValidation = (popupElement, validationConfig) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((input) => {
    input.setCustomValidity('');
    hideInputError(popupElement, input, validationConfig);
  });
  const btn = popupElement.querySelector(validationConfig.submitButtonSelector);
  btn.disabled = true;
  btn.classList.add(validationConfig.inactiveButtonClass);
};

export { enableValidation, clearValidation };
