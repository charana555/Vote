import React ,{useState} from "react";
import { Card, Form, Button, Alert ,Container} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link , useNavigate} from "react-router-dom"
import { firestore } from "../firebase";
import { setDoc ,  doc } from "firebase/firestore";

const Signup = () => {

  const [user , setUser] = useState({
          name:"",email:"",phone:"",role:"",password:"",cpassword:""
      });
      let name,value;
      const handleInputs = (e) =>{
          name = e.target.name;
    value = e.target.value;

    setUser({...user , [name]:value })
}

  const addData = async () =>{
    try {
     await setDoc(doc(firestore , "users" ,user.email),{
        email:user.email,
        name:user.name,
        phone:user.phone,
        role:user.role,
        status:false,
        votes:0
     })
    } catch (error) {
      console.log(error);
    }
    
  }

const navigate = useNavigate();

const [error , setError] = useState("")
const [loading , setLoading] = useState(false)

const { signUp } = useAuth()  

   const handleSubmit = async (e) =>{
        e.preventDefault()

        if(user.password !== user.cpassword){
            return setError("Password does not match")
        }
        try {
            setError("")
            setLoading(true)
           await signUp(user.email, user.password)
           await addData()
           navigate('/')
        } catch  {
            setLoading(false)
            return setError("Failed to signup")
        }

        setLoading(false)
   }

  return (
    <>
  <Container className="d-flex align-items-center justify-content-center " style={{minHeight : "100vh"}}> 
      <div  className="w-100" style={{maxWidth : "450px"}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger" >{error}</Alert> }
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required name="email" value={user.email} onChange={handleInputs} />
            </Form.Group>
            <Form.Group id="name" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required name="name" value={user.name} onChange={handleInputs}  />
            </Form.Group>
            <Form.Group id="phone" >
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" required name="phone" value={user.phone} onChange={handleInputs}  />
            </Form.Group>
            <Form.Group id="role" className="mt-2">
              <Form.Label style={{marginRight : "0.5rem"}}>Role</Form.Label>
                <Form.Check inline type="radio" label="Voter" name="role" value= "voter"onChange={handleInputs}/>
                <Form.Check inline type="radio" label="Participant" name="role" value="participant" onChange={handleInputs}/>
            </Form.Group>
            
            <Form.Group id="password" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required name="password" value={user.password} onChange={handleInputs} />
            </Form.Group>
            <Form.Group id="confirmpassword" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required name="cpassword" value={user.cpassword} onChange={handleInputs}/>
            </Form.Group>
            <Button disabled = {loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center my-2">
        Already have an account ?<Link to='/signin' >SignIn</Link> 
      </div>
      </div>
  </Container>
     
    </>
  );
};

export default Signup;
