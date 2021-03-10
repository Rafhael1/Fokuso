import React, {useState, useEffect} from 'react';

import './Quotes.scss'

export default function Quotes() {

  const [quote,
    setQuote] = useState()
  const [quoteAuthor,
    setQuoteAuthor] = useState()

  const getQuotes = async() => {
    try {

        const baseURL = process.env.NODE_ENV === 'production' ? `quotes` : `http://localhost:5000/api/quotes`

      const response = await fetch(baseURL);

      const jsonData = await response.json();

      setQuote(jsonData.quote)

      setQuoteAuthor(jsonData.author)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getQuotes()
  }, [])

  return (
    <div className="Quotes">
      <p>"{quote}" - {quoteAuthor}</p>
    </div>
  )
}
