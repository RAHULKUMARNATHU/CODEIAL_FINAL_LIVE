import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../actions/profile';
import withRouter from './HOC/withRouter';

class UserProfile extends Component {
  componentDidMount() {
    const { params } = this.props;

    if (params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { params, friends } = this.props;
    const userId = params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  render() {
    const { params, profile } = this.props;

    console.log('this.props', params);
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading..</h1>;
    }

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
            {!isUserAFriend ? (<button className="button save-btn">Add Friend</button>
            ) : (
            <button className="button save-btn">Remove Friend</button>) }
          
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
