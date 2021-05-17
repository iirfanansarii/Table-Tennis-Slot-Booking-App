import { authConstants } from "../actions/constants"

const initState = {
  token:null,  
  user: {
    username: '',
  },
  authenticate :false,
  authenticating: false,
};

// auth reducer
export default (state = initState,action) => {
switch(action.type){ 
case authConstants.LOGIN_REQUEST:
    state = {
      ...state,
      authenticating:true,
    };
    break; 

    case authConstants.LOGIN_SUCCESS:
        state = {
          ...state,
          username: action.payload.username,
          token: action.payload.token,
          authenticate: true,
          authenticating: false,
        };
        break;
} 
return state; 
}