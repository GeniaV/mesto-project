import { openPopup } from './utils.js';
import { closePopup } from './utils.js';

export const formElement = document.querySelector('.popup__form');
export const profileName = document.querySelector('.profile__name');
export const nameInput = formElement.querySelector('#profile-name');
export const profileProfession = document.querySelector('.profile__profession');
export const jobInput = formElement.querySelector('#profile-profession');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupImage = document.querySelector('.popup_type_image');

export const closeButton = document.querySelector('.popup__close-button_type_profile');
export const closeButtonPopupNewCards = document.querySelector('.popup__close-button_type_new-card');
export const closeButtonImage = document.querySelector('.popup__close-button_type__image');
export const closeButtonUpdateAvatar = document.querySelector('.popup__close-button_type_update-avatar');

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

export function closePopupByClickOnOverlay(popup) {
  popup.addEventListener('click', (event) => {
    if(event.target === popup) {
      closePopup(popup);
    }
  });
}

export const popups = document.querySelectorAll('.popup');

export function closePopupByPressEsc(key) {
  if(key.key === 'Escape') {
    popups.forEach(popup => {
      closePopup(popup);
    });
  }
}

export function showPhoto () {
  openPopup(popupImage);
  popupPhoto.src = cardImage.src;
  popupPhoto.alt= cardImage.alt;
  popupPhotoCaption.textContent = cardName.textContent;
}


