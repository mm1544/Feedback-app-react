import { createContext, useState } from 'react'
// Package to generate IDs
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is feedback item 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This is feedback item 3',
      rating: 7,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    // when we click "edit" icon, edit var will be set to True - meaning that we are in "editing" mode. If it is not clicked, then it will be set to False.
    edit: false,
  })

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are You Sure You Want To Delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Update feedback item
  // @updItem - new/updated item
  const updateFeedback = (id, updItem) => {
    // Callback func. will loop through each 'feedback' item and if item's id match passed-in id, then it will return updated state, if not - then will return 'old'/not-updated item
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        // States
        feedback,
        feedbackEdit,
        // Functions
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
