import React, {useRef, useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { Alert } from 'react-bootstrap'

export default function Profile() {
    const user = useAuth()
    const emailRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
    const { changeEmail, updateName, updatePhone } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            setError('')
            setLoading(false)
            if (nameRef.current.value !== user.currentUser.displayName) {
                await updateName(nameRef.current.value)
            }
            if (phoneRef.current.value !== user.currentUser.phoneNumber) {
                await updatePhone(phoneRef.current.value)
            }
            if (emailRef.current.value !== user.currentUser.email) {
                await changeEmail(emailRef.current.value)
            }
        } catch {
            setError('Failed to update account')
        }
        setLoading(false)
    }

    return (
    <>
        <form className='edit-profile-form' onSubmit={handleSubmit}>
            <h2>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className='profile-row'>
                <p className='profile-label'>Name: </p>
                <input ref={nameRef} type='text' className='profile-input' defaultValue={user.currentUser.displayName}/>
            </div>
            <div className='profile-row'>
                <p className='profile-label'>Email: </p>
                <input ref={emailRef} type='email' className='profile-input' defaultValue={user.currentUser.email}/>
            </div>
            <div className='profile-row'>
                <p className='profile-label'>Phone Number: </p>
                <input ref={phoneRef} type='text' className='profile-input' defaultValue={user.currentUser.phoneNumber}/>
            </div>
            <button disable={loading} className='profile-button' type='submit'>Edit Profile</button>
            <a href='/' className='profile-link'>Cancel</a>
        </form>
    </>
  )
}
