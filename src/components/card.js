import { cardTemplate } from './constants.js';
import { showPhoto } from './modal.js';
import { user } from './index.js';

export function deleteCard(cardElement) {
  cardElement.remove();
  cardElement = null;
}

export function likeCard(cardElement, user, likes) {
  const likeButton = cardElement.querySelector('.card__like-icon');
  const likeCounter = cardElement.querySelector('.card__likes-counter');
  if(!(likeButton.classList.contains('card__like-icon_like'))) {
    likeButton.classList.add('card__like-icon_like');
    likeCounter.textContent = likes.length;
  } else {
    likeButton.classList.remove('card__like-icon_like');
    likeCounter.textContent = likes.length;
  }
}

export function createCard(res, cardId, handlerLikeClick, removeCard) {
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

  res.likes.forEach((item) => {
    if(item._id === user.id) {
      likeButton.classList.add('card__like-icon_like');
    }
  })

  if(res.owner._id !== user.id) {
    deleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => {
    showPhoto(res);
  });
  likeButton.addEventListener('click', () => {
    handlerLikeClick(res._id, cardElement);
  });
  deleteButton.addEventListener('click', () => {
    removeCard(res._id, cardElement);
  });

  return cardElement;
}
