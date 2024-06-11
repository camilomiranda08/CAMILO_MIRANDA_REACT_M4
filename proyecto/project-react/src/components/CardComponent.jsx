import Title from "./TituloComponent";
import Image from "./ImagenComponent";
import Details from "./Detail.Component";
import "../App.css";

const Card = (props) => {
  return (
    <>
      <div className="container">
        <Title title={props.title} />
        <Image url={props.img} />
        <Details genre={props.genre} status={props.status} />
      </div>
    </>
  );
};

export default Card;


