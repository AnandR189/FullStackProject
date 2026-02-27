import { useState } from "react";
import axios from "axios";

export default function DBInteraction() {
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const [runn, setrun] = useState("");
  const [country, setCountry] = useState("");
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users", {
        name,
        runn: Number(runn),
        country,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      getUsers();
      setName("");
      setrun("");
      setCountry("");
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/users/`, {
        data: { id: Number(id) },
      });
      getUsers();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/users/`, {
        name,
        runn: Number(runn),
        country,
        id: Number(id),
      });
      setIsEdit(false);
      getUsers();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setName("");
      setrun("");
      setCountry("");
    }
  };

  const handleEditClick = (u) => {
    setIsEdit(true);
    setName(u.name);
    setrun(u.runn);
    setCountry(u.country);
    setId(u.id);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Your Name "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Your run"
        value={runn}
        onChange={(e) => setrun(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Country "
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      {isEdit ? (
        <button onClick={() => editUser(id)}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}
      <hr />
      <button type="submit" onClick={getUsers}>
        {console.log(users)}
        get user
      </button>
      <table border={1}>
        <tr>
          <th>Name</th>
          <th>run</th>
          <th>country</th>
          <th>Actions</th>
        </tr>

        {users &&
          users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.runn}</td>
              <td>{u.country}</td>
              <td style={{ padding: "5px" }}>
                <button
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={() => handleEditClick(u)}
                >
                  Edit
                </button>
                <button
                  style={{ backgroundColor: "red", color: "white" }}
                  value={u.id}
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </table>
    </>
  );
}
