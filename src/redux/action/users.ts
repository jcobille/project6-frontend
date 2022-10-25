import { Dispatch } from "redux";
import { axiosCall } from "../../components/misc/api";
import { getUserId, setCookie } from "../../components/misc/cookie";
import { AppState } from "../../store/configureStore";
import { AppActions } from "../types/actions";
import { User } from "../types/ActionTypes";

export const createUser = (user: User): AppActions => ({
  type: "CREATE_USER",
  user,
});

export const authUser = (user: {}): AppActions => ({
  type: "AUTH_USER",
  user,
});

export const removeUser = (id: string): AppActions => ({
  type: "REMOVE_USER",
  id,
});

export const editUser = (user: User): AppActions => ({
  type: "EDIT_USER",
  user,
});

export const setUsers = (users: User[]): AppActions => ({
  type: "SET_USERS",
  users,
});

export const setPage = (page: string): AppActions => ({
  type: "CHANGE_PAGE",
  page,
});

export const startCreateUser = (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const { name = "", email = "" } = userData;
    const user = { name, email };
    axiosCall("/users/create", "POST", userData).then((res) => {
      if (res.status) {
        let id: string = res.data.id;
        dispatch(createUser({ id, ...user }));
        dispatch(setPage("/register-success"));
      }
    });
  };
};

export const startAuthUser = (user: { email: string; password: string }) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall("/users/login", "POST", user).then((res) => {
      if (res.status) {
        let token = res.data.token;
        let user = res.data.user;

        setCookie("token", token, 7);
        localStorage.setItem("userId", user.id);
        dispatch(authUser(user));
        dispatch(setPage("/login-success"));
      }
    });
  };
};

export const startSetCurrentAuthUser = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const userId = getUserId();
    axiosCall(`/users/details/${userId}`, "GET").then((res) => {
      let user = {
        id: res.data._id,
        ...res.data,
      };
      delete user._id;
      dispatch(authUser(user));
    });
  };
};

export const startEditUser = (user: User) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let userUpdate = {
      name: user.name,
      email: user.email,
    };
    axiosCall(`/users/edit/${user.id}`, "PATCH", userUpdate).then(() => {
      dispatch(editUser(user));
    });
  };
};

export const startSetUsers = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall("/users", "GET").then((res) => {
      if (res.status) {
        let userList: User[] = [];
        res.data.map((user: User) =>
          userList.push({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        );

        dispatch(setUsers(userList));
      }
    });
  };
};

export const startRemoveUser = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall(`/users/${id}`, "DELETE").then((res) => {
      if (res.status) {
        dispatch(removeUser(id));
      }
    });
  };
};
