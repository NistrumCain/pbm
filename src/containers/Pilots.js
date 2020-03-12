import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table} from '../components'

function Pilots() {
  const [pilots, setPilots] = useState();
  useEffect(() => {
    if(!pilots) {
      axios.get('https://www.pinksquadron.dk/pbm/api2/pilotoverview.php?sid=59&fbclid=IwAR3POP20jN5r8ZeITWC4_s44klV6Bt372-0B6nCTOZs8Z5yBTwUS1Gkb3Kg')
      .then(res => {
        setPilots(res);
      })
    }
    if(pilots) {
      let factions = {}
      for(var i in pilots.data){
        if(Object.keys(factions).indexOf(pilots.data[i].faction) === -1) {
          let pilotFaction = pilots.data[i].faction
          factions[pilotFaction] = [pilots.data[i]]
        } else {
          for( var faction in factions ){
            if(faction === pilots.data[i].faction) {
              factions[faction].push(pilots.data[i])
            }
          }
        }
      }
      console.log(factions,'factions')
    }
  })
  // Similar to componentDidMount and componentDidUpdate:
  let data = require('../data/data.json')

  return (
    <div>
      <h2>YO</h2>
      {pilots && <Table props={{pilots}}/>}
    </div>
  )
}

export default Pilots;
