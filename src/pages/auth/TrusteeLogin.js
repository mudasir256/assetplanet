import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../components/styled-components/loader/loader";
import PhoneNumber from "../../components/form/components/Countrycode";
import { Button } from "../../components/button/Button";
import { InputGroup } from "../../components/inputGroup/InputGroup";
import Base64 from "../../utils/base64";
import { useDispatch, useSelector } from "react-redux";
import { postLoginId,postUserData } from "../../redux/slices/loginSlice";
import "./Login.css";
import axios from "axios";
import ROUTES from '../../config/routes';
import swal from "sweetalert";
function Login() {
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

    const [username, setUserName] = useState(false);

    const [userData, setUserData] = useState({});

    const history = useHistory();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            console.log("here on key enter")
            loginSuccess();
        }
    };
    const handleLogin = async () => {
        console.log("key pressesddd...click")
        loginSuccess();
    };
    const loginSuccess = async () => {
        dispatch(postUserData(userData))

        try {
            setLoading(true)
            const res = await axios.post(
                `${ROUTES.BASE_URL}/auth/signin`,
                userData,
                config
            );
            console.log("responsse of login", res.data.id)
            dispatch(postLoginId(res.data.id))
            setLoading(false)
            if (userData.hasOwnProperty('phone')) {
                history.push("/otpvalidation");
            }
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.response.data.message, 'error')
            console.log(error)
        }
    }


    return (
        <div style={{ marginTop: "20px" }}>
            <div className="login-card border">
                <h2 className="login-heading">Trusted Individual Login</h2>
                <div>
                    <InputGroup>
                        <label>Phone</label>
                        <PhoneNumber
                            id="phone"
                            name="phone"
                            onKeyPress={handleKeyPress}
                            onChange={(e) => {
                                if (username === true) {
                                    console.log("not setting")
                                }
                                else {
                                    setUserData({ phone: e.target.value });
                                }
                            }}
                            size="large"
                            placeholder="phone"
                        ></PhoneNumber>

                    </InputGroup>

                    <Button
                        onClick={() => {
                            handleLogin();
                        }}
                        disabled={user.loading}
                    >
                        Login
                    </Button>
                    <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                    <InputGroup>
                      <label>Are You a Client?  <dvi style={{ color: "rgb(57, 181, 74" }}><a href="/login">Login here</a></dvi></label>
        
                    </InputGroup>
                  </div>

                </div>
            </div>
            <Loader isLoading={loading}></Loader>

        </div>
    );
}

export default Login;
