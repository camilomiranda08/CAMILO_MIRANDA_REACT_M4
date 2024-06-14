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
  const [nameFilter, setNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, [pagina]);

  const fetchCharacters = () => {
    const filterParams = new URLSearchParams({
      page: pagina,
      name: nameFilter,
      gender: genderFilter,
      status: statusFilter,
      type: typeFilter,
    });

    fetch(
      `https://rickandmortyapi.com/api/character/?${filterParams.toString()}`
    )
      .then((response) => response.json())
      .then((data) => setPersonajes(data.results))
      .catch((error) => console.error("Error fetching data: ", error));
  };

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

  const handleSearch = () => {
    setPagina(1);
    fetchCharacters();
  };

  return (
    <div>
      <div>
        <h1>Rick and Morty Characters</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div>
            <label>
              Name:
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Gender:
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Status:
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Type:
              <input
                type="text"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
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
    </div>
  );
}

export default App;
