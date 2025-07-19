import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth"

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);


const AuthProvider = (props) => {

    const [user, setUser] = useState("");

    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth,(user) =>{
        setUser(user)
      })

      return () => unSubscribe();
    }, [])
    

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);

    return(
        <AuthContext.Provider value={{login, register, logout, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, AuthContext , useAuth }