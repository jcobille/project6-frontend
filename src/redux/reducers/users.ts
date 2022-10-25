import { UserActionTypes } from "../types/actions";
import { User } from "../types/ActionTypes";

const usersReducerDefaultState: User[] = [];
const userDefaultState: User = { id: "", name: "", email: "" };
const userReducer = (
  state = usersReducerDefaultState,
  action: UserActionTypes
): User[] => {
  switch (action.type) {
    case "CREATE_USER":
      return [...state, action.user];
    case "SET_USERS":
      return action.users;
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.user.id) {
          return {
            ...user,
            ...action.user
          };
        } else {
          return user;
        }
      });
    case "REMOVE_USER":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

const userAuthReducer = (
  state = userDefaultState,
  action: UserActionTypes
): {} => {
  switch (action.type) {
    case "AUTH_USER":
      return { ...state, ...action.user };
    case "SET_AUTH_USER":
      return action.user;
    default:
      return state;
  }
};

export { userReducer, userAuthReducer };
