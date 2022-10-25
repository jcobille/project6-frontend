import { useEffect, useState } from "react";
import Table from "./table/Table";
import { useParams } from "react-router-dom";
import Modal from "./popup/Modal";
import { getUserId } from "./misc/cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User } from "../redux/types/ActionTypes";
import { startSetUsers } from "../redux/action/users";
import {
  startAddEditShareUpload,
  startSetUploads,
} from "../redux/action/uploads";
import { UserSelection } from "./views/FormInputs";
const myUploadsColumns = [
  { label: "Shared User", key: "name" },
  { label: "Action", key: "id" },
];

const Share = () => {
  const { id } = useParams<string>();
  const userId = getUserId();
  const dispatch = useAppDispatch();
  const [sharedUserIds, setSharedUserIds] = useState<string[]>([]); // list of users id shared to file
  const [sharedToUser, setSharedToUser] = useState<User[]>([]); // list of users details shared to file
  const [selectedUserId, setSelectedUser] = useState(""); // selected user to remove or to share
  const [usersList, setUsersList] = useState<User[]>([]);
  const [modal, setModal] = useState({
    modalType: "",
    isOpen: false,
  });

  const uploadsDetails = useAppSelector((state) =>
    state.uploads.find((upload) => upload.id === id)
  );
  let userList = useAppSelector((state) =>
    state.users.filter((user) => user.id !== userId)
  );

  useEffect(() => {
    if (userList.length === 0 || !uploadsDetails) {
      dispatch(startSetUsers());
      dispatch(startSetUploads());
    } else {
      let users: User[] = [];
      setUsersList([]);
      setSharedUserIds(uploadsDetails.sharedTo);
      userList.map((user) => {
        let sharedId = uploadsDetails.sharedTo.find((id) => {
          if (user.id === id) {
            users.push(user);
            return id;
          }
        });

        if (sharedId !== user.id) {
          setUsersList([...usersList, user]);
        }
      });
      setSharedToUser(users);
    }
  }, [uploadsDetails]);

  const changeHandler = (evt: React.FormEvent<HTMLSelectElement>) => {
    const element = evt.target as HTMLSelectElement;
    setSelectedUser(element.value);
  };

  const setUser = (id: string) => {
    setSelectedUser(id);
    setModal({ modalType: "delete", isOpen: !modal.isOpen });
  };

  const closeModal = () => {
    setModal({ modalType: "", isOpen: !modal.isOpen });
  };

  const confirmDelete = () => {
    let filteredUserId = sharedUserIds.filter(
      (userId) => userId !== selectedUserId
    );

    if (uploadsDetails) {
      dispatch(
        startAddEditShareUpload({
          ...uploadsDetails,
          sharedTo: filteredUserId,
        })
      );
    }
    setModal({ modalType: "", isOpen: !modal });
  };

  const shareToUser = () => {
    if (!selectedUserId) {
      alert("No user selected");
    } else {
      if (uploadsDetails) {
        dispatch(
          startAddEditShareUpload({
            ...uploadsDetails,
            sharedTo: [...sharedUserIds, selectedUserId],
          })
        );
      }
      setSelectedUser("");
    }
  };

  return (
    <>
      <section className="full-section">
        <p>
          <span className="title">Upload Sharing:</span>
          <span className="title-1">{uploadsDetails?.fileName}</span>
        </p>
        <Table
          columns={myUploadsColumns}
          minRow={4}
          tableType="sharedTo"
          data={sharedToUser}
          setDelete={setUser}
        />
        <Modal
          modal={modal}
          closeModal={closeModal}
          isConfirm={confirmDelete}
          handleChanges={() => {}}
        />
      </section>
      <section className="full-section">
        <p className="title">Add Sharing</p>
        <div className="bordered-div p-4">
          <div className="row">
            <div className="col-2 text-end">Choose User:</div>
            <div className="col-3">
              <UserSelection
                value={selectedUserId}
                data={usersList}
                changeHandler={changeHandler}
              />
            </div>
            <div className="col-3 text-start">
              <button className="btn-share" onClick={shareToUser}>
                Add Share
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Share;
