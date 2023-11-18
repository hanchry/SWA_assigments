import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { login } from "../state/actions/AuthActions";
import {User} from "../types/User";
import { useNavigate } from 'react-router-dom';
import {AuthEnums} from "../state/enums/AuthEnums";


const initialUser: User = {
    id: 0,
    username: '',
    password: '',
    token: '',
    admin: false
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialUser);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        const result = await dispatch(login(formData) as any);

        if(result.type === AuthEnums.LOGIN_SUCCESS){
            navigate('/home')
        }
        else {
            const error = document.getElementById('error');
            if(error != null) {
                error.style.display = 'block';
            }

        }
    };
    const handleRegister = async () => {
        navigate('/register')
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
                <p id='error' className="error-hidden">Incorrect username or password</p>
            </form>
        </div>
    );
};

export default Login;