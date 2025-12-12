import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, reload, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
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
    const updateuser = async (object) => {
        setloading(true);
        try {
            await updateProfile(auth.currentUser, object);
            await reload(auth.currentUser);
            setuser({ ...auth.currentUser });
        }
        finally { () => setloading(false) }
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