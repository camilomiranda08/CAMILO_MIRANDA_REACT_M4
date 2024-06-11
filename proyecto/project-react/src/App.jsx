import { useState, useEffect } from "react";
import Card from "./components/CardComponent";

function App() {
  const [personaje, setPersonaje] = useState(null);

  useEffect(() => {
    // Aquí estamos obteniendo el primer personaje con el ID 1
    fetch(`https://rickandmortyapi.com/api/character/1`)
      .then((response) => response.json())
      .then((data) => setPersonaje(data));
  }, []);

  console.log(personaje);

  return (
    <div>
      {personaje && (
        <Card
          key={personaje.id}
          title={personaje.name}
          img={personaje.image}
          genre={personaje.gender}
          status={personaje.status}
        />
      )}
    </div>
  );
}

export default App;
