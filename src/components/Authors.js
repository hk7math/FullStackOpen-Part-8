import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH } from '../queries'

const Authors = ({ show, reload }) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [setBirth] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  let authors = []

  useEffect(() => {
    result.refetch()
  }, [reload])

  useEffect(() => {
    setName(name ? name : authors[0] ? authors[0].name : '')
  }, [authors, name])

  if (!show) {
    return null
  }

  if (!result.loading) {
    authors = result.data.allAuthors
  }

  const updateAuthor = () => {
    setBirth({ variables: { name, setBornTo: born|0 }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <div>
        name
        <select onChange={({target}) => setName(authors[target.selectedIndex].name)}>
          {authors.map(a => 
            <option key={a.name}>{a.name}</option>
          )}
        </select>
      </div>
      <div>
        born
        <input value={born} onChange={({target}) => setBorn(target.value)} />
      </div>
      <button onClick={updateAuthor}>update author</button>
    </div>
  )
}

export default Authors
