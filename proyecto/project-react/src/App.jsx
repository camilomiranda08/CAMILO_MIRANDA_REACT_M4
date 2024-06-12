import { useState, useEffect } from "react";
import Card from "./components/CardComponent";

function App() {
  const initialPage = () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    return page ? parseInt(page, 10) : 1;
  };

  const [pagina, setPagina] = useState(initialPage);
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
      .then((response) => response.json())
      .then((data) => setPersonajes(data.results));
  }, [pagina]);

  /* useEffect(() => {
    // Aquí estamos obteniendo el primer personaje con el ID 1
    fetch(`https://rickandmortyapi.com/api/character/1`)
      .then((response) => response.json())
      .then((data) => setPersonaje(data));
  }, []); */

  const updatePage = (newPage) => {
    const url = new URL(window.location);
    url.searchParams.set("page", newPage);
    window.history.replaceState({}, "", url);
    setPagina(newPage);
  };

  const handleNextPage = () => {
    updatePage(pagina + 1);
  };

  const handlePreviousPage = () => {
    if (pagina > 1) {
      updatePage(pagina - 1);
    }
  };

  return (
    <div className="card-container">
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
      <div>
        <button onClick={handlePreviousPage} disabled={pagina === 1}>
          Anterior
        </button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
}

export default App;
