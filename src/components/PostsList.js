import React,{Component} from 'react'
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="posts-list">
          {posts.map((post) => (
            <div className="post-wrapper" key={post._id}>
              <div className="post-header">
                <div className="post-avatar">
                  <Link to = {`/user/${post.user._id}`}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    alt="user-pic"
                  />
                  </Link>
                  <div>
                    <span className="post-author">{post.user.name}</span>
                    <span className="post-time"> a minute ago </span>
                  </div>
                </div>

                <div className="post-content">{post.content}</div>

                <div className="post-actions">
                  <div className="post-like">
                    <img
                      src="https://cdn-icons.flaticon.com/png/512/3128/premium/3128313.png?token=exp=1653405950~hmac=9c8940a74d3fa9511334866634f953e9"
                      alt="likes-icon"
                    />
                    <span>{post.likes.length}</span>
                  </div>

                  <div className="post-comments-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/1381/1381552.png"
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
    )
  }
}


PostsList.propTypes = {
  posts : PropTypes.array.isRequired
}

export default PostsList;