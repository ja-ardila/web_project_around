import type {
  CardData,
  NewCardFormData,
} from "./Card.js";
import type {
  AvatarFormData,
  EditProfileFormData,
  UserData,
} from "./UserInfo.js";

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(
      `${this.baseUrl}${endpoint}`,
      {
        ...options,
        headers: this.headers,
      },
    );

    if (!res.ok) {
      throw new Error(
        `Error en la solicitud: ${res.status}`,
      );
    }

    const responseText = await res.text();

    if (!responseText) {
      return undefined as T;
    }

    return JSON.parse(responseText) as T;
  }

  public async getUserInfo(): Promise<UserData> {
    return await this.request<UserData>("/users/me");
  }

  public async getInitialCards(): Promise<CardData[]> {
    return await this.request<CardData[]>("/cards/");
  }

  public async updateUserInfo(
    userData: EditProfileFormData,
  ): Promise<UserData> {
    return await this.request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  }

  public async updateUserAvatar(
    avatarData: AvatarFormData,
  ): Promise<UserData> {
    return await this.request<UserData>(
      "/users/me/avatar",
      {
        method: "PATCH",
        body: JSON.stringify(avatarData),
      },
    );
  }

  public async addCard(
    cardData: NewCardFormData,
  ): Promise<CardData> {
    return await this.request<CardData>("/cards/", {
      method: "POST",
      body: JSON.stringify(cardData),
    });
  }

  public async changeLikeStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    return await this.request<CardData>(
      `/cards/${cardId}/likes`,
      {
        method: isLiked ? "DELETE" : "PUT",
      },
    );
  }

  public async deleteCard(
    cardId: string,
  ): Promise<void> {
    return await this.request<void>(
      `/cards/${cardId}`,
      {
        method: "DELETE",
      },
    );
  }
}
