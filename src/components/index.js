import '../pages/index.css';
import { enableValidation, enableButton, disableButton, cleanErrors, validationConfig } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { formElement, profileName, nameInput, profileProfession, jobInput, popupProfile, popupUpdateAvatar,
         formElementAvatar, popupAvatarLinkInput, formElementCard, placeInput, linkInput, popupNewCards,
         avatar, placesGallery } from './constants.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { getProfileInfoFromServer, getInitialCards, addNewCards, updateProfile, updateProfilePhoto, deleteСardfromServer, addLike, deleteLike } from './api.js';
import { renderLoading } from './utils.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarUpdateContainer = document.querySelector('.profile__avatar-container');
export const user = {};

editButton.addEventListener('click', function() {
  cleanErrors(popupProfile, validationConfig);
  enableButton(popupProfile, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(popupProfile);
});

addButton.addEventListener('click', function() {
  cleanErrors(popupNewCards, validationConfig);
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
  cleanErrors(popupUpdateAvatar, validationConfig);
  disableButton(popupUpdateAvatar, validationConfig);
  popupAvatarLinkInput.value = '';
  openPopup(popupUpdateAvatar);
});

formElementAvatar.addEventListener('submit', updateAvatar);

enableValidation(validationConfig)

// Добавление карточек пользователем
export function addCard (evt) {
  evt.preventDefault();
  renderLoading(popupNewCards, true);
  addNewCards({
    name: placeInput.value,
    link: linkInput.value,
  })
  .then(res => {
    placesGallery.prepend(createCard(res, user.id, handlerLikeClick, removeCard));
    closePopup(popupNewCards);
  })
  .catch(err => {
    console.log('Ошибка добавления карточки на сервер', err.message);
  })
  .finally(() => {
    renderLoading(popupNewCards, false)
  })
  disableButton(popupNewCards, validationConfig);
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

export function removeCard(cardId, cardElement) {
  deleteСardfromServer(cardId)
  .then((res) => {
    deleteCard(cardElement)
  })
  .catch(err => {
    console.log('Ошибка удаления карточки', err.message);
  })
}

export function handlerLikeClick(cardId, cardElement) {
  const likeButton = cardElement.querySelector('.card__like-icon');
  if(!likeButton.classList.contains('card__like-icon_like')) {
     addLike(cardId)
    .then(res => {
      likeCard(cardElement, res.likes);
    })
    .catch(err => {
      console.log('Ошибка проствления лайка', err.message);
    })
  } else {
    deleteLike(cardId)
    .then(res => {
      likeCard(cardElement, res.likes);
    })
    .catch(err => {
      console.log('Ошибка удаления лайка', err.message);
    })
  }
}

//Получение данных пользователя, а затем получение карточек
Promise.all([getProfileInfoFromServer(), getInitialCards()])
.then(res => {
  avatar.src = res[0].avatar;
  profileName.textContent = res[0].name;
  profileProfession.textContent = res[0].about;
  user.id = res[0]._id;
  const newCard = res[1].map((item) => {
    return createCard(item, user.id, handlerLikeClick, removeCard);
  })
  placesGallery.prepend(...newCard);
})
.catch(err => {
  console.log('Ошибка добавления пользователя и карточек ', err.message);
})
