import axios from '../helpers/axios';
import { authConstants } from './constants';

// login actions
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/user/login`, {
      ...user,
    });
    if (res.status === 200) {
      const { username, token, userId } = res.data;
      localStorage.setItem('token',token);
      localStorage.setItem('userId',userId);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          username,
          token,
        },
      });
    } else if (res.status === 400) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: res.data.message,
        },
      });
    }
    return res;
  };
};
