import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostsList, Navbar } from './';
import { Routes } from 'react-router-dom';

const Login = () => <div> Login </div>;
const Signup = () => <div>SignUp</div>;
const Home = () => <div>Home</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;

    return (
      <Router>
        <div>
          <Navbar />

          {/* <PostsList posts={posts}/> */}

          <ul>
          <li>
          <Link to ="/">Home</Link> 
         </li>
         <li>
          <Link to ="/login">Login</Link> 
         </li>
           <li>
          <Link to ="/signup">SignUp</Link> 
         </li>
         </ul>

          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Routes>
        </div>
      </Router>
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

