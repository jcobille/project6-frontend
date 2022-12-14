import { Dispatch } from "redux";
import { axiosCall, axiosCallFile } from "../../components/misc/api";
import { getUserId } from "../../components/misc/cookie";
import { AppState } from "../../store/configureStore";
import { AppActions } from "../types/actions";
import { SharedUpload, Upload } from "../types/ActionTypes";

export const createUpload = (upload: Upload): AppActions => ({
  type: "CREATE_UPLOAD",
  upload,
});

export const setUploads = (upload: Upload[]): AppActions => ({
  type: "SET_UPLOADS",
  upload,
});

export const editUpload = (upload: {
  id: string;
  label: string;
}): AppActions => ({
  type: "EDIT_UPLOAD",
  upload,
});

export const deleteUpload = (id: string): AppActions => ({
  type: "DELETE_UPLOAD",
  id,
});

export const setSharedUploads = (shared: SharedUpload[]): AppActions => ({
  type: "SET_SHARED_UPLOADS",
  shared,
});

export const startCreateUpload = (upload: Upload) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let userId = getUserId();
    axiosCallFile(`/uploads/create`, "POST", {
      ...upload,
      userId: userId,
    }).then((res) => {
      dispatch(createUpload(res.data));
    });
  };
};

export const startSetUploads = () => {
  let userId = getUserId();
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const uploadsList = await axiosCall(`/uploads/${userId}`, "GET");
    const sharedUploadsList = await axiosCall(
      `/uploads/shared/${userId}`,
      "GET"
    );

    let uploads: Upload[] = [];
    let sharedUploads: SharedUpload[] = [];

    uploadsList.data.map(
      (upload: { id: string; label: string; fileName: string; sharedTo: [] }) =>
        uploads.push({
          id: upload.id,
          label: upload.label,
          fileName: upload.fileName,
          sharedTo: upload.sharedTo,
        })
    );
    sharedUploadsList.data.map(
      (shared: {
        _id: string;
        label: string;
        fileName: string;
        sharedBy: string;
      }) =>
        sharedUploads.push({
          id: shared._id,
          label: shared.label,
          fileName: shared.fileName,
          sharedBy: shared.sharedBy,
        })
    );

    dispatch(setUploads(uploads));
    dispatch(setSharedUploads(sharedUploads));
  };
};

export const startDeleteUpload = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall(`/uploads/delete/${id}`, "DELETE").then((res) => {
      dispatch(deleteUpload(id));
    });
  };
};

export const startEditUpload = (upload: { id: string; label: string }) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall(`/uploads/update/${upload.id}`, "PATCH", upload).then((res) => {
      dispatch(editUpload({ id: upload.id, label: upload.label }));
    });
  };
};

export const startAddEditShareUpload = (upload: Upload) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    let data = {
      id: upload.id,
      sharedTo: upload.sharedTo,
    };
    axiosCall(`/uploads/update/${upload.id}`, "PATCH", data).then((res) => {
      dispatch(editUpload(upload));
    });
  };
};
