import { ChatActionTypes } from "../types/actions";
import { Chat } from "../types/ActionTypes";
const chatReducerDefaultState: Chat[] = [];

const chatsReducer = (
  state = chatReducerDefaultState,
  action: ChatActionTypes
): Chat[] => {
  switch (action.type) {
    case "CREATE_CHAT":
      return [...state, action.chat];
    case "SET_CHATS":
      return action.chats;
    default:
      return state;
  }
};

export { chatsReducer };
