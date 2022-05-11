import { APIUrls } from "../helpers/urls";
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from "./actionTypes";
import { getFormBody } from "../helpers/utils";

export function startLogin(){
    return{
        type: LOGIN_START
    }
}

export function loginFailed(errorMessage){
    return{
        type: LOGIN_FAILED ,
        error : errorMessage,
    }
}
export function loginSuccess(user){
    return{
        type: LOGIN_SUCCESS ,
        user,
    }
}

export default function login (email ,password){
    return(dispatch) => {
        dispatch(startLogin())
        const url = APIUrls.login();
        fetch(url ,{
            method:'POST',
            headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            },// url form encoded

            body :getFormBody({email ,password}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('data',data);
            if(data.success){
                // dispatch action to save user
                dispatch.loginSuccess(data.data.user)
                return;
            }
            dispatch(loginFailed(data.message));
        });

    };
}