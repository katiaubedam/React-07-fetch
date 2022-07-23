import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  let [datos, setDatos] = useState([])
  let [datos2, setDatos2] = useState([])
  let [select, setSelect] = useState("")
  let [pokemons, setPokemons] = useState("")

  useEffect(() =>{
    axios.get("https://pokeapi.co/api/v2/type").then(
      res => {
        setDatos(res.data.results)
        console.log(res)
      }
    )
  }, [])

  useEffect(() =>{
    if (select !== "") {
      axios.get(select).then(
        res => {
          setDatos2(res.data.pokemon)
          console.log(res)

          let rndPokemon = []
          for (let i = 0; i < 3; i++) {
            rndPokemon.push(res.data.pokemon[Math.floor(Math.random() * res.data.pokemon.length)].pokemon.name)
          }

          setPokemons(rndPokemon)
          console.log(rndPokemon)
        }
      )
    }
  }, [select])

  return (
    <div>
      <select onChange={(event) => setSelect(event.target.value)}>
        {datos.map((tipo, i) => {
          return <option key={i} value={tipo.url}>{tipo.name}</option>
        })}
      </select>
      {pokemons.length > 0 ?
        <ul>
          {pokemons.map((pokemon, i) => {
            return <li key={i}>{pokemon}</li>
          })}
        </ul>
        :
        <></>
      }
    </div>
  );
}

export default App;
