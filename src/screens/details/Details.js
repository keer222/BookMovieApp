import React from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const Details = (props) => {

    return (
        <div>
            <Header />
            <Typography className="back-home">
                <Link to="/">
                    &#60; Back to Home
                </Link>
            </Typography>
            <div className="details-container">
                <div>
                    HI {props.baseUrl}
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Details;