import { ChangePageAction } from "../types/actions";
const pageReducerDefaultState: string = "";

const pageReducer = (
  state = pageReducerDefaultState,
  action: ChangePageAction
): string => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return action.page;
    default:
      return state;
  }
};

export { pageReducer };
