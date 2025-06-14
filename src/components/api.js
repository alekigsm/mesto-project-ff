const token = 'cc30cf87-5e95-4f37-b531-4cbe11b441db'

const getCards = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
        headers: {
            authorization: token
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const getProfile = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
        headers: {
            authorization: token
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const updateEditProfile = (nameValue, jobValue) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
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
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

const addNewCard = (inputNameFormNewCardValue, inputLinkFormNewCardValue) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
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
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}


const deleteCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            /* отклоняем промис, чтобы перейти
            в блок catch, если сервер вернул ошибку */
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
        });
}

export default { getCards, getProfile, updateEditProfile, addNewCard, deleteCard }
