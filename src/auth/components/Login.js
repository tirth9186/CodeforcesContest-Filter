import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Col } from "react-bootstrap";
import AuthService from "../services/auth.service";
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {   
                    props.history.push("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) ||
                        (error.message) || (error.toString());
                    setMessage(resMessage);
                    setLoading(false);  
                }
            );
        }
        else {
            setLoading(false);
        }
    }

    return (
        <Col md={{ span: 4, offset: 4 }} className="mt-4">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input name="username" type="text" className="form-control" value={username} onChange={onChangeUsername} validations={[required]} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input name="password" type="password" className="form-control " value={password} onChange={onChangePassword} validations={[required]} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block btn-primary" disabled={loading}>
                            {
                                loading && (<span className="spinner-border spinner-border-sm"></span>)
                            }
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div class="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                </Form>
            </div>
        </Col>
    );

}

export default Login;