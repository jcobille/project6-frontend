import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import RegisterSuccess from "./components/RegisterSuccess";
import Login from "./components/Login";
import "./index.scss";
import LoginSuccess from "./components/LoginSuccess";
import ProtectedRoute from "./ProtectedRoutes";
import UsersList from "./components/UsersList";
import DocsList from "./components/DocsList";
import GroupChat from "./components/GroupChat";
import EditUser from "./components/EditUser";
import Share from "./components/Share";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/docs-list" element={<DocsList />} />
          <Route path="/group-chat" element={<GroupChat />} />
          <Route path="/share/:id" element={<Share />} />
        </Route>
        <Route index element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
