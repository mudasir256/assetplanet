// @flow
import {
    PLAID_LOGIN,
} from '../../constants/actionTypes';

let plaid_connected = window.localStorage.getItem('plaid_connected');
if(plaid_connected == null){
    plaid_connected = false;
}

let plaid_public_token = window.localStorage.getItem('plaid_public_token');
if(plaid_public_token == null){
    plaid_public_token = '';
}

const INIT_STATE = {
    plaid_connected: plaid_connected,
    plaid_public_token: plaid_public_token
};

type UserAction = { type: string, payload: {} | string };
type State = { plaid_connected?: boolean, plaid_public_token?: string };

const User = (state:State = INIT_STATE, action: UserAction) => {
    switch (action.type) {
        case PLAID_LOGIN:
            return { ...state, plaid_connected: action.payload.plaid_connected, plaid_public_token: action.payload.plaid_public_token };
        default: return { ...state };
    }
}

export default User;