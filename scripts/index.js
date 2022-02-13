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

//Закрытие попапа при клике на overlay

const popups = document.querySelectorAll('.popup');

function closePopupByClickOnOverlay(popup) {
  popup.addEventListener('click', (event) => {
    if(event.target === popup) {
      closePopup(popup);
    }
  });
}

popups.forEach(popup => {
  closePopupByClickOnOverlay(popup);
});

//Закрытие попапа при нажатии Esc
document.addEventListener('keydown', closePopupByPressEsc);

function closePopupByPressEsc(key) {
  if(key.key === 'Escape') {
    popups.forEach(popup => {
      closePopup(popup);
    });
  }
}

// Попап Обновить аватар
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const closeButtonUpdateAvatar = document.querySelector('.popup__close-button_type_update-avatar');
const formElementAvatar = document.querySelector('.popup__form_type_update-avatar');
const popupAvatarLinkInput = formElementAvatar.querySelector('#place-avatarlink');
const avatar = document.querySelector('.profile__avatar');
const avatarUpdateContainer = document.querySelector('.profile__avatar-container');

closeButtonUpdateAvatar.addEventListener('click', () => closePopup(popupUpdateAvatar));

avatarUpdateContainer.addEventListener('click', function() {
  openPopup(popupUpdateAvatar);
});

function updateAvatar(evt) {
  evt.preventDefault();
  avatar.src = popupAvatarLinkInput.value;
  closePopup(popupUpdateAvatar);
}

formElementAvatar.addEventListener('submit', updateAvatar);

//Валидация форм Редактировать профиль и Новое место
// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add('popup__input-style_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove('popup__input-style_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Поиск невалидного инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Изменение состояния кнопки sumbit при изменения валидности поля
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-style'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();







