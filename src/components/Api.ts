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

  public getUserInfo(): Promise<UserData> {
    return this.request<UserData>("/users/me");
  }

  public getInitialCards(): Promise<CardData[]> {
    return this.request<CardData[]>("/cards/");
  }

  public updateUserInfo(
    userData: EditProfileFormData,
  ): Promise<UserData> {
    return this.request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  }

  public updateUserAvatar(
    avatarData: AvatarFormData,
  ): Promise<UserData> {
    return this.request<UserData>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(avatarData),
    });
  }

  public addCard(
    cardData: NewCardFormData,
  ): Promise<CardData> {
    return this.request<CardData>("/cards/", {
      method: "POST",
      body: JSON.stringify(cardData),
    });
  }

  public changeLikeStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    return this.request<CardData>(
      `/cards/${cardId}/likes`,
      {
        method: isLiked ? "DELETE" : "PUT",
      },
    );
  }

  public deleteCard(cardId: string): Promise<void> {
    return this.request<void>(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }
}
