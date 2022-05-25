import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './actionTypes';

import { APIUrls } from '../helpers/urls';
import {getAuthTokenFromLocalStorage} from '../helpers/utils' 

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}
export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
      dispatch(startUserProfileFetch());

      const url = APIUrls.userProfile(userId);
      fetch(url,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' :`Bearer ${getAuthTokenFromLocalStorage()}`
          }, 
      })
      .then((response) => response.json())
      .then((data)  => {
          dispatch(userProfileSuccess(data.data.user));
      });
  };
}
