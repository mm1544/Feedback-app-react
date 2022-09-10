import React from 'react'
// useState is for Setting a 'peace' of state
// Whenever "feedbackEdit" state changes (when we click EDIT button), we want certain things to happen - i.e. we want form to get filled with text etc. --> This is called an effect (or side-effect), and the way we deal with effects in functional components with hooks is by using special hook "useEffect".
import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
//  Var to use Context
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {
    // Pulling feedback (and other stuff) from the context.
    // 'feedbackEdit' is a state
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    // Second parameter is an array of dependancies - when any of them changes, then 'useEffect' will be runned.
    // If you will leave '[]' empty 'useEffect' will run when component(?) loads
    useEffect(() => {
        // Checking if state has something in it, because we don't want code to run when component loads
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        } 
    }, [feedbackEdit])

    // That is a local-component state
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    // To connect input field to the state we will use this function
    // Takes in EVENT parameter
    const handleTextChange = (e) => {
        // Validation will be runed everytime we type anything in
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }


        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }

            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
                // Edited mm
                setBtnDisabled(true)
            } else {
                addFeedback(newFeedback)
            }
            // To clear text after submitting Form
            setText('')
        }

            
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text}/>
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm