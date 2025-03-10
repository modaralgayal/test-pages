import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

export const getAll = () => {
  return axios.get(baseUrl);
};

export const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

export const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

export const updatePerson = (newPerson, newId) => {
  return axios.put(`${baseUrl}/${newId}`, newPerson);
};
