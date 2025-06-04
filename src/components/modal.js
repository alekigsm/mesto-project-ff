function closeModalOnEscape (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

function overlayClick(evt) {
  const popupOpen = document.querySelector('.popup_is-opened');
  if (popupOpen && evt.target === popupOpen) {
    closeModal(popupOpen);
  }
}
function openModal(popupModal) {
  popupModal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEscape );
  document.addEventListener('click', overlayClick);
}

function closeModal(closeModal) {
  closeModal.classList.remove('popup_is-opened');
  closeModal.classList.add('popup_is-animated');
  document.removeEventListener('keydown', closeModalOnEscape );
  document.removeEventListener('click', overlayClick);
}

function setupPopupClose(popupEdit) {
  const popupClose = popupEdit.querySelector('.popup__close');
  popupClose.addEventListener('click', () => {
    closeModal(popupEdit);
  });
}

export { closeModal, openModal, setupPopupClose };
