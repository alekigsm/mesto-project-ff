const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
    headers: {
        authorization: 'cc30cf87-5e95-4f37-b531-4cbe11b441db',
        'Content-Type': 'application/json'
    }
}

const token = 'cc30cf87-5e95-4f37-b531-4cbe11b441db'

const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const updateEditProfile = (nameValue, jobValue) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameValue,
            about: jobValue
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const addNewCard = (inputNameFormNewCardValue, inputLinkFormNewCardValue) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: inputNameFormNewCardValue,
            link: inputLinkFormNewCardValue
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}


const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            //отклоняем промис, чтобы перейти    в блок catch, если сервер вернул ошибку 

            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const updateLikeCard = (cardId, isLike) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLike ? 'PUT' : 'DELETE',
        headers: config.headers,
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            //отклоняем промис, чтобы перейти    в блок catch, если сервер вернул ошибку 

            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const updateProfileAvatar = (inputLinkAva) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: inputLinkAva
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}
export default { getCards, getProfile, updateEditProfile, addNewCard, deleteCard, updateLikeCard, updateProfileAvatar }
