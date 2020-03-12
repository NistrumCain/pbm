import React, { useEffect, useState, useRef, useReducer }from 'react'
require('./Table.scss')
function Table({props}) {
  console.log(props, "props ")
  const prevPilots = useRef()
  const [pilots, setPilots] = useState();
  const [sortOrder, setOrder] = useState();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect( () => {
    if(!pilots) {
      setPilots(props.pilots.data)
      prevPilots.current = pilots
    } else {
      console.log('update')
      if(prevPilots.current !== pilots) {
        console.log('not current')
        prevPilots.current = pilots
      }
    }

    return () => {}
  })

  function row(pilot,rowNum) {
    return (
      <div key={pilot.ffgpilot} className={`${rowNum} row`}>
        <p>{pilot.prettyfaction}</p>
        <p>{pilot.prettypilot}</p>
        <p>{pilot.avgpercentile}</p>
        <p>{pilot.ffgpilot}</p>
        <p>{pilot.prettyship}</p>
      </div>
    )

  }

  function compareValues(key, order) {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (!order) ? (comparison * -1) : comparison
      );
    };
  }


  return(
    <div className="table">
    <button onClick={() => {
      let newPilots = pilots.sort(compareValues('ship'));
      setPilots(newPilots)
      forceUpdate()
    }}>Order Ship</button>
    <button onClick={() => {
      let newPilots = pilots.sort(compareValues('pilot'));
      setPilots(newPilots)
      forceUpdate()
    }}>Order Pilot</button>
    <button onClick={() => {
      let newPilots = pilots.sort(compareValues('faction'));
      setPilots(newPilots)
      forceUpdate()
    }}>Order Faction</button>
    <button onClick={() => {
      if(!sortOrder || Object.keys(sortOrder).indexOf('infactionlistspct') === -1) {
        setOrder({...sortOrder, 'infactionlistspct': true})
      } else {
        setOrder({...sortOrder, 'infactionlistspct': !sortOrder.infactionlistspct})
      }
      console.log(sortOrder, 'order')
      let newPilots = pilots.sort(compareValues('infactionlistspct', sortOrder && sortOrder.infactionlistspct));
      setPilots(newPilots)
      forceUpdate()
    }}>Order list %</button>
    <button onClick={() => {
      let newPilots = pilots.sort(compareValues('avgpercentile'));
      setPilots(newPilots)
      forceUpdate()
    }}>Order Percentile</button>
    {console.log(props, 'testing')}
    {pilots && pilots.map((pilot, i) => {
      let evenOdd = () =>{ if ( i % 2 == 0) {
      	return 'even'
      }else{
      	return 'odd'
      }}
      return row(pilot, evenOdd())
    })}
      <h2>test</h2>
    </div>
  )
}

export default Table;
