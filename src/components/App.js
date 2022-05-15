import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router , Route  } from 'react-router-dom';

import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup } from './';
import  jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { Routes} from 'react-router-dom';

// const Login = () => <div> Login </div>;
// const Signup = () => <div>SignUp</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  
  }

  render() {
    const { posts } = this.props;

    return (
      <Router>
        <div>
          <Navbar />
      
          <Routes>
            <Route
              exact
              path="/"
              element={
              <Home posts={posts} />
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element = {<Page404/>} />
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
