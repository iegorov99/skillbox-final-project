import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList";
import Api from "../../api/api";
import { IMovie, Movies } from "../../models";
import MovieCard from "../../components/MovieCard";
import { Loader } from "../../components/Loader";
import { motion } from "framer-motion";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export function MainPage() {
  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
  const [topMovies, setTopMovies] = useState<Movies | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useDocumentTitle("Главная страница");

  const fetchRandomMovie = async (): Promise<void> => {
    try {
      const data = await Api.getRandomMovie();
      setRandomMovie(data);
    } catch (err) {
      setError("Ошибка при загрузке случайного фильма.");
    }
  };

  const fetchTopMovies = async (): Promise<void> => {
    try {
      const dataTop = await Api.getTopMovies();
      setTopMovies(dataTop);
    } catch (err) {
      setError("Ошибка при загрузке топ фильмов.");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchRandomMovie(), fetchTopMovies()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    document.title = `VK Маруся | Главная страница`;
  }, []);

  return (
    <motion.div className="main-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.1 }} exit={{ opacity: 0 }}>
      <div className="container">
        <h1 className="visually-hidden">Главная страница</h1>
        <section className="main-page__random-movie random-movie">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            randomMovie && (
              <MovieCard className="random-movie" data={randomMovie} getData={fetchRandomMovie} type="random" />
            )
          )}
        </section>
        <section className="main-page__top-movies">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            topMovies && (
              <div className="main-page__top-movies-wrapper">
                <h3 className="main-page__top-movies-title">Топ 10 фильмов</h3>
                <MoviesList className="main-page__top-movies-list" data={topMovies} type="top" />
              </div>
            )
          )}
        </section>
      </div>
    </motion.div>
  )
}