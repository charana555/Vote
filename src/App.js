import React from "react";
import Signup from "./components/Signup"
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router  , Route , Routes } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    < >
    <Router>
    <AuthProvider>
        <Routes>
          <Route path="/signup" element = {<Signup/>} />
          <Route path="/signin" element = {<Signin />} />
          <Route  exact path="/" element = {<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
    </AuthProvider>
    </Router>
    </>
  );
}

export default App;
