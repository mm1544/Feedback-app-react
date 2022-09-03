import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import React from 'react'
import FeedbackItem from './FeedbackItem'
//  Var to use Context
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
    // Pulling feedback from the context
    const {feedback} = useContext(FeedbackContext)

    if(!feedback || feedback.length ===0){
        return <p>No feedback yet</p>
    }

    return (
        <div className='feedback-list'>
            {/* for animation */}
            <AnimatePresence>
            {feedback.map((item) => (
            // for animation
            <motion.div 
                key={item.id}
                // Double curly braces because passing an object
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                layout
            >
                <FeedbackItem 
                key={item.id} 
                item={item}
                />
            </motion.div>
            ))}
            </AnimatePresence>
        </div>)


//   return <div className='feedback-list'>{feedback.map((item) => (<FeedbackItem 
//     key={item.id} 
//     item={item} 
//     handleDelete={handleDelete}
//     />))}</div>
}


export default FeedbackList