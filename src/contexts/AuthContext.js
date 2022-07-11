import React ,{ useContext , useEffect, useState } from 'react'
import { auth } from "../firebase"

const AuthContest = React.createContext();

export function useAuth(){
    return useContext(AuthContest)
}

export function AuthProvider({ children }) {

    const [currentUser , setCurrentUser] = useState()
    const [loading , setLoading] = useState(true)

     function signUp(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function signIn(email,passward){
        return auth.signInWithEmailAndPassword(email,passward);
    }

    function logout(){
        return auth.signOut();
    }
    
    useEffect(() =>{
       const unsubscribe =  auth.onAuthStateChanged(user =>{
           setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    

    const value = {
        currentUser,
        signUp,
        signIn,
        logout
    }

  return (
    <AuthContest.Provider value={value} >
        {!loading && children }
    </AuthContest.Provider>
  )
}
