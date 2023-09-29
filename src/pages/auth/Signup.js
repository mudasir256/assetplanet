import React, { Component, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loader from "../../components/styled-components/loader/loader";
import PhoneNumber from "../../components/form/components/Countrycode";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { InputGroup } from "../../components/inputGroup/InputGroup";
import Base64 from "../../utils/base64";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser, loginSelector } from "../../redux/slices/loginSlice";
import "./Login.css";
import Dashboard from "../Dashboard";
// import PhoneNumber from "./Countrycode";
import axios from "axios";
import ROUTES from '../../config/routes';
import swal from "sweetalert";
import moment from 'moment';

function Signup() {
  const userLoginToken = localStorage.getItem("userLoginToken");

  const [token, setToken] = useState(userLoginToken);
  const [loading, setLoading] = useState(false);

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


  const [password, setPassword] = useState(false);
  const [username, setUserName] = useState(false);
  const [userData, setUserData] = useState({});

  const history = useHistory();

  const handleKeyPress = (event) => {
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
      //   dispatch(postLoginUser(userData, config, history));
      // }
      handleSignup();
    }
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setUserData({ ...userData, [name]: value });

  }
  const handleSignup = async () => {
    if (userData.password !== userData.repassword) {
      swal("Oops!", "Password does not matched!", "error")
    }
    else {
      const payload = {
        name: userData.name,
        userName: userData.username,
        password: userData.password,
        email: userData.email,
        phoneNumber: userData.phone,
        roles: [
          1
        ],
        alpha2Code: "US",
        appJoiningDate: moment().format('MMDDYY'),
        source: "Web",
      }

      try {
        setLoading(true)
        const res = await axios.post(
          `${ROUTES.BASE_URL}/auth/signup`,
          payload,
          config
        );
        setLoading(false)
        console.log("response signup verify", res);
        swal('Success!', res.data.message, 'success')
        history.push("/login");


      } catch (error) {
        setLoading(false)
        console.log("eroor", error.response.data.message)
        swal('Oops!', error.response.data.message, 'error')

      }
      console.log("userData", userData)

    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="login-card border">
        <h2 className="login-heading">Sign Up</h2>
        <div>
          <InputGroup>
            <label>Name</label>
            <Input
              onChange={handleInputChange}
              id="name"
              type="text"
              placeholder="Name"
              name="name"
            ></Input>
          </InputGroup>
          <InputGroup>
            <label>Username</label>
            <Input
              onChange={handleInputChange}
              id="username"
              type="text"
              placeholder="Username"
              name="username"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Email Address</label>
            <Input
              onChange={handleInputChange}
              id="email"
              type="email"
              placeholder="Email Address"
              name="email"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Zip Code</label>
            <Input
              onChange={handleInputChange}
              id="zipCode"
              type="text"
              placeholder="Zip Code"
              name="zipCode"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Mobile Phone Number</label>
            <PhoneNumber
              id="phone"
              name="phone"
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setUserData({ ...userData, phone: e.target.value });

                // setUserData({ phone: e.target.value });
              }}
              size="large"
              placeholder="Phon Number"
            ></PhoneNumber>


          </InputGroup>


          <InputGroup>
            <label>Invitation Code</label>
            <Input
              onChange={handleInputChange}
              id="invitation"
              type="text"
              placeholder="Invitation Code"
              name="invitation"
            ></Input>
          </InputGroup>


          <InputGroup>
            <label>Password</label>
            <Input
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            ></Input>
          </InputGroup>

          <InputGroup>
            <label>Re-enter Password</label>
            <Input
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              id="re-password"
              type="password"
              placeholder="Re-enter Password"
              name="repassword"
            ></Input>
          </InputGroup>

          {password && username ? (
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
          )}


          <Button
            onClick={() => {
              handleSignup();
            }}
          // disabled={user.loading}
          >
            Sign up
          </Button>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <InputGroup>
              <label>Are You Client?  <dvi style={{ color: "rgb(57, 181, 74" }}><a href="/login">Login here</a></dvi></label>
              <label>Are You Trusted Individual? <dvi style={{ color: "rgb(57, 181, 74" }}><a href="/trusteeLogin">Login here</a></dvi></label>

            </InputGroup>
          </div>
        </div>
      </div>
      <Loader isLoading={loading}></Loader>

    </div>
  );
}

export default Signup;
