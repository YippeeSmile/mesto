class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            Promise.reject(res.status)
        }
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about
                })
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    link
                })
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: "DELETE",
                headers: this._headers
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: "PUT",
                headers: this._headers
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this._headers
            })
            .then(this._getResponse)
            .catch(console.log)
    }

    changeAvatar(avatar) { //avatar
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar
                })
            })
            .then(this._getResponse)
            .catch(console.log)
    }



    // другие методы работы с API
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: '6d1a7cef-7e68-4d69-9a5e-e37f87703afa',
        'Content-Type': 'application/json'
    }
});