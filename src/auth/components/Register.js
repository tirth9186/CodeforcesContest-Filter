import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import { Col } from "react-bootstrap";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const validUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The Username must be between 3 to 20 characters.
            </div>
        );
    }
}

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [handle, setHandle] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeHandle = (e) => {
        setHandle(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password, handle).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message)
                        || (error.message)
                        || (error.toString());
                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
        else {
            setMessage("Something went wrong!");
            setSuccessful(false);
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

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, validUsername]}
                                    className="form-control"
                                    name="username"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                    className="form-control"
                                    name="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="handle">Codeforces Handle</label>
                                <Input
                                    type="text"
                                    value={handle}
                                    onChange={onChangeHandle}
                                    validations={[required]}
                                    className="form-control"
                                    name="handle"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, validPassword]}
                                    className="form-control"
                                    name="password"
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-block btn-primary">SignUp</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                </Form>
            </div>
        </Col>
    );
};

export default Register;