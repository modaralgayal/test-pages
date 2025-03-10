import { useEffect, useState } from "react";
import { getAll } from "./services/contacts";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll().then((response) => {
      // console.log("This is the response: " , response)
      console.log("Fetched persons: ", response.data);
      setPersons(response.data);
    });
  }, []);

  const handleAddName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    setPersons([...persons, newPerson]);
    setNewName("");
  };

  const newArray = persons.filter((value) =>
    value.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <h2>FIlter shown with</h2>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>debug: {filter}</div>
      <h2>Add new</h2>
      <form>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div>debug: {newName}</div>
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>
            add
          </button>
        </div>
      </form>

      <table className="renderNames">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {newArray.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
