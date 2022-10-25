import { User, Chat, Upload, SharedUpload } from "./ActionTypes";

// Users
export const CREATE_USER = "CREATE_USER";
export const AUTH_USER = "AUTH_USER";
export const SET_AUTH_USER = "SET_AUTH_USER";
export const EDIT_USER = "EDIT_USER";
export const SET_USERS = "SET_USERS";
export const REMOVE_USER = "REMOVE_USER";

export interface SetUserAction {
  type: typeof SET_USERS;
  users: User[];
}

export interface CreateUserAction {
  type: typeof CREATE_USER;
  user: User;
}

export interface AuthUserAction {
  type: typeof AUTH_USER;
  user: {};
}

export interface SetAuthUserAction {
  type: typeof SET_AUTH_USER;
  user: {};
}

export interface EditUserAction {
  type: typeof EDIT_USER;
  user: User;
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER;
  id: string;
}

export type UserActionTypes =
  | SetUserAction
  | SetAuthUserAction
  | CreateUserAction
  | AuthUserAction
  | EditUserAction
  | RemoveUserAction;

// Chats
export const CREATE_CHAT = "CREATE_CHAT";
export const SET_CHATS = "SET_CHATS";
export const REMOVE_CHATS = "REMOVE_CHATS";

export interface SetChatAction {
  type: typeof SET_CHATS;
  chats: Chat[];
}

export interface CreateChatAction {
  type: typeof CREATE_CHAT;
  chat: Chat;
}

export interface RemoveChatAction {
  type: typeof REMOVE_CHATS;
  id: string;
}

export type ChatActionTypes =
  | SetChatAction
  | CreateChatAction
  | RemoveChatAction;

// Uploads
export const CREATE_UPLOAD = "CREATE_UPLOAD";
export const SET_UPLOADS = "SET_UPLOADS";
export const SET_SHARED_UPLOADS = "SET_SHARED_UPLOADS";
export const EDIT_UPLOAD = "EDIT_UPLOAD";
export const DELETE_UPLOAD = "DELETE_UPLOAD";

export interface CreateUploadAction {
  type: typeof CREATE_UPLOAD;
  upload: Upload;
}

export interface SetUploadAction {
  type: typeof SET_UPLOADS;
  upload: Upload[];
}

export interface SetSharedUploadAction {
  type: typeof SET_SHARED_UPLOADS;
  shared: SharedUpload[];
}

export interface EditUploadAction {
  type: typeof EDIT_UPLOAD;
  upload: Upload;
}

export interface DeleteUploadAction {
  type: typeof DELETE_UPLOAD;
  id: string;
}

export type UploadActionType = CreateUploadAction | SetUploadAction | SetSharedUploadAction | EditUploadAction | DeleteUploadAction;

// Page
export const CHANGE_PAGE = "CHANGE_PAGE";

export interface ChangePageAction {
  type: typeof CHANGE_PAGE;
  page: string;
}

export type PageActionType = ChangePageAction;

export const LOGOUT_USER = "LOGOUT_USER";

export interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export type LogoutUserType = LogoutUserAction;

export type AppActions = UserActionTypes | ChangePageAction | UploadActionType | ChatActionTypes | LogoutUserType;
