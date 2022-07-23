import { useEffect, useState } from 'react';
import axios from 'axios';

import Card from './components/Card';

import './App.css';

function App() {

  let [setsMagic, setSetsMagic] = useState([])
  let [cards, setCards] = useState([])
  let [select, setSelect] = useState("")

  useEffect(() => {
    axios.get("https://api.magicthegathering.io/v1/sets").then(
      res => {
        setSetsMagic(res.data.sets)
        console.log(res)
      }
    )
  }, [])

  useEffect(() => {
    if (select !== "") {
      axios.get(`https://api.magicthegathering.io/v1/cards?set=${select}`).then(
        res => {

          let arr = res.data.cards
          if (arr.length > 100) arr.slice(0,99)
          
          setCards(arr)
          console.log(res)
        }
      )
    }
  }, [select])


  return (
    <div>
      {setsMagic.length > 0 ?
        <select onChange={(event) => setSelect(event.target.value)}>
          {setsMagic.map((setMagic, i) => {
            return <option key={i} value={setMagic.code}>{setMagic.name}</option>
          })}
        </select>
        :
        <></>
      }
      {cards.length > 0 ?
        <div className="container">
          {cards.map((card, i) => {
            return (card.originalText? <Card key={i} card={card} /> : "")
          })}
        </div>
        :
        <></>
      }
      
    </div>
  );
}

export default App;
