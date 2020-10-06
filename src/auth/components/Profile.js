import React, { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import ListLoading from "../../Components/ListLoading";
import DataList from "./DataList";


const Profile = () => {
    const ListLoader = ListLoading();
    const [userHandle, setUserHandle] = useState("tirth9960");
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({});
    const cache = useRef({});
    const cuser = AuthService.getUser();
    if (cuser) {
        setCurrentUser(cuser);
    }
    useEffect(() => {
        if (currentUser && currentUser.handle) {
            setUserHandle(currentUser.handle);
        }
        const fetchData = async () => {
            const apiUrl = `https://codeforces.com/api/user.status?handle=${userHandle}`;
            let res = {};
            setLoading(true);
            if (cache.current[userHandle]) {
                res = cache.current[userHandle];
                setLoading(false);
            }
            else {
                const response = await fetch(apiUrl);
                res = await response.json();
                cache.current[userHandle] = res;
                setLoading(false);
            }
            setUserData(res);
        }
        fetchData();
    }, [currentUser]);

    if (currentUser && currentUser.username) {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>

                <p>
                    <strong>Id:</strong>{currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong>{currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
                    }
                </ul>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <header className="alert alert-danger mt-5">
                    <h3>
                        Unauthorized Access!!
                    </h3>
                </header>
                <ListLoader List={DataList} data={userData} isLoading={loading} />

            </div>
        );
    }
};
export default Profile;