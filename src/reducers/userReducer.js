import { userConstants } from '../actions/constants';

const initState = {
  error: undefined,
  message: undefined,
  loading: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_MONGODB_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };

      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_NAME_EXIST:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default userReducer;
