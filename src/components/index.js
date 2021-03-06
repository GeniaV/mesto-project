import '../pages/index.css';
import { enableValidation, enableButton, disableButton, cleanErrors, validationConfig } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { formElement, profileName, nameInput, profileProfession, jobInput, popupProfile, popupUpdateAvatar,
         formElementAvatar, popupAvatarLinkInput, formElementCard, placeInput, linkInput, popupNewCards,
         avatar, placesGallery } from './constants.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { getProfileInfoFromServer, getInitialCards, addNewCards, updateProfile, updateProfilePhoto, deleteĐˇardfromServer, addLike, deleteLike } from './api.js';
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

// Đ”ĐľĐ±Đ°Đ˛Đ»ĐµĐ˝Đ¸Đµ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐµĐş ĐżĐľĐ»ŃŚĐ·ĐľĐ˛Đ°Ń‚ĐµĐ»ĐµĐĽ
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
    console.log('ĐžŃ?Đ¸Đ±ĐşĐ° Đ´ĐľĐ±Đ°Đ˛Đ»ĐµĐ˝Đ¸ŃŹ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ Đ˝Đ° Ń?ĐµŃ€Đ˛ĐµŃ€', err.message);
  })
  .finally(() => {
    renderLoading(popupNewCards, false)
  })
  disableButton(popupNewCards, validationConfig);
}

//Đ ĐµĐ´Đ°ĐşŃ‚Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ ĐżŃ€ĐľŃ„Đ¸Đ»ŃŹ
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
    console.log('ĐžŃ?Đ¸Đ±ĐşĐ° Ń€ĐµĐ´Đ°ĐşŃ‚Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸ŃŹ ĐżŃ€ĐľŃ„Đ¸Đ»ŃŹ', err.message);
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
    console.log('ĐžŃ?Đ¸Đ±ĐşĐ° Ń€ĐµĐ´Đ°ĐşŃ‚Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸ŃŹ Ń„ĐľŃ‚Đľ ĐżŃ€ĐľŃ„Đ¸Đ»ŃŹ', err.message);
  })
  .finally(() => {
    renderLoading(popupUpdateAvatar, false);
  })
}

export function removeCard(cardId, cardElement) {
  deleteĐˇardfromServer(cardId)
  .then((res) => {
    deleteCard(cardElement)
  })
  .catch(err => {
    console.log('ĐžŃ?Đ¸Đ±ĐşĐ° Ń?Đ´Đ°Đ»ĐµĐ˝Đ¸ŃŹ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸', err.message);
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
      console.log('ĐžŃ?Đ¸Đ±ĐşĐ° ĐżŃ€ĐľŃ?Ń‚Đ˛Đ»ĐµĐ˝Đ¸ŃŹ Đ»Đ°ĐąĐşĐ°', err.message);
    })
  } else {
    deleteLike(cardId)
    .then(res => {
      likeCard(cardElement, res.likes);
    })
    .catch(err => {
      console.log('ĐžŃ?Đ¸Đ±ĐşĐ° Ń?Đ´Đ°Đ»ĐµĐ˝Đ¸ŃŹ Đ»Đ°ĐąĐşĐ°', err.message);
    })
  }
}

//ĐźĐľĐ»Ń?Ń‡ĐµĐ˝Đ¸Đµ Đ´Đ°Đ˝Đ˝Ń‹Ń… ĐżĐľĐ»ŃŚĐ·ĐľĐ˛Đ°Ń‚ĐµĐ»ŃŹ, Đ° Đ·Đ°Ń‚ĐµĐĽ ĐżĐľĐ»Ń?Ń‡ĐµĐ˝Đ¸Đµ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐµĐş
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
  console.log('ĐžŃ?Đ¸Đ±ĐşĐ° Đ´ĐľĐ±Đ°Đ˛Đ»ĐµĐ˝Đ¸ŃŹ ĐżĐľĐ»ŃŚĐ·ĐľĐ˛Đ°Ń‚ĐµĐ»ŃŹ Đ¸ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐµĐş ', err.message);
})
