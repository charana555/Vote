import React ,{useRef} from "react";
import { useState } from "react";
import { Card, Form, Button, Alert ,Container} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link , useNavigate} from "react-router-dom"

const Signin = () => {

const emailRef = useRef();
const passwardRef = useRef();

const navigate = useNavigate();


const [error , setError] = useState("")
const [loading , setLoading] = useState(false)

const { signIn } = useAuth()  

   const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
           await signIn(emailRef.current.value , passwardRef.current.value)
           navigate('/')
        } catch  {
            setLoading(false)
            return setError("Failed to Login")
        }

        setLoading(false)
   }

  return (
    <>
  <Container className="d-flex align-items-center justify-content-center " style={{minHeight : "100vh"}}> 
      <div  className="w-100" style={{maxWidth : "450px"}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger" >{error}</Alert> }
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwardRef} />
            </Form.Group>
            <Button disabled = {loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center my-2">
        Don't have an account ?<Link to='/signup'>SignUp</Link> 
      </div>
      </div>
  </Container>
     
    </>
  );
};

export default Signin;
