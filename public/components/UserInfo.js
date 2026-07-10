export class UserInfo {
    nameElement;
    jobElement;
    constructor({ nameSelector, jobSelector, }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        if (!nameElement) {
            throw new Error(`No se encontró el elemento del nombre: "${nameSelector}".`);
        }
        if (!jobElement) {
            throw new Error(`No se encontró el elemento del trabajo: "${jobSelector}".`);
        }
        this.nameElement = nameElement;
        this.jobElement = jobElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            job: this.jobElement.textContent ?? "",
        };
    }
    setUserInfo({ name, job, }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
    }
}
