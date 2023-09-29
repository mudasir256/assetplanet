import axios from "axios";
import Routes from '../../config/routes'
export const postLoginUser =
  (userData, config, history) => async (dispatch) => {

    dispatch({
      type: "POST_LOGIN_USER_LOADING"
    });

    try {
      const res = await axios.post(
        `${Routes.BASE_URL}/auth/signin`,
        userData,
        config
      );
      localStorage.clear()
      localStorage.setItem('auth', res.data.access_token)
      dispatch({
        type: "POST_LOGIN_USER",
        payload: res.data,
      });
      history.push("/dashboard");
    } catch (error) {
      dispatch({
        type: "LOGIN_USER_ERROR",
        payload: error.response.data.message,
      });
    }
  };