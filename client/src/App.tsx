import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const base_url = "http://localhost:3001";

interface User {
  id: number;
  name: string;
  age: number;
}

function App() {
  const [count, setCount] = useState(0);
  const [sortValue, setSortValue] = useState("asc");
  const [newUserValue, setNewUserValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios
      .get(`${base_url}/api/users`)
      .then((res) => {
        const { users } = res.data;
        setUsers(users);
      })
      .catch((err) => console.log("Error in fetching users", err));
  }, []);

  const renderUsers = () => {
    return users
      .filter((user: User) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .toSorted((a, b) => {
        if (sortValue === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
      .map((user: User) => (
        <div className="user" key={user.id}>
          <span>{user.name}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDeleteUser(user.id);
            }}
          >
            X
          </button>
        </div>
      ));
  };

  const onDeleteUser = (id: any) => {
    axios
      .delete(`${base_url}/api/users/${id}`)
      .then((res) => {
        const { users } = res.data;
        setUsers(users);
        setNewUserValue("");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onAddNewUser = () => {
    axios
      .post(
        `${base_url}/api/users`,
        {
          user: newUserValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const { users } = res.data;
        setUsers(users);
        setNewUserValue("");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="container">
      <div className="main">
        <div className="options">
          <strong>Options</strong>
          <div className="options-buttons">
            <button onClick={() => setSortValue("asc")}>Sort Asc</button>
            <button onClick={() => setSortValue("desc")}>Sort Desc</button>
          </div>
        </div>
        <div className="options">
          <strong>Filter</strong>
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className="options">
          <strong>Add User</strong>
          <input
            type="text"
            value={newUserValue}
            onChange={(e) => setNewUserValue(e.target.value)}
          />
          <button style={{ marginTop: "0.5em" }} onClick={onAddNewUser}>
            Add User
          </button>
        </div>
        <div className="user-info">
          <div>
            <strong>User List</strong>
          </div>
          <div className="users">{renderUsers()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
