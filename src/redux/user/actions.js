// @flow
import {
    PLAID_LOGIN
} from '../../constants/actionTypes';

type UserAction = { type: string, payload: {} | string };

export const plaidLogin = (plaid_connected: boolean, plaid_public_token: string): UserAction => ({
    type: PLAID_LOGIN,
    payload: { plaid_connected, plaid_public_token }
});