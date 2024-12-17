import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";



function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList.map((pokemon, index) => (
              <tr key={pokemon.name}>
                <td>{index + 1}</td> 
                <td>
                  <Link to={`/details/${pokemon.name}`}>{pokemon.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Details Page
function Details() {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => setPokemonDetails(data));
  }, [name]);

  if (!pokemonDetails) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Types:</p>
      <ul>
        {pokemonDetails.types.map((typeInfo) => (
          <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
        ))}
      </ul>
      <Link to="/">Back to List</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;

