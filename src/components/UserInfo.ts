export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface EditProfileFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
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

  public getUserInfo(): EditProfileFormData {
    return {
      name: this.nameElement.textContent ?? "",
      about: this.jobElement.textContent ?? "",
    };
  }

  public setUserInfo({
    name,
    about,
    avatar,
  }: UserData): void {
    this.nameElement.textContent = name;
    this.jobElement.textContent = about;
    this.avatarElement.src = avatar;
    this.avatarElement.alt = `Avatar de ${name}`;
  }
}
