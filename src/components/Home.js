import React, { Component } from 'react'
import { connect } from 'react-redux'
import {PostsList} from './'
import FriendsList from './FreindsList'

class Home extends Component {
  render() {
    const {posts ,friends ,isLoggedin} = this.props
    console.log('props', this.props)
    return (
      <div className='home'>
          <PostsList posts={posts} />
          {isLoggedin && <FriendsList friends={friends} />}
      </div>
    )
  }
}

function mapStateToProps({ friends }) {
  return {
    friends,
  };
}

export default connect(mapStateToProps) (Home);