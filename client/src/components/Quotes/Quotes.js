import React, { useState, useEffect } from 'react';

export default function Quotes() {

    const [quote, setQuote] = useState() // empty array or empty object

    const getQuotes = async() => {
       try {
            const response = await fetch(`http://localhost:5000/quotes`);
 
            const jsonData = await response.json();

            console.log(jsonData.quote)

            setQuote(jsonData.quote)

        } catch (error) {
            console.log(error.message)
        }
    }
    
    useEffect(() => {
        getQuotes()
    }, [])

    return (
        <div>
            <p>{quote}</p>
            <button onClick={getQuotes} >Click</button>
        </div>
    )
}
