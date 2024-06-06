import { useState, useEffect } from "react";
import Card from "./components/CardComponent";

function App() {
  const [pagina, setPagina] = useState(0);
  const [personajes, setPersonajes] = useState([]);
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
      .then((response) => response.json())
      .then((data) => setPersonajes(data.results));
  }, [pagina]);
  console.log(personajes);
  const incrementarContador = () => {
    setPagina(pagina + 1);
  };

  return (
    <div>
      {personajes.length !== 0 &&
        personajes.map((personaje) => (
          <Card
            key={personaje.id}
            title={personaje.name}
            img={personaje.image}
            genre={personaje.gender}
            status={personaje.status}
          />
        ))}

      <button onClick={incrementarContador}>Siguiente</button>
    </div>
  );
}

export default App;
