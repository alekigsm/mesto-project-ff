

function openModal (popupModal, title, desc){
  popupModal.querySelector('.popup__input_type_name').value = title;
  popupModal.querySelector('.popup__input_type_description').value = desc;
  popupModal.classList.add('popup_is-opened')
}

function closeModal (closeModal){
  closeModal.classList.remove('popup_is-opened')

}

function initModal (){
const popupTypeEdit = document.querySelector('.popup_type_edit');
document.addEventListener('click', function (evt){
  if(popupTypeEdit.classList.contains('popup_is-opened') && evt.target === popupTypeEdit){
    closeModal(popupTypeEdit)
  }  
  });


document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape'){
    closeModal(popupTypeEdit)
  }
});
}
export { closeModal, openModal, initModal };