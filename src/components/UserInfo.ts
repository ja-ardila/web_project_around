export interface UserInfoData {
  name: string;
  job: string;
  avatar?: string;
}

interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private jobElement: HTMLElement;
  private avatarElement: HTMLImageElement;

  constructor({
    nameSelector,
    jobSelector,
    avatarSelector,
  }: UserInfoSelectors) {
    const nameElement =
      document.querySelector<HTMLElement>(nameSelector);

    const jobElement =
      document.querySelector<HTMLElement>(jobSelector);

    const avatarElement =
      document.querySelector<HTMLImageElement>(
        avatarSelector,
      );

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

    if (!avatarElement) {
      throw new Error(
        `No se encontró el avatar: "${avatarSelector}".`,
      );
    }

    this.nameElement = nameElement;
    this.jobElement = jobElement;
    this.avatarElement = avatarElement;
  }

  public getUserInfo(): UserInfoData {
    return {
      name: this.nameElement.textContent ?? "",
      job: this.jobElement.textContent ?? "",
      avatar: this.avatarElement.src,
    };
  }

  public setUserInfo({
    name,
    job,
    avatar,
  }: UserInfoData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;

    if (avatar) {
      this.avatarElement.src = avatar;
      this.avatarElement.alt = `Avatar de ${name}`;
    }
  }
}
