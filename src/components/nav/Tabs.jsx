import { Link } from "react-router-dom";
import { useState } from 'react';
import { logout } from "../misc/cookie";
import { useAppDispatch } from "../../store/hooks";
const paths = [
    { path: "/group-chat", tabName: "Group Chat" },
    { path: "/users-list", tabName: "Manage Users" },
    { path: "/docs-list", tabName: "Manage Documents" },
];

const Tabs = () => {
    const pathname = window.location.pathname;
    const dispatch = useAppDispatch();
    const [path, setPath] = useState(pathname);
    const changePath = evt => {
        setPath(evt.target.value);
    }
    const logoutHandler = () => {
        logout()
    }

    return (
        <div className="row">
            {paths.map((item, i) =>
                <div className="navtab" key={i}>
                    <Link to={item.path}>
                        <button className={"navBtn " + (path === item.path ? 'active' : '')} type="button" value={item.path} onClick={changePath}>{item.tabName}</button>
                    </Link>
                </div>
            )}

            <div className="navtab">
                <Link to="/logout">
                    <button className="navBtn" type="button" onClick={logoutHandler}>Logout</button>
                </Link>
            </div>
        </div>
    )
}

export default Tabs;