import React from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.svg";

const Header = (props) => {

    const loginButtonHandler = () => {

    }
    const logoutButtonHandler = () => {

    }
    const bookShowButtonHandler = () => {
        
    }
    return (
        <div className="Header">
            <img className="Logo" src={logo} alt="Logo"/>
            <Button className="Button-style"
              variant="contained"
              onClick={loginButtonHandler}
              color="default"
            >LOGIN </Button>
            <Button className="Button-style"
              variant="contained"
              onClick={logoutButtonHandler}
              color="default"
            >LOGOUT </Button>
            <Button className="Button-style"
              variant="contained"
              onClick={bookShowButtonHandler}
              color="primary"
            >BOOK SHOW </Button>
        </div>
    )
}

export default Header;