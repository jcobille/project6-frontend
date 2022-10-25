import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { checkLoggedUser } from './misc/api';
import { useAppDispatch, useAppSelector } from "../store/hooks";

const RegisterSuccess = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (checkLoggedUser()) navigate('/login-success');
    // });
    return (
        <>
            <section className="section">
                <div className="wrapper">
                    <div>
                        <p className="title">
                            Registration Successful
                        </p>
                    </div>
                    <div>
                        <p className="title-1">
                            Thank you for your registration
                        </p>
                    </div>
                    <div>
                        <Link to="/">Click to return to home page</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RegisterSuccess