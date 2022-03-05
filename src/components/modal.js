import { popupImage, popupPhoto, popupPhotoCaption } from './constants.js';

export function showPhoto (res) {
  popupPhoto.src = res.link;
  popupPhoto.alt = res.name;
  popupPhotoCaption.textContent = res.name;
  openPopup(popupImage);
}

export function closePopupByPressEsc(evt) {
  if(evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Функция открытия попапа
export function openPopup(popupElement) {
  document.addEventListener('keydown', closePopupByPressEsc);
  popupElement.classList.add('popup_opened');
}
// Функция закрытия попапа
export function closePopup(popupElement) {
  document.removeEventListener('keydown', closePopupByPressEsc);
  popupElement.classList.remove('popup_opened');
}
