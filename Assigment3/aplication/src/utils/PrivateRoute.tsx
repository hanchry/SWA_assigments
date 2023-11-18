import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginState } from '../state/reducers/AuthReducer';

const PrivateRoute = () => {
    const auth = useSelector((state: { authReducer: LoginState }) => state.authReducer.isAuthenticated);

    if (!auth) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
