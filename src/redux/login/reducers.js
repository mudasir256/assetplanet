const initialState = {
    loading: false,
    isLoggedIn: false,
    loginData:[],
    error:''
  };
  
  const loginUser = (state = { initialState }, action) => {
    switch (action.type) {
      case "POST_LOGIN_USER_LOADING":
        return {
          ...state,
          loading: true,
          isLoggedIn: false
        
        };
  
      case "POST_LOGIN_USER":
        return {
          ...state,
          loading: false,
          isLoggedIn: true,
          loginData : action.payload

        };
  
      case "LOGIN_USER_ERROR":
        return {
          ...state,
          loading: false,
          isLoggedIn: false,
          error: action.payload,
        };
  
      default:
        return initialState;
    }
  };
  
  
  export default loginUser