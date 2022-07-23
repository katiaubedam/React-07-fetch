import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  let [datos, setDatos] = useState([])
  let [datos2, setDatos2] = useState([])
  let [datos3, setDatos3] = useState([])
  let [loading, setLoading] = useState(false)
  let [selectedPlanet, setSelectedPlanet] = useState("")

  useEffect(() => {
    setLoading(true)
    axios.get("https://swapi.dev/api/planets").then(
      res => {
        setDatos(res.data.results)
        console.log(res.data.results)
        setLoading(false)
      }
    )
  }, [])

  useEffect(() => {
    if (selectedPlanet) {
      setLoading(true)
      axios.get(selectedPlanet).then(
        res => {
          setDatos2(res.data.residents)
          console.log(res.data.residents)
          setLoading(false)
        }
      )
    }
  }, [selectedPlanet])

  useEffect(() => {
    if (datos2.length > 0){
      setLoading(true)
      axios.all(datos2.map((personaje) => axios.get(personaje))).then(
        res => {
          setDatos3(res)
          console.log(res)
          setLoading(false)
        }
      )
    }
  }, [datos2])

  if (loading) {
    return <h1>Cargando datos...</h1>
  } else {
    return (
      <div>
        <select onChange={(event)=> setSelectedPlanet(event.target.value)}>
          {datos.map((planeta, i) => {
            return <option key={i} value={planeta.url}>{planeta.name}</option>
          })}
        </select>
        {datos3.length > 0 ?
          <ul>
            {datos3.map((personaje, i) => {
              return <li key={i}>{personaje.data.name}</li>
            })}
          </ul>
          :
          <></>
        }
  
      </div>
    );
  }


  
}

export default App;
