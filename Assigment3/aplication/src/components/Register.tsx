import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {register} from '../state/actions/AuthActions'; // Import your register action
import {User} from '../types/User';
import {useNavigate} from "react-router-dom";
import {AuthEnums} from "../state/enums/AuthEnums";

const initialUser: User = {
    id: 0,
    username: '',
    password: '',
    token: '',
    admin: false,
};

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialUser);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleRegister = async () => {
        const result = await dispatch(register(formData) as any);

        if (result.type === AuthEnums.REGISTER_SUCCESS) {
            navigate('/home')
        } else {
            const error = document.getElementById('error');
            if (error != null) {
                error.style.display = 'block';
            }
        }
    };

    const handleLogin = () => {
        navigate('/')
    }

    return (
        <div className="container">
            <div className="login-form">
                <h1>Register</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="john_doe"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="super secret password"
                        />
                    </div>
                    <div id="button-auth-container">
                        <button className="button-auth" type="button" onClick={handleRegister}>
                            Register
                        </button>
                        <button className="button-auth" type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <p id="error" className="error-hidden">User already exists</p>
                </form>
            </div>
        </div>

    );
}

export default Register;