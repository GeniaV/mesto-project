const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarUpdateContainer = document.querySelector('.profile__avatar-container');

editButton.addEventListener('click', function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  const buttonElement = popupProfile.querySelector('.popup__button');
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.disabled = false;
});

addButton.addEventListener('click', function() {
  openPopup(popupNewCards);
  placeInput.value = '';
  linkInput.value = '';
});

closeButton.addEventListener('click', () => closePopup(popupProfile));
closeButtonPopupNewCards.addEventListener('click', () => closePopup(popupNewCards));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

formElement.addEventListener('submit', editProfile);

placesGallery.prepend(...newCard);

formElementCard.addEventListener('submit', addCard);

document.addEventListener('click', closePopupByClickOnOverlay);

// Попап Обновить аватар
closeButtonUpdateAvatar.addEventListener('click', () => closePopup(popupUpdateAvatar));

avatarUpdateContainer.addEventListener('click', function() {
  openPopup(popupUpdateAvatar);
});

formElementAvatar.addEventListener('submit', updateAvatar);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-style',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-style_type_error',
  errorClass: 'popup__input-error_active'
});

//Импорты
import { openPopup } from './utils.js';
import { closePopup } from './utils.js';
import { showInputError } from './validate.js';
import { hideInputError } from './validate.js';
import { isValid } from './validate.js';
import { hasInvalidInput } from './validate.js';
import { toggleButtonState } from './validate.js';
import { setEventListeners } from './validate.js';
import { enableValidation } from './validate.js';
import { formElement } from './modal.js';
import { profileName } from './modal.js';
import { nameInput } from './modal.js';
import { profileProfession } from './modal.js';
import { jobInput } from './modal.js';
import { popupProfile } from './modal.js';
import { popupImage } from './modal.js';
import { closeButton } from './modal.js';
import { closeButtonPopupNewCards } from './modal.js';
import { closeButtonImage } from './modal.js';
import { closeButtonUpdateAvatar } from './modal.js';
import { editProfile } from './modal.js';
import { popupUpdateAvatar } from './modal.js';
import { formElementAvatar } from './modal.js';
import { popupAvatarLinkInput } from './modal.js';
import { avatar } from './modal.js';
import { updateAvatar } from './modal.js';
import { closePopupByClickOnOverlay } from './modal.js';
import { closePopupByPressEsc } from './modal.js';
import { showPhoto } from './modal.js';
import { popupPhoto } from './card.js';
import { cardTemplate } from './card.js';
import { popupPhotoCaption } from './card.js';
import { initialCards } from './card.js';
import { deleteCard } from './card.js';
import { createCard } from './card.js';
import { newCard } from './card.js';
import { formElementCard } from './card.js';
import { placesGallery } from './card.js';
import { placeInput } from './card.js';
import { linkInput } from './card.js';
import { popupNewCards } from './card.js';
import { addCard } from './card.js';
