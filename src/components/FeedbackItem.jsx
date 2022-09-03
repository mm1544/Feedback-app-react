import {FaTimes, FaEdit} from 'react-icons/fa'
import React from 'react'
import Card from './shared/Card'
import PropTypes from 'prop-types'
import { useContext } from 'react'
//  Var to use Context
import FeedbackContext from '../context/FeedbackContext'

function FeedbackItem({ item }) {
    // Pulling feedback from the context
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext)

  return (
    // <Card reverse={true}>
    <Card>
        <div className='num-display'>{item.rating}</div>
        <button 
        onClick={() => deleteFeedback(item.id)}
        className='close'>
          <FaTimes color='purple'/>
        </button>
        <button onClick={()=> editFeedback(item)} className="edit">
          <FaEdit color='purple'/>
        </button>
        <div className='text-display'>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default FeedbackItem