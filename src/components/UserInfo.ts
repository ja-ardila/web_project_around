export interface UserInfoData {
  name: string;
  job: string;
}

interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;

  constructor({
    nameSelector,
    jobSelector,
  }: UserInfoSelectors) {
    const nameElement =
      document.querySelector<HTMLElement>(nameSelector);

    const jobElement =
      document.querySelector<HTMLElement>(jobSelector);

    if (!nameElement) {
      throw new Error(
        `No se encontró el elemento del nombre: "${nameSelector}".`,
      );
    }

    if (!jobElement) {
      throw new Error(
        `No se encontró el elemento del trabajo: "${jobSelector}".`,
      );
    }

    this.nameElement = nameElement;
    this.jobElement = jobElement;
  }

  public getUserInfo(): UserInfoData {
    return {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
    };
  }

  public setUserInfo({
    name,
    job,
  }: UserInfoData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}