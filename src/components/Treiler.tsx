import ReactPlayer from "react-player";
import { Loader } from "./Loader";
import { useState } from "react";
import Icon from "../Icon/Icon";
import { Button } from "./Button";

type TProps = {
  src: string;
  title: string
}

export function Treiler({ src, title }: TProps) {
  const [loading, setLoading] = useState(true);
  const [pause, setPause] = useState(false);
  const [hover, setHover] = useState(false);

  const handleReady = () => {
    setLoading(false);
  };

  const handlePause = () => {
    setPause(true);
  };

  const handlePlay = () => {
    setPause(false);
  };

  return (
    <div className="treiler"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {loading && <Loader />}
      {hover && pause && (
        <>
          <Button className="treiler__btn ">
            <Icon className="treiler__btn-icon-play" id="play-icon" />
          </Button>
          <p className="treiler__pause-title">{title}</p>
        </>
      )}
      {hover && !pause && (
        <>
          <Button className="treiler__btn">
            <Icon className="treiler__btn-icon-pause" id="pause-icon" />
          </Button>
          <p className="treiler__pause-title">{title}</p>
        </>
      )}
      <ReactPlayer
        url={src}
        config={{
          youtube: {
            playerVars: { showinfo: 0, modestbranding: 1 }
          },
        }}
        playing
        width="100%"
        height="100%"
        onReady={handleReady}
        onPause={handlePause}
        onPlay={handlePlay}
      />
    </div>
  )
}