import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthState, login } from '../actions/auth';
import { Navigate ,useLocation } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const dispatch = useDispatch()
  const auth = useSelector( (state)=>state.auth)
useEffect(() => {
  

  return () => {
    dispatch(clearAuthState());
  }
}, [dispatch])


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('this.emailInputRef', this.emailInputRef)
    // console.log('this.passwordInputRef', this.passwordInputRef)
    // console.log('this.state', this.state);
    // const { email, password } = this.state;

    if (email && password) {
      dispatch(login(email, password));
    }
  };

  const { error, inProgress, isLoggedin } = auth;
    const { from } = location.state || { from: { pathname: '/' } };
    if (isLoggedin) {
      return <Navigate to={from} />;
    }
  return (
    <form className="login-form">
      <span className="login-signup-header">Login</span>
      {error && <div className="alert error-dailog">{error}</div>}
      <div className="field">
        <input
          type="email"
          placeholder="Email"
          required
          // ref={this.emailInputRef}
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Password"
          required
          // ref={this.passwordInputRef}
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <div className="field">
        {inProgress ? (
          <button onClick={handleFormSubmit} disabled={inProgress}>
            Logging in..
          </button>
        ) : (
          <button onClick={handleFormSubmit} disabled={inProgress}>
            Log In
          </button>
        )}
      </div>
    </form>
  );
}


export default Login



// class Login extends Component {
//   constructor(props) {
//     super(props);
//     // this.emailInputRef = React.createRef();
//     // this.passwordInputRef = React.createRef();
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   componentWillUnmount() {
//     this.props.dispatch(clearAuthState());
//   }

//   handleEmailChange = (e) => {
//     this.setState({
//       email: e.target.value,
//     });
//   };

//   handlePasswordChange = (e) => {
//     this.setState({
//       password: e.target.value,
//     });
//   };

//   handleFormSubmit = (e) => {
//     e.preventDefault();
//     // console.log('this.emailInputRef', this.emailInputRef)
//     // console.log('this.passwordInputRef', this.passwordInputRef)
//     console.log('this.state', this.state);
//     const { email, password } = this.state;

//     if (email && password) {
//       this.props.dispatch(login(email, password));
//     }
//   };

//   render() {
//     const { error, inProgress, isLoggedin } = this.props.auth;
//     const { from } = this.props.location.state || { from: { pathname: '/' } };
//     if (isLoggedin) {
//       return <Navigate to={from} />;
//     }
//     return (
//       <form className="login-form">
//         <span className="login-signup-header">Login</span>
//         {error && <div className="alert error-dailog">{error}</div>}
//         <div className="field">
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             // ref={this.emailInputRef}
//             onChange={this.handleEmailChange}
//             value={this.state.email}
//           />
//         </div>
//         <div className="field">
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             // ref={this.passwordInputRef}
//             onChange={this.handlePasswordChange}
//             value={this.state.password}
//           />
//         </div>
//         <div className="field">
//           {inProgress ? (
//             <button onClick={this.handleFormSubmit} disabled={inProgress}>
//               Logging in..
//             </button>
//           ) : (
//             <button onClick={this.handleFormSubmit} disabled={inProgress}>
//               Log In
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }
// export default connect(mapStateToProps)(Login);
