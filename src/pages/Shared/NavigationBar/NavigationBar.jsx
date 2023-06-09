import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavigationBar.css"

const NavigationBar = () => {
    const {user, userLogout } = useContext(AuthContext);

    const handleLogout = () =>{
        userLogout()
        .then(() => console.log("Logout successful"))
        .catch((error) => console.error(error))
    }
    return (
        <Container>
             <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">

                            <ul className="d-flex gap-4 list-unstyled ">
                                <li className="text-secondary "><Link to='/' className="text-decoration-none text-secondary">Home</Link></li>
                                <li className="text-secondary "><Link className="text-decoration-none text-secondary">About</Link></li>
                                <li className="text-secondary "><Link className="text-decoration-none text-secondary">Career</Link></li>
                            </ul>

                        </Nav>
                        <Nav>
                            {
                                user?.photoURL ? <img src={user.photoURL} className="avatar-img" />
                                :
                                <Nav.Link href="#deets">
                                    <FaUserCircle style={{ fontSize: '2rem'}}></FaUserCircle></Nav.Link>
                            }
                            {/* <Nav.Link eventKey={2} href="#memes"> */}
                                {user ?
                                    <Button onClick={handleLogout}  variant="dark">Logout</Button> :
                                  <Link to='/login'>  <Button variant="dark">Login</Button></Link>
                                }
                            {/* </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};

export default NavigationBar;