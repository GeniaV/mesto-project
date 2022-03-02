//Импорты
import '../pages/index.css';
import { openPopup, closePopup } from './utils.js';
import { enableValidation } from './validate.js';
import { editProfile, updateAvatar, cleanErrors } from './modal.js';
import { formElement, profileName, nameInput, profileProfession, jobInput, popupProfile, popupUpdateAvatar,
  formElementAvatar, popupAvatarLinkInput, formElementCard, placeInput, linkInput, popupNewCards } from './constants.js';
import { addCard } from './card.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarUpdateContainer = document.querySelector('.profile__avatar-container');

editButton.addEventListener('click', function() {
  cleanErrors(popupProfile);
  const buttonElement = popupProfile.querySelector('.popup__button');
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.disabled = false;
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupProfile);
});

addButton.addEventListener('click', function() {
  cleanErrors(popupNewCards)
  placeInput.value = '';
  linkInput.value = '';
  openPopup(popupNewCards);
});

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

formElement.addEventListener('submit', editProfile);

formElementCard.addEventListener('submit', addCard);

avatarUpdateContainer.addEventListener('click', function() {
  cleanErrors(popupUpdateAvatar);
  const buttonElement = popupUpdateAvatar.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.disabled = true;
  popupAvatarLinkInput.value = '';
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


