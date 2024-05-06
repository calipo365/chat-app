import axios from 'axios';
import React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const User = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>({user_id:0, username:""})
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const [dialogUser, setDialogUser] = React.useState<User>({ username: "", user_id: -1})
    const handleDeleteDialog = (user: User) => {
        setDialogUser(user)
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDialogUser({ username: "", user_id: -1})
        setOpenDeleteDialog(false);
    };

    React.useEffect(() => {
        const getUser = () => {
            axios.get('http://localhost:3000/api/users/' + id)
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setUser(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getUser()
    }, [id])

    const deleteUser = (user: User) => {
        axios.delete('http://localhost:3000/api/users/' + user.user_id)
            .then((response) => {
                navigate('/users')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const updateUsernameState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    
    const updateUser = (event: React.FormEvent<HTMLFormElement>, user: User) => {
        event.preventDefault(); 
        if (username === "") {
            alert("Please enter a valid username!");
        } else {
            axios.put('http://localhost:3000/api/users/' + user.user_id, { username }) 
                .then((response) => {
                    navigate('/users')
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString())
                });
        }
    };
    if (errorFlag) {
        return (
            <div>
                <h1>User</h1>
                <div style={{ color:"red" }}>
                    {errorMessage}
                </div>
                <Link to={"/users"}> Back to users </Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>User</h1>
                <h6> {user.user_id}: {user.username}</h6>
                <Link to={"/users"}> Back to users </Link>
                <h1>  </h1>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateUserModal">
                    Edit
                </button>
                    <div className="modal fade" id="updateUserModal" tabIndex={-1} role="dialog"
                        aria-labelledby="updateUserModalLabel" aria-hiddden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="updateUserModalLabel">Update User</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-footer">
                                        <form onSubmit={(e) => updateUser(e, user)}>
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
                <Button variant="outlined" endIcon={<DeleteIcon />} onClick={(event) => { handleDeleteDialog(user) }}>
                    Delete
                </Button>
                <Dialog
                    open={openDeleteDialog}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Delete User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button variant="outlined" color="error" onClick={() => {
                            deleteUser(user)
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default User;