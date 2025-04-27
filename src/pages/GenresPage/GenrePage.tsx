import { useEffect, useState } from "react";
import Api from "../../api/api";
import { Genres } from "../../models"; // Проверьте, чтобы тип Genres был правильно определен и импортирован
import { Link } from "react-router-dom";
import { capitalizeWords } from "../../utils/capitalizeWords";
import { Loader } from "../../components/Loader";
import { motion } from "framer-motion";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export function GenrePage() {
  const [data, setData] = useState<Genres | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useDocumentTitle("Жанры");

  const getData = async (): Promise<void> => {
    try {
      const genresData = await Api.getGenres();
      setData(genresData);
    } catch (err) {
      setError("Ошибка при загрузке жанров");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <motion.div className="genre-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.1 }}>
      <div className="container">
        <div className="genre-page__wrapper">
          <h1 className="genre-page__title">Жанры фильмов</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="genre-page__list">
              {data && data.map((genre) => (
                <Link to={`/genreList/${genre.toString()}`} className="genre-page__link" key={genre.toString()}>
                  <img
                    className="genre-page__link-img"
                    src={`/src/Images/image-${genre}.jpg`}
                    alt={`Картинка жанра ${capitalizeWords(genre.toString())}`}
                  />
                  <span className="genre-page__link-note">{capitalizeWords(genre.toString())}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}