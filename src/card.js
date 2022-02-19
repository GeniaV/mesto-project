import { openPopup } from './utils.js';
import { closePopup } from './utils.js';

export const popupPhoto = document.querySelector('.popup__photo-large');
export const cardTemplate = document.querySelector('#card-template').content; // Обратились к содержимому
export const popupPhotoCaption = document.querySelector('.popup__photo-caption');
const popupImage = document.querySelector('.popup_type_image');

// Шесть карточек «из коробки»
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона
  const deleteButton = cardElement.querySelector('.card__delete-icon'); // Объявили кнопку удаления (иконка корзина)
  const likeButton = cardElement.querySelector('.card__like-icon'); // Объявили кнопку лайк
  const cardName = cardElement.querySelector('.card__name'); // Обявили имя карточки
  const cardImage = cardElement.querySelector('.card__image'); // Объявили фото картоки

  cardName.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  // Функция прооставления лайка карточке
  function likeCard() {
    likeButton.classList.toggle('card__like-icon_like');
  }

  // Функция показа фотографии карточки в попапе
  function showPhoto () {
    openPopup(popupImage);
    popupPhoto.src = cardImage.src;
    popupPhoto.alt= cardImage.alt;
    popupPhotoCaption.textContent = cardName.textContent;
  }

  cardImage.addEventListener('click', showPhoto);
  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

export const newCard = initialCards.map((item) => {
  return createCard(item.name, item.link);
});

export const formElementCard = document.querySelector('.popup__form_type_new-card');
export const placesGallery = document.querySelector('.places-gallery');
export const placeInput = formElementCard.querySelector('#place-name')
export const linkInput = formElementCard.querySelector('#place-link');
export const popupNewCards = document.querySelector('.popup_type_new-card');

// Добавление карточек пользователем
export function addCard (evt) {
  evt.preventDefault();
  placesGallery.prepend(createCard(placeInput.value, linkInput.value));
  closePopup(popupNewCards);
  const buttonElement = popupNewCards.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.disabled = true;
}
