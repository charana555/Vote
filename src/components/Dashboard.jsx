import React ,{useEffect , useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Container, Navbar , Card ,Alert, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import photo from "../assets/profile.png"
import { doc , collection, onSnapshot , query ,where , updateDoc} from "firebase/firestore";
import { firestore  } from "../firebase";



const Dashboard = () => {
  const { logout , currentUser } = useAuth();
  const navigate = useNavigate();


  const [user,setUser] = useState({});
  const [error,setError] = useState("");
  const [group , setGroup] = useState([])
 
// -----------------logout Handling Function -------------------------
  const handleSubmit = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch {
      setError("Failed to logout")
    }
  };

// ------------------------Getting Voter information ----------------------  
  const getUserData =  () => {
    const docRef = doc(firestore , "users" , currentUser.email); 
     try{
       onSnapshot(docRef ,(doc) =>{
        setUser(doc.data())
      } );
     
    } catch {
      setError("Failed to get data")
    }
  }

// -------------------------Getting Groups information ------------------------
  const getGroupData = () =>{
      const colRef = collection(firestore , "users");
      const q = query(colRef , where("role" ,"==" ,"participant"));
      onSnapshot(q,(snapshot) =>{
        let team =[]
        snapshot.docs.forEach((doc) =>{
          team.push({...doc.data()})
        })
        setGroup(team)
      })
    }
// ---------------------Updating Vote - status -----------------
    const updateStatus = () => {
      const updateRef = doc(firestore , "users" , currentUser.email); 
      updateDoc(updateRef ,{
        status:true
      })
    }

  // ----------------------Voting Function -------------------------------   
    const voting = (id ,num) =>{
     const updateRef = doc(firestore , "users" , id); 
     updateDoc(updateRef ,{
       votes:num+1
     })
     updateStatus()
    }

  useEffect(() =>{

    getUserData();
    getGroupData();
  },[])

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Navbar bg="dark" expand="lg" variant="dark" >
        <Container fluid>
          <Navbar.Brand href="#">Voting System</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Button onClick={handleSubmit} variant="outline-danger">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
     <div className="w-100 d-flex bg-success p-2 text-dark bg-opacity-10">
     <section className=" vh-100 d-flex justify-content-center align-items-center" style={{width:"30%"}}>
          <Card className="shadow p-3 mb-5 bg-body rounded" style={{width : "18rem" , minWidth:"300px"}}>
            <Card.Img variant="top" src={photo} style={{height:"100px" , width:100 ,margin:"20px auto"}}  />
            <Card.Body >
              <ul className="list-unstyled">
                  <li className="my-2" > <span className="mx-2"><b> Name :</b></span>{user.name}</li>
                  <li className="my-2" > <span className="mx-2"><b> Email : </b></span>{currentUser.email}</li>
                  <li className="my-2" > <span className="mx-2"><b> Phone : </b></span>{user.phone}</li>
                  <li className="my-2" > <span className="mx-2"><b> Role : </b></span>{user.role}</li>
                  <li className="my-2" > <span className="mx-2"><b> Status : </b></span>{user.status && <span className="text-success">Voted</span> }{!user.status && <span className="text-danger">NotVoted</span>}</li>
              </ul>
            </Card.Body>
          </Card>
      </section>
      <section className=" vh-100 "  style={{width:"70%"}}>
         {
          group.map((item) =>{
            return(
              <Card key={item.email} className="shadow p-3 mb-5 bg-body rounded d-flex flex-row align-items-center">
                <Card.Body>
                  <Form>
                      <ul className="list-unstyled">
                          <li className="my-2" > <b className="fs-5">Name :</b> <span className="mx-4 fw-bold "> {item.name} </span> </li>
                          <li className="my-2" > <b className="fs-5">Votes :</b> <span className="mx-4 fw-bold"> {item.votes} </span> </li>
                      </ul>
                      <Button disabled = {user.status} onClick = {() => voting(item.email , item.votes)} variant="success">Vote</Button>
                  </Form>
                </Card.Body>
                <div className="mx-4">
                <Card.Img  src={photo} style={{height:"100px" , width:100}}  />
                </div>
              </Card>
            )
          })
         }
      </section>
     </div>
    </>
  );
};

export default Dashboard;
