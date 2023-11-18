import {useDispatch, useSelector} from "react-redux";
import {User} from "../types/User";
import {getUser} from "../state/actions/UserActions";
import {useEffect} from "react";
import {LoginState} from "../state/reducers/AuthReducer";

const request:User = {
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

    const user:User = useSelector((state: any) => state.userReducer.user);

    useEffect(() => {
        const fetchDate = async () => {
            const response = await dispatch(getUser(request) as any);
        }
        fetchDate();
    }, [dispatch]);


    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Home</h1>
            <p>{user.id}</p>
            <p>{user.username}</p>
            <p>{user.password}</p>
            <p>{user.token}</p>
        </div>
    );
}

export default Home;