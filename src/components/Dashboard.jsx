import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

const { logout } = useAuth()
const navigate = useNavigate()

const handleSubmit = async () =>{

  try {
    await logout();
    navigate("/signin")
  } catch (e) {
      console.log(e);
  }


}
  return (
    <>
      <Button onClick={handleSubmit}>Logout</Button>
    </>
  )
}

export default Dashboard