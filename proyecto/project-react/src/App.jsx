import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Card from "./components/CardComponent";
import HomePage from "./components/Pages/HomePage";
import NotFoundPage from "./components/Pages/NotFoundPage";

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
  }, [pagina, nameFilter, genderFilter, statusFilter, typeFilter]);

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

  const SearchForm = () => (
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
  );

  const CharacterList = () => (
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

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notfound">Not Found Page</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Rick and Morty Characters</h1>
              <SearchForm />
              <CharacterList />
            </div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
