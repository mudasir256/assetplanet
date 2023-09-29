import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { getLoggedInUser } from '../../helpers/authUtils';
import ROUTES from '../../config/routes';
import swal from "sweetalert";
import DEATH_API from '../../apis/death.api';
import { Redirect, Link } from "react-router-dom";

const initialState = {
  loading: false,
  // user: getLoggedInUser(),
  loginUserData: getLoggedInUser(),
  UserData: {},
  userId: '',
  userOtp: '',
  savedOtp: '',
  error: '',
  aNotes: false,
  eNotes: false,
  stepsFields: [],
  Step1: [],
  Step2: [],
  Step3: [],
  Step4: [],
  Step5: [],
  CompletedSteps: [],
  selectedCollection: "",
  monthlyPaymet: "",
  activated: false,

};

// A slice for login with our 3 reducers
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postLoginLoading: state => {
      state.loading = true
    },
    postLoginSuccess: (state, { payload }) => {

      state.loginUserData = payload
      state.loading = false

    },
    postUserData: (state, { payload }) => {
      state.UserData = payload
      state.loading = false
    },

    postLoginId: (state, { payload }) => {

      state.userId = payload
      state.loading = false

    },
    setActivated: (state, { payload }) => {

      state.activated = payload
      state.loading = false

    },
    postUserOtp: (state, { payload }) => {

      state.userOtp = payload
      state.loading = false

    },
    postselectedCollection: (state, { payload }) => {

      state.selectedCollection = payload
      state.loading = false

    },
    postSavedOtp: (state, { payload }) => {

      state.savedOtp = payload
      state.loading = false

    },
    postStepsFields: (state, { payload }) => {

      state.stepsFields = payload
      state.loading = false

    },
    postStep1: (state, { payload }) => {

      state.Step1 = payload
      state.loading = false

    },
    postStep2: (state, { payload }) => {

      state.Step2 = payload
      state.loading = false

    }, postStep3: (state, { payload }) => {

      state.Step3 = payload
      state.loading = false

    }, postStep4: (state, { payload }) => {

      state.Step4 = payload
      state.loading = false

    }, postmonthlyPaymet: (state, { payload }) => {

      state.monthlyPaymet = payload
      state.loading = false

    },
    postStep5: (state, { payload }) => {

      state.Step5 = payload
      state.loading = false

    },
    postCompletedSteps: (state, { payload }) => {

      state.CompletedSteps = payload
      state.loading = false

    },
    postaNotes: (state, { payload }) => {

      state.aNotes = payload
      state.loading = false

    },
    posteNotes: (state, { payload }) => {

      state.eNotes = payload
      state.loading = false

    },
    postLoginFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

// Three actions generated from the slice
export const { postLoginLoading, postUserData, postLoginSuccess, postLoginFailure, postLoginId, postUserOtp, postSavedOtp, posteNotes, postaNotes, postStepsFields, postStep1, postStep2, postStep3, postStep4, postStep5, postCompletedSteps, postselectedCollection, postmonthlyPaymet, setActivated } = loginSlice.actions

// A selector
// export const loginSelector = state => state.login

// The reducer
export default loginSlice.reducer



// Asynchronous thunk action
export function postLoginUser(userData, config, history, setLoading) {
  const getClientList = async () => {
    // setLoading(true)
    let responseData = await DEATH_API.fetchClientList();
    console.log("responseData", responseData.data[0].users)
    const newData = responseData.data[0].users
    // console.log("newData",newData)
    newData.map((item, index) => (
      item['Status'] = false
    ))
    console.log("newData", newData)

    localStorage.setItem("delegateUsers", JSON.stringify(newData))
    setLoading(false)
    swal('Success', "Login Success", 'success')
    history.push("/delgateAccess");
  }
  return async dispatch => {
    console.log("host location", `${window.location.protocol}//${window.location.hostname}`)
    userData.source = `${window.location.protocol}//${window.location.hostname}`;
    dispatch(postLoginLoading())
    console.log("userdata loginslice", userData)
    dispatch(postUserData(userData))
    console.log("config", config)
    console.log("history", history)
    console.log("setLoading", setLoading)
    // if (userData.hasOwnProperty('phone')) {
    //   this.props.handleloader()
    //   history.push("/otpvalidation");
    //   this.props.handleLoader()
    // }
    try {
      setLoading(true)
      const res = await axios.post(
        // `https://778mpekjkk.execute-api.us-east-1.amazonaws.com/stage/auth/signin`,
        `${ROUTES.BASE_URL}/auth/signin`,
        // `http://192.168.100.32:3000/dev/auth/signin`,
        userData,
        config
      );
      console.log("responsse of login", res.data.id)
      dispatch(postLoginId(res.data.id))
      setLoading(false)
      console.log("userData.hasOwnProperty('phone')", userData.hasOwnProperty('phone'))
      if (userData.hasOwnProperty('phone')) {
        history.push("/otpvalidation");
      }
      if (res.status === 200 && res.data.access_token) {
        console.log("resonse.data login", res.data)
        dispatch(postLoginSuccess(res.data))
        localStorage.setItem("role", JSON.stringify(res.data.user.roles.test111.name))
        localStorage.setItem("User", res.data.user.userName)
        dispatch(postLoginId(res.data.id))
        localStorage.setItem("userLoginToken", res.data.access_token)


        if (res.data.access_token) {

          setLoading(true)

          let responseData = await DEATH_API.fetchClientList();
          let newData = [];
          console.log("newData", responseData)

          if (responseData.data[0] && responseData.data[0].users) {
            newData = responseData.data[0].users
            newData.map((item, index) => (
              item['Status'] = false
            ))
          }
          // const newData = responseData.data[0].users
          // // console.log("newData",newData)
          // newData.map((item, index) => (
          //   item['Status'] = false
          // ))
          console.log("newData", newData)

          localStorage.setItem("delegateUsers", JSON.stringify(newData))
          setLoading(false)
          swal('Success', "Login Success", 'success')
          if (newData.length > 0) {

            history.push("/delgateAccess");
          }
          else {
            history.push("/dashboard");

          }

        }

        // history.push("/dashboard");
      }
      else {
        // history.push("/otpvalidation");
        // swal("ERROR!", "While Login....")
      }


    } catch (error) {
      setLoading(false)
      swal('Oops!', error.response.data.message, 'error')
      console.log(error)
      dispatch(postLoginFailure(error.response.data.message))
    }
  }

}