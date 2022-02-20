import { closePopupByPressEsc } from './modal.js';

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

