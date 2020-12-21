import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ME, RECOMMEND } from '../queries'

const Recommendations = ({ show, token, page, reload }) => {
  const [getMe, resMe] = useLazyQuery(ME)
  const [getRecommend, resRecommend] = useLazyQuery(RECOMMEND)
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (resMe.data) {
      resMe.refetch()
    } else {
      getMe() 
    }
  }, [getMe, token, reload])

  useEffect(() => {
    if (!resMe.loading && resMe.data && resMe.data.me) {
      setGenre(resMe.data.me.favoriteGenre)
    }
  }, [resMe])

  useEffect(() => {
    if (genre !== '') {
      if (resRecommend.data) {
        resRecommend.refetch()
      } else {
        getRecommend({ variables: { genre }})
      }
    }
  }, [genre, getRecommend, page])

  useEffect(() => {
    if (resRecommend.called && !resRecommend.loading) {
      setBooks(resRecommend.data.allBooks)
    }
  }, [resRecommend])

  if (page!=='recommend') {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations