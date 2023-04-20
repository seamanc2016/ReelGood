import {useState, useEffect} from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import '../config/firebase-config';



function Login(){

  const [Auth, setAuth] = useState(false);  // determines if user is authenticated
  const [token, setToken] = useState('');

  useEffect(()=>{

    const auth = getAuth();
    auth.onAuthStateChanged((user) => { // when users login state changes...
      if(user){
        console.log(user)
        // setAuth(true);
        // userCred.getIdToken().then((token)=>{
        //   setToken(token);
        // })
      }
    })
  }, [])


  // called when user logs in
  const login = (username, password, email) =>{
    const auth = getAuth()
    auth.signInWithEmailandPassword(email, password, email)
    .then((usercredentials) => {
      if(usercredentials){
        setAuth(true)
      }
    });
}
  
  return(
    <>
    <h1>LOL</h1>
    </>
  );
}

export default Login