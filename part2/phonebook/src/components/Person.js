const Person = ({ name, number, handleRemove }) => {
    return (
        <div key = {name} >   
        {name} {number} <button onClick={handleRemove}>delete</button>
        </div>
    )
    }
    export default Person;
