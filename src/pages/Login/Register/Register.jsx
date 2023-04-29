import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Register = () => {
    const { user, createUser, emailVerification, updateInfo } = useContext(AuthContext)
    const [success, setSuccess] = useState("");
    const [accepted, setAccepted] = useState(false);
    

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        // console.log(name, email, photo, password);
        createUser(email, password)
            .then(result => {
                const newUser = result.user;

                // console.log(newUser);
                alert("Successful user creation")
                emailVerification()
                    .then(() => {
                        setSuccess("A verification email sent to the address")
                    })
                updateInfo(name, photo)
                    .then((result) => {
                        const newUser = result?.user;
                        console.log("Profile updated");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleCheck = (event) =>{
        setAccepted(event.target.checked);
    }
    
    return (
        <Container className="w-25 mx-auto">
            <h2>Please Register</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name="name" id="name" placeholder="Enter name" required />

                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Photo url</Form.Label>
                    <Form.Control type="text" name="photo" id="photo" placeholder="Photo url" required />

                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" id="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" id="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Text className="text-danger">

                    </Form.Text>
                    <Form.Text className='text-black'>
                        {
                            success
                        }
                    </Form.Text>
                    <Form.Check
                        onClick={handleCheck}
                        type="checkbox" name="accept" label="Accept Terms and Conditions" required />
                </Form.Group>
                <Button
                    disabled={!accepted}
                    variant="primary"  type="submit">
                    Register
                </Button>
                <br />
                <Form.Text className="text-secondary">
                    Already have an account? <Link to='/login'>Login</Link>
                </Form.Text>
            </Form>
        </Container>
    );
};

export default Register;