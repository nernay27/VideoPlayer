import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import { Container } from '@mui/system';
function CommentsSec(props) {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0();
    const handleEdit = () => {
        alert("The button was clicked")
    }
    return (
        <div className="card">
            <div className="card-header">
                {props.Email}

            </div>
            <div className="card-body">
                <p className="card-text">{props.comment}</p>
                <a href="#" className="btn btn-primary">Like</a>
                <a href="#" className="btn btn-primary">DisLike</a>
                {(props.Email === user?.email ? (<Button  variant="warning" onClick={handleEdit}>Edit</Button>) : (""))}
            </div>
        </div>
    )
}

export default CommentsSec