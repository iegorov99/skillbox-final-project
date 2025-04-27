import { User, UserSchema } from "../models/user.ts";
import { BASE_URL } from "./config.ts";
import { validateResponse } from "./validateResponse.ts";
import axios from "axios";

export async function registerUser({
  email,
  password,
  name,
  surname
}: {
  email: string,
  password: string,
  name: string,
  surname: string
}
): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}/user`, {
      email,
      password,
      name,
      surname
    }, {
      withCredentials: true,
    });

    await validateResponse(response);

    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
}

export async function loginUser({
  email,
  password
}: {
  email: string,
  password: string
}): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    }, {
      withCredentials: true,
    });

    await validateResponse(response);

    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
}

export function logoutUser(): Promise<void> {
  return axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true })
}

export function fetchMe(): Promise<User> {
  return axios.get(`${BASE_URL}/profile`, { withCredentials: true })
    .then(response => validateResponse(response))
    .then(response => {
      return UserSchema.parse(response.data);
    })
    .catch((error: unknown) => {
      if (axios.isAxiosError(error)) {
        throw new Error(`Ошибка при получении профиля: ${error.response?.data || error.message}`);
      } else {
        throw new Error('Неизвестная ошибка при получении профиля');
      }
    });
}