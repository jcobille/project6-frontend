import { TextInput } from "./views/FormInputs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { startEditUser, startSetUsers } from "../redux/action/users";
import { validateEmail } from "./misc/utils";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const userDetails = useAppSelector((state) =>
    state.users.find((user) => user.id === id)
  );
  useEffect(() => {
    if (!userDetails) {
      dispatch(startSetUsers());
    }
  }, [id]);
  useEffect(() => {
    setUser({ ...user, ...userDetails });
  }, [userDetails]);

  const handleChanges = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let name = evt.target.name;
    let val = evt.target.value;
    setUser({ ...user, [name]: val });
  };

  const handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (user.name === "") {
      alert("Full name is empty");
    } else if (user.email === "") {
      alert("Email is empty");
    } else {
      if (validateEmail(user.email)) {
        dispatch(startEditUser(user));
        navigate("/users-list");
      } else {
        alert("Invalid email address");
      }
    }
  };
  return (
    <>
      <section className="section">
        <div className="wrapper">
          <div>
            <p className="title">Edit User</p>
          </div>
          <div>
            <form method="post">
              <TextInput
                type="text"
                placeholder="Anne Hunter"
                name="name"
                label="Full Name"
                value={user.name}
                onChange={handleChanges}
              />
              <TextInput
                type="text"
                placeholder="anne.hunter@mail.com"
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChanges}
              />
              <div>
                <button
                  type="submit"
                  className="bordered-button cyan btn-lg"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditUser;
