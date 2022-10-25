import { useEffect, useState } from "react";
import { startSetCurrentAuthUser } from "../redux/action/users";
import { User } from "../redux/types/ActionTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const LoginSuccess = () => {
  const [user, setUser] = useState<User>();
  const currentUser = useAppSelector<User>((state) => state.currentUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!currentUser.id) {
      dispatch(startSetCurrentAuthUser());
    } else {
      setUser(currentUser);
    }
  }, [currentUser]);
  
  return (
    <>
      <section className="section">
        <div className="wrapper">
          <div>
            <p className="title">Login Successful</p>
          </div>
          <div>
            <p className="title-1">
              <b>Welcome !</b> {user?.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSuccess;
