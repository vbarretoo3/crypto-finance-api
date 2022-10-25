import React, { useRef, useState} from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        }   catch {
            setError('Failed to reset password') 
        }
        setLoading(false)
    }

    return (
        <>
            <div className='user-container'>
                <h2 className='form-title'>Password Reset</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <form className='form-components' onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <label className='form-label' >Email</label>
                        <input className='form-input' type='email' ref={emailRef} required />
                    </Form.Group>
                    <div className='form-bottom'>
                        <button disable={loading} className='button-form' type='submit'>Reset Password</button>
                        <p>Already have an account? <Link to='/login'>Log In</Link></p>
                        <p>Need an account? <Link to='/signup'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </>
  )
}
