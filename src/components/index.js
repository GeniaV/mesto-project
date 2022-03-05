//Импорты
import '../pages/index.css';
import { enableValidation, enableButton, disableButton, cleanErrors } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { formElement, profileName, nameInput, profileProfession, jobInput, popupProfile, popupUpdateAvatar,
         formElementAvatar, popupAvatarLinkInput, formElementCard, placeInput, linkInput, popupNewCards,
         avatar, placesGallery, cardTemplate } from './constants.js';
import { createCard } from './card.js';
import { getProfileInfoFromServer, getInitialCards, addNewCards, updateProfile, updateProfilePhoto } from './api.js';
import { renderLoading } from './utils.js';

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

// Добавление карточек пользователем
export function addCard (evt) {
  evt.preventDefault();
  renderLoading(popupNewCards, true);
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона
  const likeCounter = cardElement.querySelector('.card__likes-counter');
  addNewCards({
    name: placeInput.value,
    link: linkInput.value,
    likes: likeCounter.textContent
  })
  .then(res => {
    placesGallery.prepend(createCard(res));
    closePopup(popupNewCards);
  })
  .catch(err => {
    console.log('Ошибка добавления карточки на сервер', err.message);
  })
  .finally(() => {
    renderLoading(popupNewCards, false)
  })

  disableButton(popupNewCards);
}

//Редактирование профиля
export function editProfile(evt) {
  evt.preventDefault();
  renderLoading(formElement, true);
  updateProfile({
    name: nameInput.value,
    about: jobInput.value
  })
  .then(res => {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
  })
  .catch(err => {
    console.log('Ошибка редактирования профиля', err.message);
  })
  .finally(() => {
    renderLoading(formElement, false);
  })
}

export function updateAvatar(evt) {
  evt.preventDefault();
  renderLoading(popupUpdateAvatar, true);
  updateProfilePhoto({
    avatar: popupAvatarLinkInput.value
  })
  .then(res => {
    avatar.src = popupAvatarLinkInput.value;
    closePopup(popupUpdateAvatar);
  })
  .catch(err => {
    console.log('Ошибка редактирования фото профиля', err.message);
  })
  .finally(() => {
    renderLoading(popupUpdateAvatar, false);
  })
}


