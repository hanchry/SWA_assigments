import {useDispatch, useSelector} from "react-redux";
import {User} from "../types/User";
import {getUser, updateUser} from "../state/actions/UserActions";
import React, {useEffect, useState} from "react";
import {LoginState} from "../state/reducers/AuthReducer";
import {UserEnums} from "../state/enums/UserEnums";

const request: User = {
    id: 0,
    username: "",
    password: "",
    token: "",
    admin: false
}
const Home = () => {
    const dispatch = useDispatch();

    request.id = useSelector((state: { authReducer: LoginState }) => state.authReducer.userId) as number;
    request.token = useSelector((state: { authReducer: LoginState }) => state.authReducer.token) as string;

    const user: User = useSelector((state: any) => state.userReducer.user);

    const [formData, setFormData] = useState(user);

    useEffect(() => {
        const fetchDate = async () => {
            const response = await dispatch(getUser(request) as any);
        }
        fetchDate();
    }, [dispatch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name + " " + event.target.value)
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }
    const handleUpdate = async () => {
        formData.token = request.token;
        formData.id = request.id;
        formData.username = user.username;

        const response = await dispatch(updateUser(formData) as any);

        if (response.type === UserEnums.UPDATE_USER_SUCCESS) {
            console.log("update success")
        } else {
            console.log("update failed")
        }
    }


    if (!user) {
        return <div>Loading...</div>;
    }
    return (
            <div className="container1">
                <div className="user-profile">
                    <div className="profile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle"
                             width="44"
                             height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
                        </svg>
                    </div>
                    <div className="profile-info">
                        <label className="label1">UserName:</label>
                        <input
                            className="input1"
                            type="text"
                            name="username"
                            value={user.username}
                            readOnly
                        />
                    </div>
                    <div className="profile-info">
                        <label className="label1">Password:</label>
                        <input className="input1"
                               type="text"
                               name={"password"}
                               placeholder={user.password}
                               onChange={handleInputChange}
                        />
                    </div>
                    <button className="button1" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>
    );
}

export default Home;