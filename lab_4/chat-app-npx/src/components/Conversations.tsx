import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Conversations = () => {
    const navigate = useNavigate();
    const [conversations, setConversations] = React.useState < Array < Conversation >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState(" ")
    const [convo_name, setConvo_Name] = React.useState("")

    React.useEffect(() => {
        getConversations()
    }, [])

    const getConversations = () => {
        axios.get('http://localhost:3000/api/conversations')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage(" ")
                setConversations(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            }
        )
    }

    const list_of_conversations = () => {
        return conversations.map((item: Conversation) =>
            <tr key={item.convo_id}>
                <th scope="row">{item.convo_id}</th>
                <td>{item.convo_name}</td>
                <td>{item.created_on.toLocaleString()}</td>
                <td><Link to={"/conversations/" + item.convo_id}>
                    Go to Conversation</Link></td>
            </tr>
        )
    }

    const addConversation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (convo_name === "") {
            alert("Please enter a name for the conversation!")
        } else {
            axios.post('http://localhost:3000/api/conversations', { "convo_name": convo_name })
                .then((response) => {
                    navigate('/conversations')
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
    }

    const updateConvo_NameState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConvo_Name(event.target.value);
    };

    if (errorFlag) {
        return (
            <div>
                <h1>Conversations</h1>
                <div style={{ color: "red" }}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Conversations</h1>
                    <table className='Table'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Conversation Name</th>
                                <th scope='col'>Date Created</th>
                                <th scope='col'>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_of_conversations()}
                        </tbody>
                    </table>
                    <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#addConversationModal'>
                        Add Conversation
                    </button>
                <div className='modal fade' id='addConversationModal' tabIndex={-1} role='dialog'
                    aria-labelledby='addConversationModalLabel' aria-hidden='true'>
                        <div className='modal-dialog' role='document'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <h5 className='modal-title' id='addConversationModalLabel'>Add Conversation</h5>
                                    <button type='button' className='close' data-dismiss='modal' aria-label='close'>
                                                <span aria-hidden='true'>&times;</span>
                                            </button>
                                </div>
                                <div className='modal-footer'>
                                    <form onSubmit={addConversation}>
                                        <input type='text' value={convo_name} onChange={updateConvo_NameState} />
                                        <input type='submit' value='Submit' />
                                    </form>
                                    <button type='button' className='btn btn-secondary' data-dismiss='modal'>
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


export default Conversations;