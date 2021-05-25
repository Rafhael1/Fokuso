import React, {useState, useEffect} from 'react';

// Style

import './Quotes.scss'

// Skeleton Loading Effect
import { SkeletonBlock } from "skeleton-elements/react";

export default function Quotes() {

  // states
  const [ quote, setQuote ] = useState();
  const [ quoteAuthor, setQuoteAuthor ] = useState();

  //
  const getQuotes = async() => {
    try {

      const baseURL = process.env.NODE_ENV === 'production' ? `api/quotes` : `http://localhost:5001/api/quotes`

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
      {
        !quote && !quoteAuthor ? 
          <SkeletonBlock tag="p" width="300px" height="30px" borderRadius="5px" effect="wave" />
          :
          <p>"{quote}" - {quoteAuthor}</p>
      }
    </div>
  )
}
