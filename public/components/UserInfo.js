export class UserInfo {
    nameElement;
    jobElement;
    avatarElement;
    constructor({ nameSelector, jobSelector, avatarSelector, }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        const avatarElement = document.querySelector(avatarSelector);
        if (!nameElement) {
            throw new Error(`No se encontró el elemento del nombre: "${nameSelector}".`);
        }
        if (!jobElement) {
            throw new Error(`No se encontró el elemento del trabajo: "${jobSelector}".`);
        }
        if (!avatarElement) {
            throw new Error(`No se encontró el avatar: "${avatarSelector}".`);
        }
        this.nameElement = nameElement;
        this.jobElement = jobElement;
        this.avatarElement = avatarElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            about: this.jobElement.textContent ?? "",
        };
    }
    setUserInfo({ name, about, avatar, }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = about;
        this.avatarElement.src = avatar;
        this.avatarElement.alt = `Avatar de ${name}`;
    }
}
