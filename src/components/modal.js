import { openPopup, closePopup } from './utils.js';
import { popupImage, popupPhoto, popupPhotoCaption } from './constants.js';

export function showPhoto () {
  openPopup(popupImage);
  popupPhoto.src = cardImage.src;
  popupPhoto.alt = cardImage.alt;
  popupPhotoCaption.textContent = cardName.textContent;
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
