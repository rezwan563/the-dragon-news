// import React from 'react';
import { Button, ListGroup } from "react-bootstrap";
import { FaGoogle, FaGithub, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import QZone from "../QZone/QZone";
import bg from "../../../assets/bg.png"
import "./RightNav.css"
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const RightNav = () => {
    const { googleLogin, githubLogin } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <h4 className="my-4">Right Nav</h4>
            <Button className="mb-2" onClick={handleGoogleLogin} variant="outline-primary"><FaGoogle /> Login with google</Button>
            <Button onClick={handleGithubLogin}variant="outline-secondary"><FaGithub /> Login with github</Button>
            <div className="my-4">
                <h4>Find us on</h4>
                <ListGroup>
                    <ListGroup.Item><FaFacebookF /> Facebook</ListGroup.Item>
                    <ListGroup.Item><FaInstagram /> Instagram</ListGroup.Item>
                    <ListGroup.Item><FaTwitter /> Twitter</ListGroup.Item>
                </ListGroup>
            </div>
            <QZone></QZone>
            <div className="bg-img">
                <img src={bg} alt="" />
                <div className="centered">
                    <h3>Create an Amazing Newspaper</h3>
                    <p>Discover thousands of options, easy to customize layout, one- click to import demo and much more</p>
                    <Button variant="danger">Learn More</Button>
                </div>
            </div>

        </div>
    );
};

export default RightNav;