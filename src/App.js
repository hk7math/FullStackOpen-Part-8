
import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [reload, setReload] = useState(false)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      setReload(true)
    }
  })

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token 
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
        }
      </div>

      <Authors
        show={page === 'authors'}
        reload={reload}
      />

      <Books
        show={page === 'books'}
        reload={reload}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        page={page}
        token={token}
        reload={reload}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App