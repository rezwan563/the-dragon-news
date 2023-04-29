import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaEye, FaEyeDropper, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [error, setError] = useState('');
    const { user, emailLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/category/0';
    const [accepted, setAccepted] = useState(false);
    const [hidden, setHidden] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        emailLogin(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from)
            })
            .catch(error => {
                const errorMessage = error.message;
                if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                    setError("Password did not match. Please try again")
                }
                else {
                    setError(errorMessage)
                }
                console.log(errorMessage);
            })
    }

    const handlePassword = () => {
        setError('')
    }

    const checkedBox = (event) => {
        const isChecked = event.target.checked;
        console.log(isChecked);
        setAccepted(isChecked);
    }
    return (
        <Container className="w-25 mx-auto">
            <h2>Please Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handlePassword} type={hidden ? 'text' : 'password'} name="password" placeholder="Password" required />
                    {
                        hidden ? <FaEye onClick={() => setHidden(!hidden)}></FaEye>

                            : <FaEyeSlash onClick={() => setHidden(!hidden)}></FaEyeSlash>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Text className="text-danger">

                    </Form.Text>
                    <Form.Text className={`${error ? 'text-danger' : 'text-success'}`}>
                        {
                            error
                        }
                    </Form.Text>
                    <Form.Check
                        onClick={checkedBox}
                        type="checkbox" label="Check me out" required />
                </Form.Group>
                <Button
                    variant="primary" disabled={!accepted} type="submit">
                    Login
                </Button>
                <br />
                <Form.Text className="text-secondary">
                    Don't have an account? <Link to='/register'>Register</Link>
                </Form.Text>
            </Form>
        </Container>
    );
};

export default Login;