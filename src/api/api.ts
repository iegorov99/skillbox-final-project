import { fetchMe, loginUser, logoutUser, registerUser } from "./AuthApi";
import { addToFavorite, getFavorites, removeFromFavorite } from "./FavouritesApi";
import { getGenres, getMovieById, getMoviesByFilters, getRandomMovie, getTopMovies } from "./MoivesApi";
import { queryClient } from "./queryClient";

const Api = {
  getRandomMovie,
  getTopMovies,
  getGenres,
  getMovieById,
  getMoviesByFilters,
  fetchMe,
  loginUser,
  registerUser,
  logoutUser,
  getFavorites,
  addToFavorite,
  removeFromFavorite,
  queryClient
}

export default Api;