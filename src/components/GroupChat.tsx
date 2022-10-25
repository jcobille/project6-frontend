import React, { useState, useRef, useEffect } from "react";
import { formatTime } from "./misc/utils";
import { useDispatch, useSelector } from "react-redux";
// import { getMessages, submitMessage } from "../redux/chatsAction";
// import { setCurrentUser } from '../redux/usersAction';
import { getUserId } from "./misc/cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  createChat,
  startSetChats,
  startSubmitChat,
} from "../redux/action/chats";
import { startSetCurrentAuthUser, startSetUsers } from "../redux/action/users";
import { User } from "../redux/types/ActionTypes";

const socket = new WebSocket("ws://localhost:3003");

const GroupChat = () => {
  let divRef = useRef<HTMLHeadingElement>(null);
  const sendLabel = "Send";
  const refreshLabel = "Refresh";

  const userId = getUserId();
  const dispatch = useAppDispatch();
  const chatsData = useAppSelector((state) => state.chats);
  const user = useAppSelector<User>((state) => state.currentUser);
  const usersList = useAppSelector<User[]>((state) => state.users);

  const [chat, setChat] = useState({
    userId: "",
    message: "",
  });

  // loads when userId fetched
  useEffect(() => {
    dispatch(startSetChats());
    if (usersList.length === 0) {
      dispatch(startSetUsers());
    }
    if (userId) {
      setChat({ ...chat, userId: userId });
      dispatch(startSetCurrentAuthUser());
    }
  }, [userId]);

  const reloadPage = () => {
    window.location.reload();
  };

  const scrollToBottom = () => {
    if (divRef.current !== null) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setChat({ ...chat, message: evt.target.value });
  };

  const handleSubmit = () => {
    if (chat.message !== "") {
      dispatch(startSubmitChat(chat));
    }
    scrollToBottom();
  };

  const handleKeyEnter = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (socket.readyState === 1 && chat.message !== "") {
      socket.send(
        JSON.stringify({
          ...chatsData[chatsData.length - 1],
          userId: chat.userId,
        })
      );
      setChat({ ...chat, message: "" });
    }

    scrollToBottom();
  }, [chatsData, socket]);

  // chat receiver
  socket.onmessage = (evt) => {
    if (typeof evt.data === "string") {
      const packet = JSON.parse(evt.data).packet;
      if (packet.userId !== userId) {
        dispatch(createChat(packet));
      }
    }
  };

  return (
    <>
      <section className="full-section">
        <div className="bordered-div">
          <div className="div-header">
            Group Chat
            <button className="btn-float-end">&#x2715;</button>
            <div className="row">
              <div className="col-2">
                <div className="div-message p-0">
                  {usersList.map((user, key) => {
                    if (userId !== user.id) {
                      return (
                        <div key={key} className="text-start message">
                          <div className="message-title">{user.name}</div>
                          <div className="message-subtitle">Test</div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="col">
                <div className="div-message text-start p-2">
                  {chatsData.map((chat, key) => {
                    return (
                      <p className="m-0" key={key}>
                        [{formatTime(chat.timestamp)}] {chat.user} :{" "}
                        {chat.message}
                      </p>
                    );
                  })}
                  <div ref={divRef} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-end">{user.name}</div>
            <div className="col">
              <input
                type="text"
                name="message"
                className="bordered-input"
                placeholder="I am good"
                onChange={handleChanges}
                onKeyDown={handleKeyEnter}
                value={chat.message}
                autoComplete="off"
              />
            </div>
            <div className="col-3 text-start">
              <button className="bordered-button btn-md" onClick={handleSubmit}>
                {sendLabel}
              </button>
              <button className="bordered-button btn-md" onClick={reloadPage}>
                {refreshLabel}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GroupChat;
