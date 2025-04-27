import { FC, memo } from "react";
import { Movies } from "../models";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import Api from "../api/api";
import { Button } from "./Button";
import { Loader } from "./Loader";

type TProps = {
  className: string;
  data: Movies;
  type?: string;
  onRemoveFavorite?: (id: string) => void;
}

const MoviesList: FC<TProps> = memo(({ className, data, type, onRemoveFavorite }: TProps) => {
  let additional = "";
  if (type === "top") additional = `--top`;
  else if (type === "favorites") additional = `--favorites`;

  const removeFavorite = async (id: string): Promise<void> => {
    await Api.removeFromFavorite({ id });
    onRemoveFavorite && onRemoveFavorite(id);
  }

  return (
    <div className={className + " movies"}>
      {data ? (
        <ul className={type ? `movies__list movies__list--${type}` : "movies__list"}>
          {data.map((movie) => (
            <li className={"movies__item " + "movies__item" + additional} key={movie.id} aria-label={`Фильм ${movie.title}`} title={`Фильм ${movie.title}`}>
              <Link to={"/film-page/" + movie.id.toString()}>
                {movie.posterUrl ? (
                  <img className="movies__image" src={movie.posterUrl} alt="Постер фильма" />
                ) : <span className="movies__title">{movie.title}</span>}
              </Link>
              {type === "favorites" && 
              <Button className="movies__btn" onClick={() => removeFavorite(movie.id.toString())} aria-label={`Кнопка удалить фильм ${movie.title} из избранного`}>
                <Icon id="close-icon-small" className="movies__btn-icon"></Icon>
                </Button>}
            </li>
          ))}
        </ul>
      ) : (
        <Loader/>
      )}
    </div>
  )
});

export default MoviesList;