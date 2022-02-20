import { openPopup } from './utils.js';
import { closePopup } from './utils.js';

export const formElement = document.querySelector('.popup__form');
export const profileName = document.querySelector('.profile__name');
export const nameInput = formElement.querySelector('#profile-name');
export const profileProfession = document.querySelector('.profile__profession');
export const jobInput = formElement.querySelector('#profile-profession');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupImage = document.querySelector('.popup_type_image');

export function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
}

export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
export const formElementAvatar = document.querySelector('.popup__form_type_update-avatar');
export const popupAvatarLinkInput = formElementAvatar.querySelector('#place-avatarlink');
export const avatar = document.querySelector('.profile__avatar');

export function updateAvatar(evt) {
  evt.preventDefault();
  avatar.src = popupAvatarLinkInput.value;
  closePopup(popupUpdateAvatar);
}

export function showPhoto () {
  openPopup(popupImage);
  popupPhoto.src = cardImage.src;
  popupPhoto.alt= cardImage.alt;
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
