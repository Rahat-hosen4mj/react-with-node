import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name,email};

    // POST Data to the server
    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers)
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="App">
      <h3>My own data = {users.length}</h3>
      <form onSubmit={handleUser}>
        <input type="text" name="name" placeholder="Name" />
        <input
          type="email"
          name="email"
          placeholder="
      Email.."
          id="email"
        />
        <input type="submit" value="Submit" />
      </form>
      <ol>
        {
          users.map(user => <li key={user.id}>Name : {user.name} email : {user.email}</li>)
        }
      </ol>
    </div>
  );
}

export default App;
