import { FC, memo, useCallback, useEffect, useState } from "react"
import Rating from "./Rating";
import { getRuntime } from "../utils/getRuntime";
import Icon from "../Icon/Icon";
import Api from "../api/api";
import { IMovie } from "../models";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Modal from "./Modal/Modal";
import { Treiler } from "./Treiler";
import getArray from "../utils/getArray";
import { AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { useModal } from "../hooks/useModal";

type TProps = {
  className: string;
  data: IMovie;
  getData?: () => void;
  type?: string;
}

const MovieCard: FC<TProps> = memo(({ className, data, getData, type }: TProps) => {
  const isAuth = useAppSelector((state) => state.isAuth);
  const { isTreilerOpen, openModal, closeModal } = useModal();
  
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  

  const random = type === "random";
  const additional = type === "search" ? "search" : type === "search-mobile" ? "search movie-card--search-mobile" : '';

  const handleFavoriteToggle = useCallback(async () => {
    if (isAuth) {
      const action = isFavorite ? Api.removeFromFavorite : Api.addToFavorite;
      await action({ id: data.id.toString() });
      setIsFavorite(prev => !prev);
    } else {
      openModal("default");
    }
  }, [isAuth, isFavorite, data.id, openModal]);

  const getUser = useCallback(async (): Promise<void> => {
    const user = await Api.fetchMe();
    setIsFavorite(user.favorites.includes(data.id.toString()));
  }, [data.id]);

  useEffect(() => {
    if (isAuth && type !== "search") getUser();
  }, [isAuth, getUser, type]);

  const handleRefresh = useCallback(async () => {
    if (getData) {
      setIsRefreshing(true);
      await getData();
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, [getData]);

  return (
    <div className={className + " movie-card" + `${(additional !== "") ? (` movie-card--${additional}`) : ""}`}>
      <div className="movie-card__wrapper">
        {data.posterUrl && (<img className="movie-card__poster" src={data.posterUrl} alt="Постер фильма" />)}
        <div className="movie-card__info-wrapper">
          <div className="movie-card__info">
            <div className="movie-card__top">
              <Rating tmdbRating={data.tmdbRating} className="movie-card__rating" type={String(type)} />
              <span className="movie-card__release-year">{data.releaseYear}</span>
              <span className="movie-card__genre">{getArray(data.genres)}</span>
              <span className="movie-card__runtime">{getRuntime(data.runtime)}</span>
            </div>
            <h2 className="movie-card__title">{data.title}</h2>
            <p className="movie-card__plot">{data.plot}</p>
          </div>
          <div className="movie-card__buttons">
            <Button className="movie-card__btn btn btn--blue" onClick={() => openModal("trailer")}>Трейлер</Button>
            {random && (<Link className="movie-card__btn btn" to={"/film-page/" + data.id.toString()}>О фильме</Link>)}
            <Button className={`movie-card__btn btn btn--icon ${isFavorite ? 'btn--active' : ''}`}
              aria-label="Добавить в избранное"
              type="button"
              onClick={handleFavoriteToggle}>
              <Icon id="favorite-icon" className="btn__icon btn__icon--favorite" />
            </Button>
            {random && (
              <Button className={`movie-card__btn btn btn--icon ${isRefreshing ? 'btn--rotate' : ''}`} onClick={handleRefresh} aria-label="Другой случайный фильм">
                <Icon id="refresh-icon" className="btn__icon" />
              </Button>)}
          </div>
        </div>
        {data.backdropUrl && (<img className="movie-card__backdrop" src={data.backdropUrl} alt="Бэкдроп фильма" />)}
        <AnimatePresence>
          {isTreilerOpen && (
            <Modal className="movie-card__modal" isButton={true} onClose={() => closeModal("trailer")} type="treiler">
              <Treiler src={data.trailerUrl} title={data.title} />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
});

export default MovieCard;
