import { TextInput } from "./views/FormInputs";
import React, { useEffect, useState } from "react";
import { checkLoggedUser } from "./misc/api";
import { useNavigate } from "react-router-dom";
import { setPage, startAuthUser } from "../redux/action/users";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const page = useAppSelector((state) => state.page);

  useEffect(() => {
    if (page) {
      navigate(page);
      dispatch(setPage(""));
    }
  }, [page]);

  useEffect(() => {
    if (checkLoggedUser()) navigate("/users-list");
  }, [navigate]);

  const submitLogin = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(startAuthUser(credential));
  };

  const handleCredentialChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let name = evt.target.name;
    let val = evt.target.value;
    setCredential({ ...credential, [name]: val });
  };

  return (
    <section className="section">
      <div className="wrapper">
        <div>
          <p className="title">Login</p>
        </div>
        <div>
          <form>
            <div className="p-2">
              <TextInput
                value={credential.email}
                onChange={handleCredentialChange}
                type="text"
                placeholder="anne.hunter@mail.com"
                name="email"
                label="Email Address"
              />
            </div>
            <div className="p-2">
              <TextInput
                value={credential.password}
                onChange={handleCredentialChange}
                type="password"
                placeholder="********"
                name="password"
                label="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bordered-button cyan btn-lg"
                onClick={submitLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
