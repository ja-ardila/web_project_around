export class Api {
    baseUrl;
    headers;
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    async request(endpoint, options = {}) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: this.headers,
        });
        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status}`);
        }
        const responseText = await res.text();
        if (!responseText) {
            return undefined;
        }
        return JSON.parse(responseText);
    }
    getUserInfo() {
        return this.request("/users/me");
    }
    getInitialCards() {
        return this.request("/cards/");
    }
    updateUserInfo(userData) {
        return this.request("/users/me", {
            method: "PATCH",
            body: JSON.stringify(userData),
        });
    }
    updateUserAvatar(avatarData) {
        return this.request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify(avatarData),
        });
    }
    addCard(cardData) {
        return this.request("/cards/", {
            method: "POST",
            body: JSON.stringify(cardData),
        });
    }
    changeLikeStatus(cardId, isLiked) {
        return this.request(`/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
        });
    }
    deleteCard(cardId) {
        return this.request(`/cards/${cardId}`, {
            method: "DELETE",
        });
    }
}
