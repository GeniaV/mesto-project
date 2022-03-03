import { openPopup } from './utils.js';
import { addLike, deleteLike, getProfileInfoFromServer, deleteСardfromServer } from './api.js';
import { popupPhoto, cardTemplate, popupPhotoCaption, popupImage } from './constants.js';

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function createCard(res) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // Клонируем содержимое шаблона
  const deleteButton = cardElement.querySelector('.card__delete-icon'); // Объявили кнопку удаления (иконка корзина)
  const likeButton = cardElement.querySelector('.card__like-icon'); // Объявили кнопку лайк
  const cardName = cardElement.querySelector('.card__name'); // Обявили имя карточки
  const cardImage = cardElement.querySelector('.card__image'); // Объявили фото картоки
  const likeCounter = cardElement.querySelector('.card__likes-counter');

  cardName.textContent = res.name;
  cardImage.alt = res.name;
  cardImage.src = res.link;
  likeCounter.textContent = res.likes.length;

  getProfileInfoFromServer()
  .then(data => {
    const userId = data._id;
    res.likes.forEach((item) => {
      if(item._id === userId) {
        likeButton.classList.add('card__like-icon_like');
        likeCounter.textContent + 1;
      }
    })
    if(res.owner._id !== userId) {
      deleteButton.style.display = 'none';
    }
  })
  .catch(err => {
    console.log('Ошибка', err.message);
  })

  function likeCard() {
    let length = Number(likeCounter.textContent);
    if(!(likeButton.classList.contains('card__like-icon_like'))) {
      addLike (res._id)
      .then(res => {
        likeButton.classList.add('card__like-icon_like');
        likeCounter.textContent = length + 1;
      })
      .catch(err => {
        console.log('Ошибка проствления лайка', err.message);
      })
     } else {
      deleteLike (res._id)
      .then(res => {
        likeButton.classList.remove('card__like-icon_like');
        likeCounter.textContent = length - 1;
      })
      .catch(err => {
        console.log('Ошибка удаления лайка', err.message);
      })
     }
  }

  function showPhoto () {
    openPopup(popupImage);
    popupPhoto.src = cardImage.src;
    popupPhoto.alt= cardImage.alt;
    popupPhotoCaption.textContent = cardName.textContent;
  }

  cardImage.addEventListener('click', showPhoto);
  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', (evt) => {
    deleteСardfromServer(res._id)
    .then((res) => {
      deleteCard(evt);
    })
    .catch(err => {
      console.log('Ошибка удаления карточки', err.message);
    })
  });

  return cardElement;
}


