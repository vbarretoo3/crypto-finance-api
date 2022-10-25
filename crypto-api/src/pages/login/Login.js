import React, { useRef, useState } from 'react';
import { Form , Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { logIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await logIn(emailRef.current.value, passwordRef.current.value)
            history("/")
        }   catch {
            setError('Failed to Sign In') 
        }
        setLoading(false)
    }

    return (
        <>
            <div className="user-container">
            <h2 className='user-title'>Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <form className='form-components' onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <label className='form-label'>Email</label>
                    <br/>
                    <input className='form-input' type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id='password'>
                    <label className='form-label'>Password</label>
                    <br/>
                    <input className='form-input' type='password' ref={passwordRef} required />
                </Form.Group>
                <br/>
                <div className='form-bottom'>
                    <button disable={loading} className='button-form' type='submit'>Log In</button>
                    <br/>
                    <Link className='link' to='/forgot-password'>Forgot Password?</Link>
                    <p>
                        Dont have an account? 
                        <Link className='link' to='/signup'> Sign Up Now!</Link>
                    </p>
                </div>
            </form>
            </div>
        </>
    )
}
