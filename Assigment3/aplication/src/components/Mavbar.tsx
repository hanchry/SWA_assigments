import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {LoginState} from "../state/reducers/AuthReducer";
import {logout} from "../state/actions/AuthActions";
import {AuthEnums} from "../state/enums/AuthEnums";


function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: { authReducer: LoginState }) => state.authReducer.isAuthenticated);
    const token = useSelector((state:{ authReducer: LoginState }) => state.authReducer.token);
    const handleLogout = async () => {
        if(token === undefined) return;

        const result = await dispatch(logout(token) as any);

        if(result.type === AuthEnums.LOGOUT_SUCCESS){
            navigate('/')
        }
    }

    if(!auth) return (<></>);

    return (
        <nav>
            <ul>
                <li>
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
            </ul>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;