import * as JWT from 'jwt-decode';
import { TOKEN_KEY, getToken } from '../services/auth';

export const getUser = () => {
    if (getToken()) {
        let tokenPayload = atob(getToken().split(".")[1])
        return JSON.parse(tokenPayload);
    }
}