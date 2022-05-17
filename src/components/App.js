import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router , Navigate, Route  } from 'react-router-dom';

import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup } from './';
import  jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { Routes} from 'react-router-dom';
// import { useAuth } from "react-use-auth";

// const Login = () => <div> Login </div>;
// const Signup = () => <div>SignUp</div>;
const Settings = () => <div>Settings</div>;

const PrivateRoute = (children) => {
  console.log("comming..")
  const { isLoggedin ,path , element:Element} = children;
  return <Routes><Route path = {path} render={(props)=>{
    return isLoggedin ? <Element {...props} /> : <Navigate to = "login" />
  }}/></Routes>
}


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
    const { posts ,auth } = this.props;

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
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} isLoggedin ={auth.isLoggedin} />
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
    auth:state.auth
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
