import type { CardData } from "../components/Card.js";

export interface FormValidationConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export interface ApiUserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface ApiCardData extends CardData {
  createdAt: string;
}

export const defaultFormConfig: FormValidationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
