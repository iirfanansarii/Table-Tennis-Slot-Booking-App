import axios from '../helpers/axios';
import { userConstants } from './constants';

// sign up actions
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    });

    try {
      const res = await axios.post(`/user`, {
        ...user,
      });
      if (res.status === 200) {
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: { message: res.data.message },
        });
      }
    } catch (error) {
      const { response } = error;
      const statusCode = response.status;
      switch (statusCode) {
        case 400:
          const { userExist, userNotCreated } = response.data;
          if (userExist) {
            dispatch({
              type: userConstants.USER_NAME_EXIST,
              payload: { error: userExist },
            });
          } else if (userNotCreated) {
            dispatch({
              type: userConstants.USER_REGISTER_FAILURE,
              payload: { error: userNotCreated },
            });
          }
          break;
        case 500:
          const { errors } = response.data.error;
          const keys = Object.keys(errors);
          const msg = keys.toString() + ' are required!';
          dispatch({
            type: userConstants.USER_REGISTER_MONGODB_ERROR,
            payload: { error: msg },
          });
          break;
        default:
          break;
      }
    }
  };
};
