import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { pageReducer } from "../redux/reducers/page";
import { userAuthReducer, userReducer } from "../redux/reducers/users";
import { AppActions } from "../redux/types/actions";
import { uploadsReducer, sharedUploadsReducer } from "../redux/reducers/uploads";
import { chatsReducer } from "../redux/reducers/chats";

export const rootReducer = combineReducers({
  users: userReducer,
  currentUser: userAuthReducer,
  page: pageReducer,
  uploads: uploadsReducer,
  shared: sharedUploadsReducer,
  chats: chatsReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
