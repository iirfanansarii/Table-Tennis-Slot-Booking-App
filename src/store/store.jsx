import { applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from  '../reducers/reducers';

// accepts two parameter fundtion and middleware
const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;