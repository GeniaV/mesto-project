//Валидация форм Редактировать профиль и Новое место
// Функция, которая добавляет класс с ошибкой
export const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
export const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
export const isValid = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

// Поиск невалидного инпута
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Изменение состояния кнопки sumbit при изменения валидности поля
export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

export const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass,...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

export function enableButton(popup) {
  const buttonElement = popup.querySelector('.popup__button');
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.disabled = false;
}

export function disableButton(popup) {
  const buttonElement = popup.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.disabled = true;
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

