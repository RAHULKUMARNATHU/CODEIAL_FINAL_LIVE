import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostsList ,FriendsList ,Chat } from './';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    console.log('props', this.props);
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
        {isLoggedin && <Chat />}
      </div>
    );
  }
}

function mapStateToProps({ friends }) {
  return {
    friends,
  };
}

export default connect(mapStateToProps)(Home);
