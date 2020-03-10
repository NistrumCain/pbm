import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table} from '../components'
function Pilots() {
  const [pilot, setPilot] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {
    axios.get('https://www.pinksquadron.dk/pbm/api/pilotoverview.php?sid=59&fbclid=IwAR0PlfjtQzEsCVtQcP3Sy8Vs_JYz7jO-ocU6XS6UAfpcxrSb-rz_22DtjdA')
    .then(res => {
      const pilots = res.data
      this.setPilot({pilots})
      console.log(res.data)
    })
    // Update the document title using the browser API


  });

  return (
    <div>
      <h2>YO</h2>
      <Table props={{key:"hello", value:'goodbye'}}/>
    </div>
  )
}

export default Pilots;
