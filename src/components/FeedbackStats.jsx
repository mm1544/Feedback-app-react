// rfce - React Functional Export Component
import React from 'react'
import { useContext } from 'react'
//  Var to use Context
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
    // Pulling feedback from the context
    const {feedback} = useContext(FeedbackContext)

    // Calculate ratings avg
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length

    // Format number to 1 decimal place
    // Regular expression will replace trailing 0
    average = average.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}


export default FeedbackStats