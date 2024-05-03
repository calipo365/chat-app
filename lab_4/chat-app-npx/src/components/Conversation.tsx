import axios from 'axios';
import React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

const Conversation = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [conversation, setConversation] = React.useState<Conversation>({convo_id:0, convo_name:"", created_on: new Date()})
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [convo_name, setConvoName] = React.useState("")

    
    React.useEffect(() => {
        const getConversation = () => {
            axios.get('http://localhost:3000/api/conversations/' + id)
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setConversation(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getConversation()
    }, [id])

    const deleteConversation = (conversation: Conversation) => {
        axios.delete('http://localhost:3000/api/conversations/' + conversation.convo_id)
            .then((response) => {
                navigate('/conversations')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const updateConvoNameState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConvoName(event.target.value);
    }

    const updateConversation = (event: React.FormEvent<HTMLFormElement>, conversation: Conversation) => {
        event.preventDefault();
        if (convo_name === "") {
            alert("Please enter a valid Conversation name!")
        } else {
            axios.put('http://localhost:3000/api/conversations/' + conversation.convo_id, { convo_name })
                .then((reponse) => {
                    navigate('/conversations')
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString())
                });
        }
    };

    if (errorFlag) {
        return (
            <div>
                <h1>Conversations</h1>
                <div style={{ color:"red" }}>
                    {errorMessage}
                </div>
                <Link to={"/conversations"}> Back to Conversations</Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1> Conversation </h1>
                <h6> {conversation.convo_id}: {conversation.convo_name}</h6>
                <Link to={'/conversations'}> Back to Conversations </Link>
                <h1>   </h1>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateConversationModal">
                    Edit
                </button>
                    <div className='modal fade' id='updateConversationModal' tabIndex={-1} role="dialog"
                        aria-labelledby="updateConversationModalLabel" aria-hiddden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className='modal-title' id='updateConversationModalLabel'>Update Conversation</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className='modal-footer'>
                                        <form onSubmit={(e) => updateConversation(e, conversation)}>
                                            <input type="text" value={convo_name} onChange={updateConvoNameState} />
                                            <input type="submit" value="Submit" />
                                        </form>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                {"       "}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deleteConversationModal">
                    Delete
                </button>
                    <div className="modal fade" id="deleteConversationModal" tabIndex={-1} role="dialog"
                            aria-labelledby="deleteConversationModalLabel" aria-hiddden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id ="deleteConversationModalLabel">Delete Conversation</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                    onClick={() => deleteConversation(conversation)}>
                                                        Delete User
                                                    </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>
        )
    }

}

export default Conversation;