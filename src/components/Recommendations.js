import React from 'react'
import { useQuery } from '@apollo/client'
import { RECOMMEND } from '../queries'

const Recommendations = (props) => {
  const result = useQuery(RECOMMEND)

  if (!props.show) {
    return null
  }

  let books = []
  let genre = ''
  if (!result.loading) {
    genre = result.data.me.favoriteGenre
    books = result.data.allBooks
      .filter(book => 
        book.genres.includes(genre)
      )
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