import { getToken } from '../services/auth';


export const getUser = () => {
    if (getToken()) {
        let tokenPayload = atob(getToken().split(".")[1])
        return JSON.parse(tokenPayload);
    }
}