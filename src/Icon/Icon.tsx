import Icons from "./sprite.svg";

type TProps = {
  id: string,
  className: string
}

function Icon ({id, className}: TProps){
  return (
    <svg className={className}>
      <use href={Icons + "#" + id}></use>
    </svg>
  )
};

export default Icon;