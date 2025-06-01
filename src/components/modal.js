function openModal(popupModal) {
  popupModal.classList.add('popup_is-opened');
}

function closeModal(closeModal) {
  closeModal.classList.remove('popup_is-opened');
  closeModal.classList.add('popup_is-animated');
}

function initModal(popupEdit) {
  const popupClose = popupEdit.querySelector('.popup__close');
  popupClose.addEventListener('click', function (evt) {
    closeModal(popupEdit);
  });
  document.addEventListener('click', function (evt) {
    if (
      popupEdit.classList.contains('popup_is-opened') &&
      evt.target === popupEdit
    ) {
      closeModal(popupEdit);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closeModal(popupEdit);
    }
  });
}

export { closeModal, openModal, initModal };
