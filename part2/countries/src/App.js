import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then( response => 
      setCountries(
        response.data.map(({name,capital,area,languages,flags}) => ({ 
          name: name.common, 
          capital, 
          area,
          languages, 
          flags, 
        }))
      )
    )
  }, [])


  console.log(countries);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('search term: ', searchTerm);
  }
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <form
        onSubmit={handleSearchSubmit}
      >
        <div>
          <p>find countries
          <input
            value={searchTerm}
            onChange={handleSearchChange}
          />
          </p>
          {filteredCountries.length > 10 && (
            <div>Too many matches, specify another filter</div>
            )}
            {filteredCountries.length <= 10 && filteredCountries.length > 1 && filteredCountries.map(
              country => 
              <div key = {country.name} >{country.name}<button onClick={() => setSearchTerm(country.name)}>show</button></div>)}
            {filteredCountries.length === 1 && (
              <>
               <h1>{filteredCountries[0].name}</h1>
               <div>capital {filteredCountries[0].capital}</div>
               <div>area {filteredCountries[0].area}</div>
                <h2>languages</h2>
                <ul>
                  {Object.values(filteredCountries[0].languages).map(
                    language => <li key = {language}>{language}</li>
                  )}
                </ul>
                <div><img src = {filteredCountries[0].flags.png} alt={`${filteredCountries[0].name} flag`}/></div> 
              </>
            )}
        </div>
      </form>
    </div>
);

}

  

export default App;
