import { closePopupByPressEsc } from './modal.js';
import { cleanErrors } from './modal.js';

// Функция открытия попапа
export function openPopup(popupElement) {
  document.addEventListener('keydown', closePopupByPressEsc);
  popupElement.classList.add('popup_opened');
  if(popupElement.contains(popupElement.querySelector('.popup__form'))) {
    cleanErrors(popupElement);
  }
}
// Функция закрытия попапа
export function closePopup(popupElement) {
  document.removeEventListener('keydown', closePopupByPressEsc);
  popupElement.classList.remove('popup_opened');
}

