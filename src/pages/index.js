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
import './index.css';
import { openPopup } from '../components/utils.js';
import { closePopup } from '../components/utils.js';
import { showInputError } from '../components/validate.js';
import { hideInputError } from '../components/validate.js';
import { isValid } from '../components/validate.js';
import { hasInvalidInput } from '../components/validate.js';
import { toggleButtonState } from '../components/validate.js';
import { setEventListeners } from '../components/validate.js';
import { enableValidation } from '../components/validate.js';
import { formElement } from '../components/modal.js';
import { profileName } from '../components/modal.js';
import { nameInput } from '../components/modal.js';
import { profileProfession } from '../components/modal.js';
import { jobInput } from '../components/modal.js';
import { popupProfile } from '../components/modal.js';
import { popupImage } from '../components/modal.js';
import { closeButton } from '../components/modal.js';
import { closeButtonPopupNewCards } from '../components/modal.js';
import { closeButtonImage } from '../components/modal.js';
import { closeButtonUpdateAvatar } from '../components/modal.js';
import { editProfile } from '../components/modal.js';
import { popupUpdateAvatar } from '../components/modal.js';
import { formElementAvatar } from '../components/modal.js';
import { popupAvatarLinkInput } from '../components/modal.js';
import { avatar } from '../components/modal.js';
import { updateAvatar } from '../components/modal.js';
import { closePopupByClickOnOverlay } from '../components/modal.js';
import { closePopupByPressEsc } from '../components/modal.js';
import { showPhoto } from '../components/modal.js';
import { popupPhoto } from '../components/card.js';
import { cardTemplate } from '../components/card.js';
import { popupPhotoCaption } from '../components/card.js';
import { initialCards } from '../components/card.js';
import { deleteCard } from '../components/card.js';
import { createCard } from '../components/card.js';
import { newCard } from '../components/card.js';
import { formElementCard } from '../components/card.js';
import { placesGallery } from '../components/card.js';
import { placeInput } from '../components/card.js';
import { linkInput } from '../components/card.js';
import { popupNewCards } from '../components/card.js';
import { addCard } from '../components/card.js';
