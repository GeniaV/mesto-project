export function renderLoading(popup, isLoading) {
  const buttonElement = popup.querySelector('.popup__button');
  if(isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = buttonElement.value;
  }
}

