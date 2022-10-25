import { ChangeEvent, useState } from "react";
import { Upload, User } from "../../redux/types/ActionTypes";
// import { getUserId } from '../misc/cookie';
// import { createUploadDetails, getUploads } from '../../reducers/documentsAction';

interface AddProps {
  closeModal: () => void;
  handleChanges: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isConfirm: () => void;
  data: Upload;
}

interface EditProps {
  closeModal: () => void;
  handleChanges: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isConfirm: () => void;
  data: Upload;
}

interface DeleteProps {
  isConfirm: () => void;
  closeModal: () => void;
}

export const BodyAdd = ({ closeModal, handleChanges, isConfirm, data }: AddProps) => {
  return (
    <div>
      <div className="row">
        <div className="col-3 centered">File Description</div>
        <div className="col centered">
          <input
            type="text"
            autoComplete="off"
            className="bordered-input"
            name="label"
            onChange={handleChanges}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3 centered">File Upload</div>
        <div className="col text-start">
          <div className="row">
            <div className="col-4">
              <label htmlFor="file-upload" className="btn-grey">
                Choose File
              </label>
              <input
                type="file"
                name="file"
                id="file-upload"
                hidden
                onChange={handleChanges}
              />
            </div>
            <div className="col">
              <label className="pl-2">{data.fileName}</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <button className="btn-grey" onClick={isConfirm}>
            Upload Now
          </button>
        </div>
        <div className="col-3 text-start">
          <button className="btn-grey" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const BodyDelete = ({ isConfirm, closeModal }: DeleteProps) => {
  return (
    <div>
      <div className="row">
        <div className="col centered">
          <img src="/question.png" alt="question-mark" width="30" />
          <span>Are you sure ?</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="bordered-button btn-md" onClick={isConfirm}>
            ok
          </button>
          <button className="bordered-button btn-md" onClick={closeModal}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const BodyEdit = ({
  closeModal,
  data,
  handleChanges,
  isConfirm,
}: EditProps) => {
  return (
    <div>
      <div className="row">
        <div className="col-3 centered">File Description</div>
        <div className="col centered">
          <input
            type="text"
            className="bordered-input"
            value={data.label}
            name="label"
            onChange={handleChanges}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="bordered-button btn-md" onClick={isConfirm}>
            Save
          </button>
          <button className="bordered-button btn-md" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
