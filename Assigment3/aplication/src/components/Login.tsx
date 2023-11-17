import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { login } from "../state/actions/AuthActions";
import {User} from "../types/User";



const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<User>({
        id: 0,
        username: '',
        password: '',
        token: '',
        admin: false
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = () => {
        dispatch(login(formData) as any);
    };

    return (
        <div>
            <h1>Login Page</h1>
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
            </form>
        </div>
    );
};

export default Login;