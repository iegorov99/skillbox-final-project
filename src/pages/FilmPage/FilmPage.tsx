import { useEffect, useState } from "react";
import { IMovie } from "../../models";
import Api from "../../api/api";
import MovieCard from "../../components/MovieCard";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { getLanguage } from "../../utils/getLanguage";
import { motion } from "framer-motion";
import NotFoundPage from "../NotFoundPage.tsx/NoteFoundPage";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export function FilmPage() {
  const { id } = useParams();
  const [data, setData] = useState<IMovie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useDocumentTitle(data?.title)

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const movieData = await Api.getMovieById(Number(id));
      setData(movieData);
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
      setError("Не удалось загрузить данные о фильме. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  const movieInfo = [
    { label: "Язык оригинала", value: getLanguage(String(data?.language)) || data?.language },
    { label: "Бюджет", value: data?.budget ? `${data.budget.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $` : null },
    { label: "Выручка", value: data?.revenue ? `${data.revenue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $` : null },
    { label: "Режиссёр", value: data?.director },
    { label: "Продакшен", value: data?.production },
    { label: "Награды", value: data?.awardsSummary }
  ];

  return (
    data?.title ? (
      <motion.div className="film-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.1 }}>
      <div className="container">
          <div className="film-page__wrapper">
          <h1 className="visually-hidden">Страница фильма {data?.title}</h1>
          <MovieCard className="film-page__movie" data={data} getData={getData} />
          <div className="film-page__info">
            <h3 className="film-page__info-title">О фильме</h3>
            <ul className="film-page__info-list">
              {movieInfo.map(item => item.value && (
                <li className="film-page__info-item" key={item.label}>
                  <span className="film-page__info-note">
                    <span className="film-page__info-note-text">{item.label}</span>
                    <span className="film-page__info-dash"></span>
                  </span>
                  <span className="film-page__info-text">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
    ) : <NotFoundPage /> 
  )
};