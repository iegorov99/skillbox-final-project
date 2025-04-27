import { Movies } from "../models";
import { BASE_URL } from "./config";


export const getFavorites = async (): Promise<Movies> => {
  const url = `${BASE_URL}/favorites`
  const response = await fetch(url, {credentials: "include"});
  const data = await response.json();
  return data;
}

export function addToFavorite({ id }: { id: string }): Promise<void> {
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  }).then(() => undefined);
}

export function removeFromFavorite({ id }: { id: string }): Promise<void> {
  return fetch(`${BASE_URL}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  }).then(() => undefined);
}