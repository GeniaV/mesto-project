// Открытие и закрытие попапов
const popupProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button_type_profile');
const addButton = document.querySelector('.profile__add-button');
const popupNewCards = document.querySelector('.popup_type_new-card');
const closeButtonPopupNewCards = document.querySelector('.popup__close-button_type_new-card');
const closeButtonImage = document.querySelector('.popup__close-button_type__image');
const popupImage = document.querySelector('.popup_type_image');
const popupPhoto = document.querySelector('.popup__photo-large');
const popupPhotoCaption = document.querySelector('.popup__photo-caption');


// Функция открытия попапа
function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
}

editButton.addEventListener('click', function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(popupNewCards);
  placeInput.value = '';
  linkInput.value = '';
});

// Функция закрытия попапа
function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
}

closeButton.addEventListener('click', () => closePopup(popupProfile));
closeButtonPopupNewCards.addEventListener('click', () => closePopup(popupNewCards));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

// Редактирование полей попапа, отражение изменений на странице
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#profile-name')
const jobInput = formElement.querySelector('#profile-profession');

function editProfile (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
}

formElement.addEventListener('submit', editProfile);

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
const formElementCard = document.querySelector('.popup__form_type_new-card');
const placeInput = formElementCard.querySelector('#place-name')
const linkInput = formElementCard.querySelector('#place-link');

function addCard (evt) {
  evt.preventDefault();

  placesGallery.prepend(createCard(placeInput.value, linkInput.value));

  closePopup(popupNewCards)
}

formElementCard.addEventListener('submit', addCard);

