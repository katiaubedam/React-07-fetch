import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {

  let [datos, setDatos] = useState([])
  let [url, setUrl] = useState("https://rickandmortyapi.com/api/character/")
  let [next, setNext] = useState("")
  let [prev, setPrev] = useState("")

  useEffect(() =>{
    axios.get(url).then(
      res => {
        setDatos(res.data.results)
        setNext(res.data.info.next)
        setPrev(res.data.info.prev)
        console.log(datos)
        console.log(res.data)
      }
    )
  }, [url])


  return (    
    <>
      <h1>Personajes de Rick & Morty</h1>
      <div className="container">
        {datos.map((personaje, i) => {
          return ( 
            <div className="card">
              <img src={personaje.image} alt={personaje.name} />
              <h4>{personaje.name}</h4> 
            </div>
          )
        })}
      </div>
      <div className="container">
        {prev !== null? <button onClick={() => setUrl(prev)}>Anterior</button> : <button disabled>Anterior</button> }
        {next !== null? <button onClick={() => setUrl(next)}>Siguiente</button> : <button disabled>Siguiente</button> }
      </div>
    </>
  );
}

export default App;
