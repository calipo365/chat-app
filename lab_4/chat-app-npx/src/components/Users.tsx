import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = React.useState < Array < User >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState(" ")
    const [username, setUsername] = React.useState("")

    React.useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage(" ")
                setUsers(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            }
        )
    }

    const list_of_users = () => {
        return users.map((item: User) =>
            <tr key={item.user_id}>
                <th scope="row">{item.user_id}</th>
                <td>{item.username}</td>
                <td><Link to={"/users/" + item.user_id}>Go to
                    user</Link></td>
            </tr>
        )
    }

    const addUser = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault(); 
        if (username === "") { 
            alert("Please enter a username!")
        } else { 
            axios.post('http://localhost:3000/api/users', { "username": username }) 
            .then((response) => {
                navigate('/users')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
        }
    } 

    const updateUsernameState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    if (errorFlag) {
        return (
            <div>
                <h1>Users</h1>
                <div style={{ color: "red" }}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Users</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_of_users()}
                        </tbody>
                    </table>
                    <button type="button" className=" btn btn-primary" data-toggle="modal" data-target="#addUserModal">
                        Add user
                    </button>
                <div className="modal fade" id="addUserModal" tabIndex={-1} role="dialog"
                    aria-labelledby="addUserModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                </div>
                                <div className="modal-footer">
                                    <form onSubmit={addUser}> 
                                        <input type="text" value={username} onChange={updateUsernameState} /> 
                                        <input type="submit" value="Submit" />
                                    </form> 
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Users;