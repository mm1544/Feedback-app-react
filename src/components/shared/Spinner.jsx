// 'rfce' component
import spinner from '../assets/spinner.gif'
import React from 'react'

function Spinner() {
  return (
    // "margin: 'auto'" will set obj in the middle
    // "display: 'block'" to make margin work
    <img src={spinner} alt='Loading...' style={{width: '100px', margin: 'auto', display: 'block'}}/>
  )
}

export default Spinner