import { memo } from "react";
import Icon from "../Icon/Icon";

type TProps = {
  tmdbRating: number;
  className: string;
  type: string;
}

const Rating = memo(({ tmdbRating, className, type }: TProps) => {
  let color = "";

  if (tmdbRating <= 5) color = "#C82020";
  else if (tmdbRating <= 7) color = "#777777";
  else if (tmdbRating <= 8) color = "#308E21";
  else color = "#A59400";

  return (
    <div className={className + " rating" + ` ${type === "search" ? "rating--search" : ""}`}
      style={{ backgroundColor: color }}
      aria-label={`Рейтинг фильма на TMBD ${tmdbRating.toFixed(1)}`}>
      <Icon id="star-icon" className="rating__icon" />
      <span className="rating__number">{tmdbRating.toFixed(1)}</span>
    </div>
  );
});

export default Rating;