import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loader from "../../components/styled-components/loader/loader";

// import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

import { loginUser } from "../../redux/actions";
import { isUserAuthenticated } from "../../helpers/authUtils";
// import Loader from "../../components/Loader";
import logo from "../../assets/images/logo-dark.png";
import PhoneNumber from "../../components/form/components/Countrycode";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { InputGroup } from "../../components/inputGroup/InputGroup";
import Base64 from "../../utils/base64";
import { useDispatch, useSelector } from "react-redux";
// import { postLoginUser } from "../../redux/login/actions";
import { postLoginUser, loginSelector } from "../../redux/slices/loginSlice";
import "./Login.css";
import Dashboard from "../Dashboard";

function Login() {
  const userLoginToken = localStorage.getItem("userLoginToken");

  const [token, setToken] = useState(userLoginToken);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //   if (token) {
  //     history.push('/dashboard')
  //     }
  // }, []);

  const assetPlanetClientName = "asset_planet_resource";
  const assetPlanetClientPassword = "a_p_creds";
  const basicCreds = Base64.btoa(
    assetPlanetClientName + ":" + assetPlanetClientPassword
  );

  const config = {
    headers: {
      "Content-type": "Application/json",
      Authorization: "Basic " + basicCreds,
    },
  };

  const user = useSelector((state) => state.rootReducer.loginUser);
  const dispatch = useDispatch();

  // const loginUser = useSelector(loginSelector);

  const [password, setPassword] = useState(false);
  const [username, setUserName] = useState(false);
  const [phoneNumber, setphoneNumber] = useState(false);

  const [userData, setUserData] = useState({});

  const history = useHistory();

  const handleKeyPress = (event) => {
    // console.log("here in key enter", event.key)
    if (event.key === "Enter") {
      // if (document.getElementById("username").value.length === 0) {
      //   setUserName(true);
      // } else {
      //   setUserName(false);
      // }

      // if (document.getElementById("password").value.length === 0) {
      //   setPassword(true);
      // } else {
      //   setPassword(false);
      // }

      // if (
      //   document.getElementById("username").value.length === 0 ||
      //   document.getElementById("password").value.length === 0
      // ) {
      // } else {
        console.log("here on key enter")
        if (userData.hasOwnProperty('userName') || userData.hasOwnProperty('password')) {
          delete userData.phone
        }
        dispatch(postLoginUser(userData, config, history, setLoading));
      // }
    }
  };

  const handleLogin = async () => {
    // if (document.getElementById("username").value.length === 0) {
    //   setUserName(true);
    // } else {
    //   setUserName(false);
    // }

    // if (document.getElementById("password").value.length === 0) {
    //   setPassword(true);
    // } else {
    //   setPassword(false);
    // }


    // if (
    //   document.getElementById("username").value.length === 0 ||
    //   document.getElementById("password").value.length === 0
    // ) { } 
    // else {
    console.log("key pressesddd...click")
    if (userData.hasOwnProperty('userName') || userData.hasOwnProperty('password')) {
      delete userData.phone
    }
    dispatch(postLoginUser(userData, config, history, setLoading));
    // }
  };

  return token ? (
    <Redirect to="/dashboard" />
  ) : (
    <div style={{ marginTop: "20px" }}>
      {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
      <div className="login-card border">
        <h2 className="login-heading">Login</h2>
        <div>
          <InputGroup>
            <label>Username</label>
            <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>

          {/* {username ?(
            <div style={{ color: "red",textAlign:"left" }}>Please enter username</div>
          ):<div></div>} */}

          <InputGroup>
            <label>Password</label>
            <Input
              onChange={(e) => {
                setUserData({ ...userData, [e.target.name]: e.target.value });
              }}
              onKeyPress={handleKeyPress}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            ></Input>
          </InputGroup>

          {phoneNumber ?
            (password && username ? (
              <div
                style={{ color: "red", textAlign: "left", paddingBottom: "20px" }}
              >
                Please enter Username and Password
              </div>
            ) : username ? (
              <div
                style={{ color: "red", textAlign: "left", paddingBottom: "20px" }}
              >
                Please enter Username{" "}
              </div>
            ) : password ? (
              <div
                style={{ color: "red", textAlign: "left", paddingBottom: "20px" }}
              >
                Please enter Password{" "}
              </div>
            ) : user.loading ? (
              <div style={{ paddingBottom: "20px", paddingBottom: "20px" }}>
                Loading.....
              </div>
            ) : (
              <div style={{ color: "red", paddingBottom: "20px" }}>
                {user.error}
              </div>
            ))
            : <React.Fragment></React.Fragment>
          }

          <Button
            onClick={() => {
              handleLogin();
              // console.log("userData....",userData)
            }}
            disabled={user.loading}
          >
            Login
          </Button>

          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <InputGroup>
              <label>Don't have an account? <dvi style={{ color: "rgb(57, 181, 74" }}><a href="/sign-up">Sign up</a></dvi></label>
              <label>Are You Trusted Individual? <dvi style={{ color: "rgb(57, 181, 74" }}><a href="/trusteeLogin">Login here</a></dvi></label>

            </InputGroup>
          </div>
        </div>
      </div>
      <Loader isLoading={loading}></Loader>

    </div>
  );
}

export default Login;

// <div style={{ marginTop: "20px" }}>
// {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
// <div className="login-card border">
//   <h2 className="login-heading">Login</h2>
//   <div>
//     <InputGroup>
//       <label>Username</label>
//       <Input
//         onChange={(e) => {
//           setUserData({ ...userData, [e.target.name]: e.target.value });
//         }}
//         type="text"
//         placeholder="Username"
//         name="username"
//       ></Input>
//     </InputGroup>

//     <InputGroup>
//       <label>Password</label>
//       <Input
//         onChange={(e) => {
//           setUserData({ ...userData, [e.target.name]: e.target.value });
//         }}
//         type="password"
//         placeholder="Password"
//         name="password"
//       ></Input>
//     </InputGroup>

//     {user.loading ? (
//       <div style={{ paddingBottom: "15px" }}>Loading.....</div>
//     ) : (
//       <div style={{ color: "red", paddingBottom: "15px" }}>
//         {user.error}
//       </div>
//     )}

//     <Button
//       onClick={() => {
//         handleLogin();
//       }}
//       disabled={user.loading}
//     >
//       Login
//     </Button>
//   </div>
// </div>
// </div>

// ========== Login using class based component =============

// class Login extends Component {
//     _isMounted = false;

//     constructor(props) {
//         super(props);

//         this.handleValidSubmit = this.handleValidSubmit.bind(this);
//         this.state = {
//             username: 'test',
//             password: 'test'
//         }
//     }

//     // componentDidMount() {
//     //     this._isMounted = true;
//     //     document.body.classList.add('authentication-bg');
//     // }

//     // componentWillUnmount() {
//     //     this._isMounted = false;
//     //     document.body.classList.remove('authentication-bg');
//     // }

//     /**
//      * Handles the submit
//      */
//     handleValidSubmit = (event, values) => {
//         this.props.loginUser(values.username, values.password, this.props.history);
//     }

//     /**
//      * Redirect to root
//      */
// renderRedirectToRoot = () => {
//     const isAuthTokenValid = isUserAuthenticated();
//     if (isAuthTokenValid) {
//         return <Redirect to='/' />
//     }
// }

//     render() {
//         const isAuthTokenValid = isUserAuthenticated();
//         return (

//             <React.Fragment>

//                 {/* {this.renderRedirectToRoot()} */}

//                 {/* {(this._isMounted || !isAuthTokenValid) &&  */}
//                 <React.Fragment>

//                     <div className="account-pages mt-5 mb-5">
//                         <Container>
//                             <Row className="justify-content-center">
//                                 <Col md={8} lg={6} xl={5} >
//                                     <Card>
//                                         <CardBody className="p-4 position-relative">
//                                             { /* preloader */}
//                                             {/* {this.props.loading && <Loader />} */}

//                                             <div className="text-center mb-1">
//                                                 <h4 className="text-uppercase mt-0">Sign In</h4>
//                                             </div>
// {/*
//                                             {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
//                                                 <div>{this.props.error}</div>
//                                             </Alert>} */}

//                                             <AvForm onValidSubmit={this.handleValidSubmit}>
//                                                 <AvField name="username" label="Username" placeholder="Enter your username" value={this.state.username} required />

//                                                 <AvGroup className="mb-3">
//                                                     <Label for="password">Password</Label>
//                                                     <AvInput type="password" name="password" id="password" placeholder="Enter your password" value={this.state.password} required />
//                                                     <AvFeedback>This field is invalid</AvFeedback>
//                                                 </AvGroup>

//                                                 <FormGroup>
//                                                     <Button color="primary" className="btn-block">Log In</Button>
//                                                 </FormGroup>

//                                                 <p><strong>Username:</strong> test &nbsp;&nbsp; <strong>Password:</strong> test</p>
//                                             </AvForm>
//                                         </CardBody>
//                                     </Card>
//                                 </Col>
//                             </Row>

//                             <Row className="mt-1">
//                                 <Col className="col-12 text-center">
//                                     <p><Link to="/forget-password" className="text-muted ml-1"><i className="fa fa-lock mr-1"></i>Forgot your password?</Link></p>
//                                     <p className="text-muted">Don't have an account? <Link to="/register" className="text-dark ml-1"><b>Register</b></Link></p>
//                                 </Col>
//                             </Row>

//                         </Container>
//                     </div>
//                 </React.Fragment>
//                 {/* // } */}
//             </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     const { user, loading, error } = state.Auth;
//     return { user, loading, error };
// };

// export default connect(mapStateToProps, { loginUser })(Login);
