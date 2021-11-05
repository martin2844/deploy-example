import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [error, isError] = useState(false);
  const [newUser, setNewUser] = useState("")

  useEffect(() => {
    axios.get("api/user/all").then((x) => {
      console.log(x.data);
      setUsers(x.data);
    }).catch((x) => {
      console.log(x);
      isError(x);
      setTimeout(() => {
        isError(false)
      }, 2000)
    })
  }, [])

  console.log("Users", users)

  const addUser = (e) => {
    e.preventDefault();
      axios.post("api/user/create", {
        name: newUser
      }).then((x) => {
        setUsers([...users, x.data]);
        setNewUser("")
      }).catch((x) => {
        console.log(x);
        isError(x);
        setTimeout(() => {
          isError(false)
        }, 2000)
      })
  }

  return (
    <div className="App">
      <h1>Users</h1>
      {(users && users.length > 0) ?     
      <div>
        {
          users.map((user) =>{
            return <p key={user._id}>{user.name}</p>
          })
        }
      </div> : "Loading users"
      }

      <form onSubmit={(e) => addUser(e)}>
        <label>Add new User</label>
        <br />
        <input placeholder="user name" value={newUser} onChange={e => setNewUser(e.target.value)} />
        <button>Add user</button>
      </form>
      <br />
      {error && JSON.stringify(error)}

    </div>
  );
}

export default App;
