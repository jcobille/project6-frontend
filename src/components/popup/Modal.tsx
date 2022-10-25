import React from "react";
import Modal from "react-modal";
import { Upload } from "../../redux/types/ActionTypes";
import { BodyAdd, BodyEdit, BodyDelete } from "./Body";

Modal.setAppElement("#root");
interface modal {
  modalType: string;
  isOpen: boolean;
}

interface ModalProps {
  modal: modal;
  closeModal: () => void;
  isConfirm: () => void;
  data?: Upload;
  handleChanges: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const App = ({
  modal,
  closeModal,
  isConfirm,
  handleChanges,
  data = { id: "", label: "", fileName: "", sharedTo: [] },
}: ModalProps) => {
  let title = modal.isOpen
    ? modal.modalType === "add"
      ? "Upload"
      : modal.modalType === "edit"
      ? "Edit"
      : "Confirm User Delete"
    : "";
  const body = () => {
    if (modal.modalType === "add") {
      return (
        <BodyAdd
          closeModal={closeModal}
          handleChanges={handleChanges}
          isConfirm={isConfirm}
          data={data}
        />
      );
    } else if (modal.modalType === "edit") {
      return (
        <BodyEdit
          closeModal={closeModal}
          data={data}
          isConfirm={isConfirm}
          handleChanges={handleChanges}
        />
      );
    } else if (modal.modalType === "delete") {
      return <BodyDelete isConfirm={isConfirm} closeModal={closeModal} />;
    }
  };
  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        className={"modal " + (modal.modalType === "delete" ? "" : "modal-md")}
        overlayClassName="overlay"
      >
        <div className="modal-header">
          {title}
          <button className="btn-end" onClick={closeModal}>
            &#x2715;
          </button>
        </div>
        <div className="modal-body">{body()}</div>
      </Modal>
    </div>
  );
};

export default App;
