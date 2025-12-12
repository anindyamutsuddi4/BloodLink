import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase.init';
const Authprovider = ({ children }) => {
    const [user, setuser] = useState(undefined)
    const [loading, setloading] = useState(true)
    const signupuser = (email, password) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setloading(false))
    }
    const signinuser = (email, password) => {
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setloading(false))
    }
    const updateuser = (object) => {
        setloading(true);
        return updateProfile(auth.currentUser, object)
            .finally(() => setloading(false))
    }
    // const resetpass = (email) => {
    //     return sendPasswordResetEmail(auth, email)
    // }
    const logout = () => {
        setloading(true);
        return signOut(auth)
            .finally(() => setloading(false))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setuser(currentuser)
            setloading(false)
        })
        return () => unsubscribe()
    }, [])
    const Authinfo = {
        user,
        setuser,
        signupuser,
        signinuser,
        logout,
        loading,
        updateuser,
        setloading
    }
    return (
        <AuthContext value={Authinfo}>
            {children}
        </AuthContext>
    );
};

export default Authprovider;