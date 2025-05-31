

function openModal (popupModal, title, desc){
  popupModal.querySelector('.popup__input_type_name').value = title;
  popupModal.querySelector('.popup__input_type_description').value = desc;
  popupModal.classList.add('popup_is-opened')
}

function closeModal (closeModal){
  closeModal.classList.remove('popup_is-opened')

}

function initModal (){
const popupEdit = document.querySelector('.popup_type_edit');
document.addEventListener('click', function (evt){
  if(popupEdit.classList.contains('popup_is-opened') && evt.target === popupEdit){
    closeModal(popupEdit)
  }  
  });


document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape'){
    closeModal(popupEdit)
  }
});
}
export { closeModal, openModal, initModal };