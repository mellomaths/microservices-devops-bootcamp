import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

let store;
let stage = process.env.REACT_APP_STAGE;
//stage = "production"
if (stage === undefined || stage === null || stage === "dev") {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}
export default store;
