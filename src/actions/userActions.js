import axios from '../helpers/axios';
import { userConstants } from './constants';

// sign up actions
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    });
    let actionResponse = {
      status: 0,
      message: '',
      data: '',
      res: '',
    };
    try {
      const res = await axios.post(`/user`, {
        ...user,
      });
      actionResponse.res = res;
      const { status } = res;
      const statusCode = status;
      if (statusCode === 200) {
        const { message } = res.data;
        actionResponse.status = statusCode;
        actionResponse.message = message;
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: { message: message },
        });
      }
      return actionResponse;
    } catch (error) {
      const { response } = error;
      const statusCode = response.status;
      const { message } = response.data;
      actionResponse.status = statusCode;
      actionResponse.message = message;
      dispatch({
        type: userConstants.USER_REGISTER_FAILURE,
        payload: { message: message ? message : 'Something went wrong' },
      });
      return actionResponse;
    }
  };
};
