//Импорты
import '../pages/index.css';
import { openPopup, closePopup } from './utils.js';
import { enableValidation, enableButton, disableButton } from './validate.js';
import { editProfile, updateAvatar, cleanErrors } from './modal.js';
import { formElement, profileName, nameInput, profileProfession, jobInput, popupProfile, popupUpdateAvatar,
         formElementAvatar, popupAvatarLinkInput, formElementCard, placeInput, linkInput, popupNewCards,
         avatar, placesGallery } from './constants.js';
import { addCard, createCard } from './card.js';
import { getProfileInfoFromServer, getInitialCards } from './api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarUpdateContainer = document.querySelector('.profile__avatar-container');

editButton.addEventListener('click', function() {
  cleanErrors(popupProfile);
  enableButton(popupProfile);
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
  disableButton(popupUpdateAvatar);
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

//Получение аватара с сервера
getProfileInfoFromServer()
  .then(data => {
    avatar.src = data.avatar;
    profileName.textContent = data.name;
    profileProfession.textContent = data.about;
  })
  .catch(err => {
    console.log('Ошибка при загрузке аватара', err.message);
  })

// Получение карточек с сервера
getInitialCards()
.then(data => {
  const newCard = data.map((item) => {
    return createCard(item);
  })
  placesGallery.prepend(...newCard);
})
.catch(err => {
  console.log('Ошибка при загрузке карточек', err.message);
})

