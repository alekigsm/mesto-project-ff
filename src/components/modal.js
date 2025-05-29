

function openModal (openModal){
  openModal.classList.add('popup_is-opened')
}

function closeModal (closeModal){
  closeModal.classList.remove('popup_is-opened')
}


export { closeModal, openModal };