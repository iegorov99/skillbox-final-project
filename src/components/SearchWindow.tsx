import { useCallback, useEffect, useState } from "react";
import { Movies } from "../models";
import { createQueryString } from "../utils/createQueryString";
import Api from "../api/api";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { useModal } from "../hooks/useModal";

type TProps = {
  title: string;
  onClick: () => void;
}

export function SearchWindow({ title, onClick }: TProps) {
  const [data, setData] = useState<Movies>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { closeModal } = useModal()

  const getData = useCallback(async (title: string): Promise<void> => {
    if (!title) {
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const queryParams = createQueryString({ count: 5, title });
      const newData = await Api.getMoviesByFilters(queryParams);
      setData(newData);
    } catch (err) {
      setError("Ошибка при загрузке данных.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData(title);
  }, [title]);

  const handleOnClick = useCallback(() => {
    onClick();
    closeModal("search");
  }, []);

  return (
    <div className="search">
      {loading && <Loader />}
      {error && <p className="search__error">{error}</p>}
      {data.length > 0 ? (
        <ul className="search__list">
          {data.map((movie) => (
            <li className="search__item" key={movie.id} >
              <Link to={"/film-page/" + movie.id.toString()} onClick={handleOnClick}>
                <MovieCard className="search__movie" data={movie} type="search" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        title && <p className="search__no-results">Ничего не найдено</p>
      )}
    </div>
  );
};