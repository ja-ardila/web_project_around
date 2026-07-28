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
    async getUserInfo() {
        return await this.request("/users/me");
    }
    async getInitialCards() {
        return await this.request("/cards/");
    }
    async updateUserInfo(userData) {
        return await this.request("/users/me", {
            method: "PATCH",
            body: JSON.stringify(userData),
        });
    }
    async updateUserAvatar(avatarData) {
        return await this.request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify(avatarData),
        });
    }
    async addCard(cardData) {
        return await this.request("/cards/", {
            method: "POST",
            body: JSON.stringify(cardData),
        });
    }
    async changeLikeStatus(cardId, isLiked) {
        return await this.request(`/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
        });
    }
    async deleteCard(cardId) {
        return await this.request(`/cards/${cardId}`, {
            method: "DELETE",
        });
    }
}
