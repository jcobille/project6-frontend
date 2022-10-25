import { UploadActionType } from "../types/actions";
import { Upload, SharedUpload } from "../types/ActionTypes";
const uploadsDefaultState: Upload[] = [];
const sharedUploadsDefaultState: SharedUpload[] = [];

const uploadsReducer = (
  state = uploadsDefaultState,
  action: UploadActionType
): Upload[] => {
  switch (action.type) {
    case "CREATE_UPLOAD":
      return [...state, action.upload];
    case "SET_UPLOADS":
      return action.upload;
    case "EDIT_UPLOAD":
      return state.map((upload) => {
        if (upload.id === action.upload.id) {
          return {
            ...upload,
            ...action.upload,
          };
        }
        return upload;
      });
    case "DELETE_UPLOAD":
      return state.filter((upload) => upload.id !== action.id);
    default:
      return state;
  }
};

const sharedUploadsReducer = (
  state = sharedUploadsDefaultState,
  action: UploadActionType
): SharedUpload[] => {
  switch (action.type) {
    case "SET_SHARED_UPLOADS":
      return action.shared;
    default:
      return state;
  }
};
export { uploadsReducer, sharedUploadsReducer };
