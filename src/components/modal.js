import { openPopup, closePopup } from './utils.js';
import { popupImage, popupPhoto, popupPhotoCaption } from './constants.js';

export function showPhoto (res) {
  openPopup(popupImage);
  popupPhoto.src = res.link;
  popupPhoto.alt = res.name;
  popupPhotoCaption.textContent = res.name;
}

export function closePopupByPressEsc(evt) {
  if(evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

export function cleanErrors(popupElement) {
  const input = popupElement.querySelectorAll('.popup__input-style');
  const errorText = popupElement.querySelectorAll('.popup__input-error');
  input.forEach(input => {
    input.classList.remove('popup__input-style_type_error');
  });
  errorText.forEach(errorText => {
    errorText.classList.remove('popup__input-error_active');
  });
}
