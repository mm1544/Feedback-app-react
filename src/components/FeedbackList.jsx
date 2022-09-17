import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import React from 'react'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'
//  Var to use Context
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
    // Pulling feedback from the context
    const {feedback, isLoading} = useContext(FeedbackContext)

    // Want to make sure that 'isLoading' is not true.
    // "If it is not loading and there is no feedback, or the length is 0, then show"
    if(!isLoading && (!feedback || feedback.length ===0)){
        return <p>No feedback yet</p>
    }

    // Check if it is loading. If 'yes' - show spinner, if 'no' - show the rest.
    return isLoading ? <Spinner /> :
    (
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
        </div>
        )


//   return <div className='feedback-list'>{feedback.map((item) => (<FeedbackItem 
//     key={item.id} 
//     item={item} 
//     handleDelete={handleDelete}
//     />))}</div>
}


export default FeedbackList