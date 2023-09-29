// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD
} from '../../constants/actionTypes';


import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed
} from './actions';

import Config from 'Config';
import {
    QL_SIGN_IN
} from 'constants/queries';
/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { throw error });
}

const callLogin = (options = {}) => {

    return fetch(Config.api_server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: 'mutation signin($data: SigninAttributes!){ signin(attributes: $data){ account { id role username } token } }',
            operationName: 'signin',
            variables: {
                data: {
                    username: options.username,
                    password: options.password
                }
            }
        })
    }).then(response => {
        if (!response.status === 200) {
            throw response.json();
        }
        return response.json();
    })
    .then(json => {
        return json;
    })
    .catch(error => { throw error });
}

const callRegister = (options = {}) => {

    return fetch(Config.api_server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: 'mutation signup($data: SignupAttributes!){ signup(attributes: $data){ account { id role username } } }',
            operationName: 'signup',
            variables: {
                data: {
                    username: options.username,
                    password: options.password,
                    role: options.role
                }
            }
        })
    }).then(response => {
        if (!response.status === 200) {
            throw response.json();
        }
        return response.json();
    })
    .then(json => {
        return json;
    })
    .catch(error => { throw error });
}

/**
 * Sets the session
 * @param {*} user 
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user)
        cookies.set("user", JSON.stringify(user), { path: "/" });
    else
        cookies.remove("user");
};
/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password } }) {
    const options = {
        username: username,
        password: password
    };

    try {
        //const response = yield call(fetchJSON, '/users/authenticate', options);
        const response = yield call(callLogin, options);
        console.log('response:', response);
        if(response['data']['signin'] != null){
            var user = {
                id: response['data']['signin']['account']['id'],
                role: response['data']['signin']['account']['role'],
                username: response['data']['signin']['account']['username'],
                token: response['data']['signin']['token']
            }
            setSession(user);
            yield put(loginUserSuccess(user));
        }
        else{
            yield put(loginUserFailed(response['errors'][0]['message']));
        }
        
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push("/login");
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password, role } }) {
    const options = {
        fullname: fullname,
        username: email,
        password: password,
        role: role
    };

    try {
        const response = yield call(callRegister, options);
        console.log('response:', response);
        var user = {
            id: response['data']['signup']['account']['id'],
            role: response['data']['signup']['account']['role'],
            username: response['data']['signup']['account']['username'],
            token: ''
        }

        yield put(registerUserSuccess(user));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}


export function* watchLoginUser():any {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser():any {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser():any {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword():any {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga():any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;