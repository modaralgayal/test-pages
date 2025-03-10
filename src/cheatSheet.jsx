import { useEffect, useState } from "react";
import {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
} from "./services/persons";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll().then((response) => {
      console.log("Fetched persons: ", response.data);
      setPersons(response.data);
    });
  }, []);

  const handleAddName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      // If name already exists, confirm to update
      const confirmation = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmation) {
        // If confirmed, update the person
        updatePerson(newPerson, nameExists.id).then((updatedPerson) => {
          const updatedPersons = persons.map((person) => {
            if (person.id === nameExists.id) {
              return updatedPerson.data; // Replace with updated person
            }
            return person;
          });
          setPersons(updatedPersons); // Update state with updated list
        });
      }
    } else {
      // If name doesn't exist, add a new person
      addPerson(newPerson).then((response) => {
        setPersons([...persons, response.data]); // Add the new person
      });
    }

    // Clear input fields
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (personId, name) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmation) {
      // Delete person and update the state
      deletePerson(personId).then(() => {
        const updatedPersons = persons.filter(
          (person) => person.id !== personId
        );
        setPersons(updatedPersons); // Remove the deleted person from state
      });
    }
  };

  const filteredPersons = persons.filter((value) =>
    value.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <h2>Filter shown with</h2>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>debug: {filter}</div>
      <h2>Add new</h2>
      <form>
        <div>
          <tbody>
            <tr>
              <td>name: </td>
              <td>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>number: </td>
              <td>
                <input
                  type="text"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => handleDelete(person.id, person.name)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
