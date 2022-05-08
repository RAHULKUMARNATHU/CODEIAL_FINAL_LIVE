import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
// import {PostsList} from './'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <nav className="nav">
          <div className="left-div">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </div>

          <div className="search-container">
            <img
              className="search-icon"
              src="https://cdn-icons-png.flaticon.com/512/1296/1296902.png"
              alt="search-icon"
            />
            <input placeholder="Search" />
            <div className="search-results">
              <ul>
                <li className="search-results-row">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user-dp"
                  />
                  <span>Nathu</span>
                </li>

                <li className="search-results-row">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user-dp"
                  />
                  <span>Nathu</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-nav">
            <div className="user">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                id="user-dp"
                alt="user-dp"
              />
              <span>Nathu</span>
            </div>
            <div className="nav-links">
              <ul>
                <li>Log in</li>
                <li>Log out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <PostsList posts={posts}/> */}
        <div className="posts-list">
          {posts.map((post) => (
            <div className="post-wrapper" key={post._id}>
              <div className="post-header">
                <div className="post-avatar">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user-pic"
                  />
                  <div>
                    <span className="post-author">{post.user.name}</span>
                    <span className="post-time"> a minute ago </span>
                  </div>
                </div>

                <div className="post-content">{post.content}</div>

                <div className="post-actions">
                  <div className="post-like">
                    <img
                      src="https://cdn-icons.flaticon.com/png/512/3128/premium/3128313.png?token=exp=1651999951~hmac=a3b5c48979d0e8bd8106da4af2cc56c8"
                      alt="likes-icon"
                    />
                    <span>{post.likes.length}</span>
                  </div>

                  <div className="post-comments-icon">
                    <img
                      src="https://cdn-icons.flaticon.com/png/512/3608/premium/3608194.png?token=exp=1652000220~hmac=1dccf315d18ca1c00f8ddc7e0e8e2b21"
                      alt="comments-icon"
                    />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="post-comment-box">
                  <input placeholder="Start typing a comment" />
                </div>
                <div className="post-comments-list">
                  <div className="post-comments-item">
                    <div className="post-comment-header">
                      <span className="post-comment-author"> RAHUL </span>
                      <span className="post-comment-time">a minute ago </span>
                      <span className="post-comment-likes"> 1k </span>
                    </div>
                    <div className="post-comment-content">it's WOW !!</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
