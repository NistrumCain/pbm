import React, { useEffect, useState }from 'react'
require('./Table.scss')
function Table({props}) {
  console.log(props, "props ")
  function row(pilot,rowNum) {
    return (
      <div key={pilot.ffgpilot} className={`${rowNum} row`}>
        <p>{pilot.prettyfaction}</p>
        <p>{pilot.prettypilot}</p>
      </div>
    )

  }

  return(
    <div className="table">
    {console.log(props, 'testing')}
    {props.pilots.data.map((pilot, i) => {
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
