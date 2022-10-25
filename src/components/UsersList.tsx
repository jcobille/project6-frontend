import { useState, useEffect } from "react";
import Table from "./table/Table";
import Modal from "./popup/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { startRemoveUser, startSetUsers } from "../redux/action/users";

const UsersList = () => {
  const columnsList = [
    { label: "Name", key: "name" },
    { label: "User Email ID", key: "email" },
    { label: "", key: "_id" },
  ];

  const buttonList: { label: string; link: string }[] = [
    { label: "Edit", link: "/edit-user" },
    { label: "Delete", link: "" },
  ];
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const [modal, setModal] = useState({
    modalType: "",
    isOpen: false,
  });
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    dispatch(startSetUsers());
  }, [dispatch]);

  const closeModal = () => {
    setModal({ modalType: "", isOpen: !modal.isOpen });
  };

  const deleteUser = (id: string) => {
    setSelectedId(id);
    setModal({ modalType: "delete", isOpen: !modal.isOpen });
  };

  const confirmDelete = () => {
    dispatch(startRemoveUser(selectedId));
    // dispatch(removeUserFromGroupChat(selectedId));
    // dispatch(deleteUserUploadFiles(selectedId));
    // dispatch(getUsers());
    setModal({ modalType: "", isOpen: !modal });
  };
  return (
    <div>
      <section className="full-section">
        <p className="title">Users</p>
        <Table
          data={users}
          columns={columnsList}
          minRow={13}
          tableType="user"
          buttonList={buttonList}
          setDelete={deleteUser}
        />
      </section>
      <Modal
        modal={modal}
        closeModal={closeModal}
        isConfirm={confirmDelete}
        handleChanges={() => {}}
      />
    </div>
  );
};

export default UsersList;
