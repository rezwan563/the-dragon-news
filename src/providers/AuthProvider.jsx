import { createContext, useEffect, useState } from "react";
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const emailLogin = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () =>{
        return signInWithPopup(auth, githubProvider);
    }

    const userLogout = () =>{
        return signOut(auth)
    }

    const updateInfo = (name, url) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        })
    }

    const emailVerification = () =>{
        return sendEmailVerification(auth.currentUser);
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            return unsubscribe;
        }

    }, []);


    const authInfo = {
        user,
        createUser,
        emailVerification,
        emailLogin,
        updateInfo,
        userLogout,
        googleLogin,
        githubLogin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;