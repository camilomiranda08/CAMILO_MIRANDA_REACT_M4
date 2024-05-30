import Title from "./TituloComponent";
import Image from "./ImagenComponent";
import foto from "../assets/card.png";
import Details from "./Detail.Component";
import "../App.css";

const Card = (props) => {
  return (
    <>
      <div className="container">
        <Title title="Rick Sanchez" />
        <Image url={foto} />
        <Details genre="accion" status="ok" />
      </div>
    </>
  );
};

export default Card;
