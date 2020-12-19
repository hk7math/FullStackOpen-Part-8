import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ME, RECOMMEND } from '../queries'

const Recommendations = ({ show, token }) => {
  const [getMe, resMe] = useLazyQuery(ME)
  const [getRecommend, resRecommend] = useLazyQuery(RECOMMEND)
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    console.log('getMe');
    if (resMe.data) {
      resMe.refetch()
    } else {
      getMe()
    }
  }, [getMe, token])

  useEffect(() => {
    console.log(resMe)
    if (!resMe.loading && resMe.data && resMe.data.me) {
      setGenre(resMe.data.me.favoriteGenre)
    }
  }, [resMe])

  useEffect(() => {
    console.log('getRecommend')
    if (genre !== '') {
      console.log(genre || 'empty');
      getRecommend({ variables: { genre }})
    }
  }, [genre, getRecommend])

  useEffect(() => {
    console.log(resRecommend);
    if (resRecommend.called && !resRecommend.loading) {
      setBooks(resRecommend.data.allBooks)
    }
  }, [resRecommend])

  if (!show) {
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