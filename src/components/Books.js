import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, reload }) => {
  const [genre, setGenre] = useState('all')
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    result.refetch()
  }, [reload])

  if (!show) {
    return null
  }

  let books = []
  let genres = ['all']
  if (!result.loading) {
    books = result.data.allBooks
    genres = books.reduce((genres, book) => 
        genres.concat(book.genres),
        ['all']
      ).filter((genre, i, genres) => 
        genres.indexOf(genre) === i
      )
  }

  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{genre}</b></p>
      {genres.map(genre => 
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}

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
          {books.filter(book => 
            genre === 'all' || book.genres.includes(genre)
            ).map(b =>
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

export default Books