import { openPopup } from './utils.js';
import { closePopup } from './utils.js';

export const popupPhoto = document.querySelector('.popup__photo-large');
export const cardTemplate = document.querySelector('#card-template').content; // Обратились к содержимому
export const popupPhotoCaption = document.querySelector('.popup__photo-caption');
const popupImage = document.querySelector('.popup_type_image');

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function createCard(name, link, likes) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона
  const deleteButton = cardElement.querySelector('.card__delete-icon'); // Объявили кнопку удаления (иконка корзина)
  const likeButton = cardElement.querySelector('.card__like-icon'); // Объявили кнопку лайк
  const cardName = cardElement.querySelector('.card__name'); // Обявили имя карточки
  const cardImage = cardElement.querySelector('.card__image'); // Объявили фото картоки
  const likeCounter = cardElement.querySelector('.card__likes-counter');

  cardName.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  likeCounter.textContent = likes.length;

  function likeCard() {
    let length = likeCounter.textContent.length;
     if(!(likeButton.classList.contains('card__like-icon_like'))) {
      likeButton.classList.add('card__like-icon_like');
      likeCounter.textContent = length;
    } else {
      likeButton.classList.remove('card__like-icon_like');
      likeCounter.textContent = length - 1;
    }
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

export const formElementCard = document.querySelector('.popup__form_type_new-card');
export const placesGallery = document.querySelector('.places-gallery');
export const placeInput = formElementCard.querySelector('#place-name')
export const linkInput = formElementCard.querySelector('#place-link');
export const popupNewCards = document.querySelector('.popup_type_new-card');

// Добавление карточек пользователем
export function addCard (evt) {
  evt.preventDefault();

  addNewCards({
    name: placeInput.value,
    link: linkInput.value,
    likes: likeCounter.textContent
  })
  .then(res => {
    placesGallery.prepend(createCard(placeInput.value, linkInput.value, likeCounter.textContent));
  })
  .catch(err => {
    console.log('Ошибка добавления карточки на сервер', err.message);
  })

  closePopup(popupNewCards);
  const buttonElement = popupNewCards.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.disabled = true;
}

// Получение карточек с сервера
import { getInitialCards } from './api.js';
getInitialCards()
.then(data => {
  const newCard = data.map((item) => {
    return createCard(item.name, item.link, item.likes);
  })
  placesGallery.prepend(...newCard);
})
.catch(err => {
  console.log('Ошибка при загрузке карточек', err.message);
})
