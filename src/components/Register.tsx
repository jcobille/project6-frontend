import { TextInput } from "./views/FormInputs";
import React, { useEffect, useRef, useState } from "react";
import { setPage, startCreateUser } from "../redux/action/users";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router";
import { checkLoggedUser } from "./misc/api";
import { validateEmail } from "./misc/utils";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const page = useAppSelector((state) => state.page);

  useEffect(() => {
    if (page) {
      navigate(page);
      dispatch(setPage(""));
    }
    if (checkLoggedUser()) navigate("/users-list");
  }, [page]);

  const onCreate = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!user.name) {
      alert("Full name is empty");
    } else if (!user.email) {
      alert("Email is empty");
    } else if (!user.password) {
      alert("Password is empty");
    } else if (!confirmPassword.current?.value) {
      alert("Confirm password is empty");
    } else {
      if (confirmPassword.current.value === user.password) {
        if (validateEmail(user.email)) {
          dispatch(startCreateUser(user));
        } else {
          alert("Invalid email address");
        }
      } else {
        alert("Password do not match");
      }
    }
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <section className="section">
      <div className="wrapper">
        <div>
          <p className="title">Register</p>
        </div>
        <div>
          <form method="post">
            <div className="p-2">
              <TextInput
                value={user.name}
                onChange={changeHandler}
                name="name"
                type="text"
                placeholder="Anne Hunter"
                label="Full Name"
              />
            </div>
            <div className="p-2">
              <TextInput
                value={user.email}
                onChange={changeHandler}
                name="email"
                type="text"
                placeholder="anne.hunter@mail.com"
                label="Email Address"
              />
            </div>
            <div className="p-2">
              <TextInput
                value={user.password}
                onChange={changeHandler}
                name="password"
                type="password"
                placeholder="********"
                label="Password"
              />
            </div>
            <div className="p-2">
              <div className="row">
                <div className="col-5 text-end">
                  <label>Confirm Password</label>
                </div>
                <div className="col-3 text-start">
                  <input
                    ref={confirmPassword}
                    className="bordered-input"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className="bordered-button cyan btn-lg"
                onClick={onCreate}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
