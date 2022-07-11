import firebase from "firebase/compat/app"
import "firebase/compat/auth"


const app = firebase.initializeApp({
    apiKey: "AIzaSyA1IVY00Wm3VcSV_fTGo2XQuPmhOz7vzhQ",
    authDomain: "votingsystem-6d0f6.firebaseapp.com",
    projectId: "votingsystem-6d0f6",
    storageBucket: "votingsystem-6d0f6.appspot.com",
    messagingSenderId: "440724488555",
    appId: "1:440724488555:web:a0cbb0003f5c68fd224c2e"
  }) ;


  export const auth = app.auth()
  export default app