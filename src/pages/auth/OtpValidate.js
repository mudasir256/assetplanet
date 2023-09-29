import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { InputGroup } from "../../components/inputGroup/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { postLoginSuccess, postUserOtp, postLoginId, postLoginFailure, postUserData } from '../../redux/slices/loginSlice';
import Base64 from "../../utils/base64";
import Loader from "../../components/styled-components/loader/loader";

import DEATH_API from "../../apis/death.api"
import swal from "sweetalert";
import axios from 'axios';
import ROUTES from '../../config/routes';

const OtpValidate = () => {
    const userId = useSelector((state) => state.rootReducer.loginUser.userId);
    const userData = useSelector((state) => state.rootReducer.loginUser.UserData);
    const dispatch = useDispatch();
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
    const getClientList = async () => {
        // setLoading(true)
        let responseData = await DEATH_API.fetchClientList();
        // console.log("responseData", responseData.data)
        const newData = responseData.data[0] && responseData.data[0].users && responseData.data[0].users
        // console.log("newData",newData)
        newData && newData.map((item, index) => (
            item['Status'] = false
        ))
        console.log("newData", newData)

        localStorage.setItem("delegateUsers", JSON.stringify(newData))
        setLoading(false)
        swal('Success', "Login Success", 'success')
        history.push("/delgateAccess");
    }
    const handleOtpSuccess = async () => {
        try {
            setLoading(true)
            const res = await axios.post(
                `${ROUTES.BASE_URL}/auth/verifyOTP`,
                { id: userId, otp: userOtp },
                config
            );
            // setLoading(false)

            console.log("response otp verify", res.data);

            if (res.status === 200 && res.data.access_token) {
                // swal('Success', "Login Success", 'success')
                console.log("res inside if enter", res);
                dispatch(postLoginSuccess(res.data))
                console.log("res after if", res.data.trustee_Role.roleName);
               localStorage.setItem("role", JSON.stringify(res.data.trustee_Role.roleName))
                
                dispatch(postUserOtp(userOtp));
                localStorage.setItem("User", res.data.user.userName)
                localStorage.setItem("userLoginToken", res.data.access_token)
                getClientList();

                // setLoading(false)

                // history.push("/delgateAccess");
            }

        } catch (error) {
            setLoading(false)
            swal('Oops!', "Invalid OTP", 'error')
            console.log(error)
        }

    }
    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            handleOtpSuccess();
        }
    };
    const history = useHistory();
    const [userOtp, setuserOtp] = useState("");
    const [loading, setLoading] = useState(false);

    console.log("useruser", JSON.stringify(userId))
    return (
        <div>
            <div style={{ marginTop: "20px" }}>
                {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
                <div className="login-card border">
                    <h2 className="login-heading">OTP Verification Form</h2>
                    <div>
                        <InputGroup>
                            <label>Enter OTP</label>
                            <Input
                                onChange={(e) => {
                                    setuserOtp(e.target.value);
                                }}
                                id="otp"
                                type="text"
                                pattern="[0-9.]+"
                                onKeyPress={handleKeyPress}
                                // pattern="[0-9]+"
                                // pattern="\d*"
                                // maxlength="4"
                                maxLength={6}
                                placeholder="***OTP***"
                                name="otp"
                            ></Input>
                        </InputGroup>

                        <Button
                            onClick={() => {
                                handleOtpSuccess();
                            }}
                        >
                            Verify
                        </Button>

                    </div>
                    <div style={{ display: "flex", justifyContent: "end", marginTop: "2rem" }}>
                        <Button
                            onClick={async () => {
                                try {
                                    setLoading(true)
                                    const res = await axios.post(
                                        `${ROUTES.BASE_URL}/auth/signin`,
                                        userData,
                                        config
                                    );
                                    console.log("response otp resend", res)
                                    if (res.data.status === 200) {
                                        console.log("responsse of login", res.data.id)
                                        swal('Success', res.data.message, 'success')
                                        setLoading(false)
                                    }

                                } catch (error) {
                                    setLoading(false)
                                    // console.log("error in otp resend",error)
                                }
                            }}

                        >
                            Resend OTP
                        </Button>
                    </div>
                </div>
            </div>
            <Loader isLoading={loading}></Loader>

        </div>
    )
}

export default OtpValidate
