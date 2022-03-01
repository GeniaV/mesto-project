const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '21f5d387-3585-4f45-9a38-eaba49ddcf0b',
    'Content-Type': 'application/json'
  }
}

//Функция парсинга ответа
const parsResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Произошлоа Ошибка: ${res.status}`));
}

// Получение аватара с сервера
export const getProfileInfoFromServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

// Получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

//Добавление новой карточки
export const addNewCards = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({name, link})
  })
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

//Редактирование профиля
export const updateProfile = ({name, about}) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name, about})
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

//Обновление фото пользователя
export const updateProfilePhoto = ({avatar}) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar})
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

//Простановка  лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

//Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

//Удаление карточки
export const deleteСardfromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
})
  .then(res => parsResponse(res))
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
}

Promise.all([
  getProfileInfoFromServer(),
  getInitialCards
])
.then((res) => {
  res
})
.catch((err) => {
  console.log(err);
  return Promise.reject(err);
});
