import { openPopup, closePopup } from './utils.js';
import { getProfileInfoFromServer, updateProfile, updateProfilePhoto } from './api.js';
import { formElement, profileName, nameInput, profileProfession, jobInput, popupProfile, popupImage,
  popupUpdateAvatar, popupAvatarLinkInput, avatar, popupPhoto } from './constants.js';

export function editProfile(evt) {
  evt.preventDefault();
  const buttonElement = formElement.querySelector('.popup__button');
  buttonElement.textContent = 'Сохранение...';
  updateProfile({
    name: nameInput.value,
    about: jobInput.value
  })
  .then(res => {
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
  })
  .catch(err => {
    console.log('Ошибка редактирования профиля', err.message);
  })
  .finally(() => {
    buttonElement.textContent = 'Сохранить';
  })
  closePopup(popupProfile);
}

export function updateAvatar(evt) {
  evt.preventDefault();
  const buttonElement = popupUpdateAvatar.querySelector('.popup__button');
  buttonElement.textContent = 'Сохранение...';
  updateProfilePhoto({
    avatar: popupAvatarLinkInput.value
  })
  .then(res => {
    avatar.src = popupAvatarLinkInput.value;
  })
  .catch(err => {
    console.log('Ошибка редактирования фото профиля', err.message);
  })
  .finally(() => {
    buttonElement.textContent = 'Сохранить';
  })
  closePopup(popupUpdateAvatar);
}

export function showPhoto () {
  openPopup(popupImage);
  popupPhoto.src = cardImage.src;
  popupPhoto.alt = cardImage.alt;
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



