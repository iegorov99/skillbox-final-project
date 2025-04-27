import { useEffect, useState } from "react";
import { Movies } from "../../models";
import Api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { createQueryString } from "../../utils/createQueryString";
import { capitalizeWords } from "../../utils/capitalizeWords";
import MoviesList from "../../components/MoviesList";
import Icon from "../../Icon/Icon";
import { Loader } from "../../components/Loader";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export function GenreListPage() {
  const { genre } = useParams<string>();
  const [data, setData] = useState<Movies>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNext, sethasNext] = useState<boolean>(true);
  const { windowWidth } = useWindowWidth();
  useDocumentTitle(capitalizeWords(String(genre)))
  const navigate = useNavigate();

  const getData = async (page: number, count: number): Promise<void> => {
    if (!genre) return;
    const queryParams = createQueryString({ count, page, genre: String(genre) });
    const newData = await Api.getMoviesByFilters(queryParams);

    if (newData.length < count) sethasNext(false);

    setData(prevData => {
      const existingIds = new Set(prevData.map(movie => movie.id));
      const uniqueNewData = newData.filter(movie => !existingIds.has(movie.id));
      return [...prevData, ...uniqueNewData];
    });
  };

  useEffect(() => {
    windowWidth < 528 && setData([]);
    getData(page, windowWidth < 528 ? 5 : (page === 0 ? 15 : 10));
  }, [page, windowWidth, genre]);

  const handleOnClick = () => {
    if (hasNext) setPage(prevPage => prevPage + 1);
  };

  return (
    <motion.div className="genre-list-page" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2, delay: 0.1}}>
      <div className="container">
        <div className="genre-list-page__wrapper">
          <Button className="genre-list-page__back" onClick={() => navigate(-1)}>
            <Icon id="back-icon" className="genre-list-page__back-icon" />
            <p className="genre-list-page__title">{capitalizeWords(String(genre))}</p>
          </Button>
          {data.length > 0 ? (
            <div className="genre-list-page__content">
              <MoviesList className="genre-list-page__movies" data={data} />
              {hasNext && <button className="genre-list-page__button btn btn--blue" onClick={handleOnClick}>Показать еще</button>}
            </div>
          ) : <Loader />}
        </div>
      </div>
    </motion.div>
  );
}

