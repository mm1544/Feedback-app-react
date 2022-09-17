// Need "useEffect" because we want to run (fetch data??) as soon as page loads
import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  // For spinner when waiting for data to be fetched. Will set IT initially to 'true' untill it is loading, and then will set it to 'false'.
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    // when we click "edit" icon, edit var will be set to True - meaning that we are in "editing" mode. If it is not clicked, then it will be set to False.
    edit: false,
  })

  useEffect(() => {
    // Will run this when the page loads
    fetchFeedback()
  }, [])

  // Fetch feedback data from JSON mock server
  const fetchFeedback = async () => {
    // Fetch API returns a promise(!!), so will use 'async/await'
    // JSON Server alows to sort data with '?_sort=id'
    // Proxy is set for "“http://localhost:5000”"
    const response = await fetch('/feedback?_sort=id&order=desc/')

    // Will wait for response and will get JSON data
    const data = await response.json()

    // Adding fetched data to the state
    setFeedback(data)
    // It should hide the spinner
    setIsLoading(false)
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are You Sure You Want To Delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    // ADDING TO MOCK SERVER
    // Don't need 'http://localhost...' because proxy is set
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // "SON.stringify()" turns into JSON string
      body: JSON.stringify(newFeedback),
    })

    // For response; that's a new feedback
    const data = await response.json()

    // Filling with the data that is sent back from the backend
    setFeedback([data, ...feedback])
  }

  // Update feedback item
  // @updItem - new/updated item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    // Callback func. will loop through each 'feedback' item and if item's id match passed-in id, then it will return updated state, if not - then will return 'old'/not-updated item
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )

    // To clear feedbackEdit state
    setFeedbackEdit({
      item: {},
      // when we click "edit" icon, edit var will be set to True - meaning that we are in "editing" mode. If it is not clicked, then it will be set to False.
      edit: false,
    })
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
        isLoading,
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
