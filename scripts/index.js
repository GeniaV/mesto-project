// Открытие и закрытие попапов
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');
let popupNewCards = document.querySelector('.popup.popup_type_new-card');
let closeButtonPopupNewCards = document.querySelector('.popup__close-button.popup__close-button_type_new-card');
let closeButtonImage = document.querySelector('.popup__close-button.popup__close-button_type__image');
let popupImage = document.querySelector('.popup.popup_type_image');
const popupPhoto = document.querySelector('.popup__photo-large');
const popupPhotoCaption = document.querySelector('.popup__photo-caption');


// Функция открытия попапа
function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
}

editButton.addEventListener('click', () => openPopup(popup));
addButton.addEventListener('click', () => openPopup(popupNewCards));

// Функция закрытия попапа
function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
}

closeButton.addEventListener('click', () => closePopup(popup));
closeButtonPopupNewCards.addEventListener('click', () => closePopup(popupNewCards));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

// Редактирование полей попапа, отражение изменений на странице
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#profile-name')
const jobInput = formElement.querySelector('#profile-profession');

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

const placesGallery = document.querySelector('.places-gallery');
const cardTemplate = document.querySelector('#card-template').content; // Обратились к содержимому

// Шесть карточек «из коробки»
const initialCards = [
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

function createCard(name, link) {
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

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

const newCard = initialCards.map((item) => {
  return createCard(item.name, item.link);
});

placesGallery.prepend(...newCard);

// Добавление карточек пользователем
const formElementCard = document.querySelector('.popup__form.popup__form_type_new-card');
const placeInput = formElementCard.querySelector('#place-name')
const linkInput = formElementCard.querySelector('#place-link');

function formAddCard (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardName = cardElement.querySelector('.card__name');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-icon');
  const deleteButton = cardElement.querySelector('.card__delete-icon');
  cardName.textContent = placeInput.value;
  cardImage.alt = placeInput.value;
  cardImage.src = linkInput.value;

  function likeCard() {
    likeButton.classList.toggle('card__like-icon_like');
  }

  function showPhoto () {
    openPopup(popupImage);
    popupPhoto.src = cardImage.src;
    popupPhoto.alt = cardImage.alt;
    popupPhotoCaption.textContent = cardName.textContent;
  }

  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', showPhoto);

  closePopup(popupNewCards);

  placesGallery.prepend(cardElement);
}

formElementCard.addEventListener('submit', formAddCard);

