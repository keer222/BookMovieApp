import React, { useState } from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.svg";
import ReactModal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const Header = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [contactno, setContactno] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [reqFirstname, setReqFirstname] = useState("dispNone");
    const [reqLastname, setReqLastname] = useState("dispNone");
    const [reqEmail, setReqEmail] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [reqContactno, setReqContactno] = useState("dispNone");
    const [result, setResult] = useState("");

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const toggleLoginButton = (signIn) => {
        if (props.isLoggedIn || signIn) {
            props.setDisplayLogoutButton("block");
            props.setDisplayLoginButton("none");
        } else {
            props.setDisplayLogoutButton("none");
            props.setDisplayLoginButton("block");
        }
    }

    const logoutButtonHandler = () => {
        props.setIsLoggedIn(false);
        props.setDisplayLogoutButton("none");
        props.setDisplayLoginButton("block");
    }
    const bookShowButtonHandler = () => {
        props.history.push({
            pathname: "/bookshow/" + props.match.params.id
        });
    }
    const setUser = (event) => {
        setUsername(event.target.value);
    }
    const setPwd = (event) => {
        setPassword(event.target.value);
    }

    const signInButtonHandler = () => {
        if (username === "" || password === "")
            return;
        else {
            setShowLoginModal(false);
            props.setIsLoggedIn(true);
            toggleLoginButton(true);
        }
    }
    const registerButtonHandler = async () => {
        firstname === "" ? setReqFirstname("dispBlock") : setReqFirstname("dispNone");
        lastname === "" ? setReqLastname("dispBlock") : setReqLastname("dispNone");
        email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
        regPassword === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
        contactno === "" ? setReqContactno("dispBlock") : setReqContactno("dispNone");

        if (firstname === "" || lastname === "" || email === "" || regPassword === "" || contactno === "") {
            return;
        } else {
            let data = {
                "email_address": email,
                "first_name": firstname,
                "last_name": lastname,
                "mobile_number": contactno,
                "password": regPassword
            };
            await fetch(props.baseUrl + "signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((response) => {
                    if (response.status === "ACTIVE")
                        setResult("Registration Successful. Please Login!");
                }).catch(e => {
                    console.log(e);
                    setResult("Registration Failed. Please retry!");
                });
        }
    }

    return (
        <div className="Header">
            <img className="Logo" src={logo} alt="Logo" />
            <Button className="Button-style"
                variant="contained"
                onClick={() => { setShowLoginModal(true) }}
                color="default" style={{ display: props.displayLoginButton }}
            >LOGIN </Button>
            <ReactModal
                isOpen={showLoginModal}
                ariaHideApp={false}
                contentLabel="Login Modal">
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="LOGIN" />
                    <Tab label="REGISTER" />
                </Tabs>
                <div className="tab-style">
                    {tabIndex === 0 && (
                        <div>
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="username"> Username </InputLabel>
                                <Input
                                    id="username"
                                    value={username}
                                    type="text"
                                    onChange={setUser}
                                />
                            </FormControl><br /><br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="password"> Password </InputLabel>
                                <Input
                                    id="password"
                                    value={password}
                                    type="password"
                                    onChange={setPwd}
                                />
                            </FormControl><br /><br /><br /><br />
                            <FormControl required className="formControl">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={signInButtonHandler}
                                >LOGIN
                                </Button>
                            </FormControl></div>
                    )}
                </div>
                <div className="tab-style">
                    {tabIndex === 1 && (
                        <div>
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="firstname"> First Name </InputLabel>
                                <Input
                                    id="firstname"
                                    value={firstname}
                                    type="text"
                                    onChange={event => { setFirstname(event.target.value) }}
                                />
                                <FormHelperText className={reqFirstname}><span className="red">Required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="lastname"> Last Name </InputLabel>
                                <Input
                                    id="lastname"
                                    value={lastname}
                                    type="text"
                                    onChange={event => { setLastname(event.target.value) }}
                                />
                                <FormHelperText className={reqLastname}><span className="red">Required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="email"> Email </InputLabel>
                                <Input
                                    id="email"
                                    value={email}
                                    type="text"
                                    onChange={event => { setEmail(event.target.value) }}
                                />
                                <FormHelperText className={reqEmail}><span className="red">Required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="password"> Password </InputLabel>
                                <Input
                                    id="password"
                                    value={regPassword}
                                    type="password"
                                    onChange={event => { setRegPassword(event.target.value) }}
                                />
                                <FormHelperText className={reqPassword}><span className="red">Required</span></FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="contact"> Contact No. </InputLabel>
                                <Input
                                    id="contact"
                                    value={contactno}
                                    type="text"
                                    onChange={event => { setContactno(event.target.value) }}
                                />
                                <FormHelperText className={reqContactno}><span className="red">Required</span></FormHelperText>
                            </FormControl><br /><br /><br /><br />
                            <FormControl required className="formControl">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={registerButtonHandler}
                                >REGISTER
                                </Button>
                            </FormControl><br /><br />
                            {result}</div>
                    )}
                </div>
            </ReactModal>

            <Button className="Button-style"
                variant="contained"
                onClick={logoutButtonHandler}
                color="default" style={{ display: props.displayLogoutButton }}>LOGOUT
            </Button>

            <Button className="Button-style"
                variant="contained"
                onClick={bookShowButtonHandler}
                color="primary" style={{ display: props.displayBookShowButton }}>BOOK SHOW
            </Button>
        </div>
    )
}

export default Header;