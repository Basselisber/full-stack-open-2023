import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => {setPersons(initialPersons)})
      }, [])
  console.log('render', persons.length, 'persons')



  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      .then(() => {
        setPersons(persons
          .filter(person => person.name !== name))
      })
    }
  }
// const handleUpdate = (id, newObject) => {
//     if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
//       personService.updateNumber(id, newObject).then(updatedPerson => {
//         setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))}
//       )}
//   }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name : newName , number : newNumber}
    const foundPerson = persons.find(person => person.name === newName)

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )

      ) {
        personService
          .updateNumber(foundPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
          })
          .catch((error) => {
            setStatus("error");
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setStatus(null);
              setMessage(null);
            }, 5000);
          });
      }
    }
    else{

    personService
    .create(newPerson)
    .then(addedPerson => {
      setPersons(persons.concat(addedPerson))})
      setStatus('success')
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setStatus(null)
        setMessage(null)
      }, 5000)
    setNewName('')
    setNewNumber('')
    }
    };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status = {status} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h3>add a new</h3> 
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} handleRemove={handleRemove} />
    </div>
  )
}

export default App