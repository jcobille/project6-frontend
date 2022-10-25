import { Dispatch } from "redux";
import { axiosCall } from "../../components/misc/api";
import { AppState } from "../../store/configureStore";
import { AppActions } from "../types/actions";
import { Chat } from "../types/ActionTypes";

export const createChat = (chat: Chat): AppActions => ({
  type: "CREATE_CHAT",
  chat,
});
export const setChats = (chats: Chat[]): AppActions => ({
  type: "SET_CHATS",
  chats,
});

export const startSetChats = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall("/chats", "GET").then((res) => {
      dispatch(setChats(res.data));
    });
  };
};

export const startSubmitChat = (chat: {userId: string, message: string}) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall('/chats/create', 'POST', chat).then((res)=>{
        dispatch(createChat(res.data));
    })
  };
};
