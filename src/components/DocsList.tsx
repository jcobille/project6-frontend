import React from "react";
import { useState, useEffect } from "react";
import Table from "./table/Table";
import Modal from "./popup/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  startCreateUpload,
  startDeleteUpload,
  startEditUpload,
  startSetUploads,
} from "../redux/action/uploads";
import { Upload } from "../redux/types/ActionTypes";

const myUploadsColumns = [
  { label: "Label", key: "label" },
  { label: "File Name", key: "fileName" },
  { label: "Action", key: "id" },
];

const buttonList = [
  { label: "Edit", link: "" },
  { label: "Delete", link: "" },
  { label: "Share", link: "/share" },
];

const sharedUploadsColumns = [
  { label: "Label", key: "label" },
  { label: "File Name", key: "fileName" },
  { label: "Shared By", key: "sharedBy" },
];

const DocsList = () => {
  const addUploadLabel = "+ Add Upload";
  const dispatch = useAppDispatch();
  const sharedUploads = useAppSelector((state) => state.shared);
  const uploads = useAppSelector((state) => state.uploads);
  const upload = { id: "", fileName: "", label: "", sharedTo: ([] = []) };
  const [modal, setModal] = useState({
    modalType: "",
    isOpen: false,
  });
  const [selectedUpload, setSelectedUpload] = useState<Upload>(upload);

  const closeModal = () => {
    setModal({ modalType: "", isOpen: !modal.isOpen });
  };

  const setAddUpload = () => {
    setSelectedUpload(upload);
    setModal({ modalType: "add", isOpen: !modal.isOpen });
  };

  const setEditUpload = async (id: string) => {
    let upload = uploads.find((res) => res.id === id);
    setSelectedUpload({ ...selectedUpload, ...upload });
    setModal({ modalType: "edit", isOpen: !modal.isOpen });
  };

  const handleChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;

    if (!evt.target.files) {
      const value = evt.target.value;
      setSelectedUpload({ ...selectedUpload, [name]: value });
    } else {
      const value = evt.target.files[0];
      setSelectedUpload({
        ...selectedUpload,
        [name]: value,
        fileName: evt.target.files[0].name,
      });
    }
  };

  const setDeleteUpload = (id: string) => {
    setSelectedUpload({ ...upload, id: id });
    setModal({ modalType: "delete", isOpen: !modal.isOpen });
  };

  const confirmHandler = () => {
    if (modal.modalType === "delete") {
      dispatch(startDeleteUpload(selectedUpload.id));
      setModal({ modalType: "", isOpen: !modal.isOpen });
    } else if (modal.modalType === "edit") {
      if (selectedUpload.label !== "") {
        dispatch(startEditUpload(selectedUpload));
        setModal({ modalType: "", isOpen: !modal.isOpen });
      } else {
        alert("Description is empty");
      }
    } else {
      if (!selectedUpload.label) {
        alert("Description is required");
      } else if (!selectedUpload.file) {
        alert("File is required");
      } else {
        dispatch(startCreateUpload(selectedUpload));
        setModal({ modalType: "", isOpen: !modal.isOpen });
      }
    }
  };

  useEffect(() => {
    dispatch(startSetUploads());
  }, []);

  return (
    <>
      <section className="full-section">
        <p className="title">My Uploads</p>
        <Table
          data={uploads}
          columns={myUploadsColumns}
          minRow={4}
          tableType="uploads"
          buttonList={buttonList}
          setEdit={setEditUpload}
          setDelete={setDeleteUpload}
        />
      </section>
      <section className="full-section">
        <p className="title">Shared Uploads</p>
        <Table
          data={sharedUploads}
          columns={sharedUploadsColumns}
          minRow={4}
          tableType="shared"
        />
        <button className="custom-float-btn" onClick={setAddUpload}>
          {addUploadLabel}
        </button>
      </section>
      <Modal
        modal={modal}
        closeModal={closeModal}
        isConfirm={confirmHandler}
        data={selectedUpload}
        handleChanges={handleChanges}
      />
    </>
  );
};

export default DocsList;
