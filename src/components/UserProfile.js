import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import withRouter from './HOC/withRouter';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {addFriend} from '../actions/friends';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            success:null,
            error:null,

        };
    }


  componentDidMount() {
    const { params } = this.props;

    if (params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { params , friends } = this.props;
    const userId = params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () =>{
      const userId = this.props.params.userId;
      console.log("handleAddClick",userId);
      const url = APIUrls.addFriend(userId);

      const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' :`Bearer ${getAuthTokenFromLocalStorage()}`
          }, 
           
      };
      const response = await fetch(url , options);
      const data = await response.json();
      console.log("Handle Add  data",data)

      if(data.success){
          this.setState({
              success:true 
          })

          this.props.dispatch(addFriend(data.data.friendship))
      }else{
          this.setState({
              success:null,
              error : data.message,
          });
      }
  };

  render() {
    const { params, profile } = this.props;

    console.log('this.props', params);
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading..</h1>;
    }

    const {success , error} = this.state;
    const isUserAFriend = this.checkIfUserIsAFriend();

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="btn-grp">
            {!isUserAFriend ? (<button className="button save-btn" onClick={this.handleAddFriendClick}>Add Friend</button>
            ) : (
            <button className="button save-btn">Remove Friend</button>
            )}

            {success && <div className="alert success-dailog">Friend Added Successfully</div>}
            {error && <div className="alert error-dailog">{error}</div>}
          
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStateToProps)(withRouter(UserProfile));
