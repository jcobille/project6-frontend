import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoggedUser } from "./misc/api";
const Welcome = () => {
  const navigate = useNavigate();
  const pathName: string = window.location.pathname;
  const logout: boolean = pathName === "/logout" ? true : false;

  useEffect(() => {
    if (checkLoggedUser()) navigate("/users-list");
  }, [navigate]);

  return (
    <section className="section">
      <div className="wrapper">
        <div>
          <p className="title">Welcome to Users Module</p>
        </div>
        <div>
          <p className="title-1">Existing Users</p>
          <Link to="/login">
            <button type="button" className="bordered-button btn-lg">
              Login
            </button>
          </Link>
        </div>
        <div>
          <p className="title-1">New Users</p>
          <Link to="/register">
            <button type="button" className="bordered-button btn-lg">
              Register
            </button>
          </Link>
        </div>
        <div hidden={!logout}>
          <b>You have been logged out</b>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
