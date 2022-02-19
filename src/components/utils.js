import { closePopupByPressEsc } from './modal.js';

// Функция открытия попапа
export function openPopup(popupElement) {
  document.addEventListener('keydown', closePopupByPressEsc);
  popupElement.classList.add('popup_opened');
  cleanErrors(popupElement);
}

// Функция закрытия попапа
export function closePopup(popupElement) {
  document.removeEventListener('keydown', closePopupByPressEsc);
  popupElement.classList.remove('popup_opened');
}

function cleanErrors(popupElement) {
  const input = popupElement.querySelectorAll('.popup__input-style');
  const errorText = popupElement.querySelectorAll('.popup__input-error');
  input.forEach(input => {
    input.classList.remove('popup__input-style_type_error');
  });
  errorText.forEach(errorText => {
    errorText.classList.remove('popup__input-error_active');
  });
}
