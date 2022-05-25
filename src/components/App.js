import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router , Route  } from 'react-router-dom';

import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup ,Settings ,UserProfile} from './';
import  jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { Routes ,useNavigate ,useLocation} from 'react-router-dom';
// import { useAuth } from "react-use-auth";

import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';


// const Login = () => <div> Login </div>;
// const Signup = () => <div>SignUp</div>;
// const Settings = () => <div>Settings</div>;

const PrivateRoute = ({children , isLoggedin}) => {
const navigate = useNavigate();
const location = useLocation();
    return isLoggedin ? children : navigate('/login',{state:{from:location.pathname}});
 
}


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  
    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);

     
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends())
    }
  
  }

  render() {
    const { posts ,auth ,friends } = this.props;

    return (
      <Router>
        <div>
          <Navbar />
      
          <Routes>
            <Route
              exact
              path="/"
              element={
              <Home posts={posts}
              friends={friends}
              isLoggedin={auth.isLoggedin} />
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/settings" element={<PrivateRoute  isLoggedin ={auth.isLoggedin}><Settings /> </PrivateRoute>} />
            <Route path="/user/:userId" element={<PrivateRoute  isLoggedin ={auth.isLoggedin}><UserProfile /> </PrivateRoute>} />
            
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
