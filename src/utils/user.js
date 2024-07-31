import * as JWT from 'jwt-decode';
import { getToken } from '../services/auth';
import axios from 'axios';


export const getUser = () => {
    if (getToken()) {
        let tokenPayload = atob(getToken().split(".")[1])
        return JSON.parse(tokenPayload);
    }
}