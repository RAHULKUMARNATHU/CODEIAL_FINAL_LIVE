import React from 'react';
import { Link } from 'react-router-dom';


function FriendsListItem(props) {
    return (
        <div>
            <Link className ="friends-item" to ={`user/${props.friend._id}`}>
            <div className="friends-img">
                <img
                src=""
                alt="user-pic"
                />

            </div>
            <div className="friends-name">{props.friend.email}</div>
            </Link>
        </div>
    );
}

export default FriendsListItem;