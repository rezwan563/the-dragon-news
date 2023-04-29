import { createContext, useEffect, useState } from "react";
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const emailLogin = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider);
    }

    const userLogout = () =>{
        setLoading(true)
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
            setLoading(false);
        });

        return () => {
            return unsubscribe;
        }

    }, []);


    const authInfo = {
        user,
        loading,
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