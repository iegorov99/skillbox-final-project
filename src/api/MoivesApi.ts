import { Genres, IMovie, Movies } from "../models";
import { BASE_URL } from "./config";

export const getRandomMovie = async(): Promise<IMovie> => {
  const url = `${BASE_URL}/movie/random`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getTopMovies = async() : Promise<Movies> => {
  const url = `${BASE_URL}/movie/top10`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getGenres = async() : Promise<Genres> => {
  const url = `${BASE_URL}/movie/genres`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getMovieById = async(id: number) : Promise<IMovie> => {
  const url = `${BASE_URL}/movie/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export const getMoviesByFilters = async(queryParams?: string) : Promise<Movies> => {
  const url = `${BASE_URL}/movie?${queryParams}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}