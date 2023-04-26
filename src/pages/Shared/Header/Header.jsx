// import React from 'react';
import { Button, Container } from "react-bootstrap";
import logo from "../../../assets/logo.png"
import moment from 'moment';
import Marquee from "react-fast-marquee";

const Header = () => {
    return (
        <Container>
            <div className="text-center mt-4">
                <img src={logo} alt="" />
                <p className="text-secondary"><small>Journalism without fear or favour</small></p>
                <p>{moment().format('LLLL')}</p>
            </div>
            <div className="d-flex">
                <Button variant="danger">Latest</Button>
                <Marquee className="text-danger" pauseOnHover speed={100}>
                    I can be a React component, multiple React components, or just some text.
                </Marquee>

            </div>
          
        </Container>
    );
};

export default Header;