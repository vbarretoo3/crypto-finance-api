import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { updatePhoneNumber, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider( {children } ) {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(res => createWatchlist(res.user.uid))
  }

  function createWatchlist(id) {
    setDoc(doc(db, 'users', id), {
      watchlist: []
    })
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(email)
  }

  function changeEmail(email) {
    return updateEmail(currentUser, email)
  }

  function changePassword(password) {
    return updatePassword(currentUser, password)
  }

  function updateName(name) {
    return updateProfile(auth.currentUser, {displayName: name})
  }

  function updatePhone(phone) {
    return updatePhoneNumber(currentUser, {phoneCredential: phone})
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(true)
    })

    return unsubscribe
  }, [])

  const value = {
    signup,
    logIn,
    logout,
    resetPassword,
    currentUser,
    changeEmail,
    changePassword,
    updateName,
    updatePhone,
    createWatchlist
  }

  return (
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  )
}
