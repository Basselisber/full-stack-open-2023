import Person from './Person';
const Persons = ({persons, searchTerm, handleRemove}) => {
    return (
        <div>
        {persons
            .filter(person => person.name.toLowerCase().includes(searchTerm))
            .map(({name,number,id}) => (
                <Person 
                key={id}
                name={name} 
                number={number} 
                handleRemove={() => handleRemove(id,name)}
                />
            ))} 
        </div>
)
}
export default Persons;