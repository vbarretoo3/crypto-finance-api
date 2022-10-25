import React, { useRef, useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { consoleSandbox } from '@sentry/utils';

export default function AddUser() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, createWatchlist } = useAuth()
    const user = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value).then(
                history('/'))
        }   catch {
            setError('Failed to create an account') 
        }
        setLoading(false)
    }

    return (
      <>
        <div className="user-container">
            <h2>Create User</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <form className='form-components' onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <label className='form-label'>Email</label>
                    <input className='form-input' type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id='password'>
                    <label className='form-label'>Password</label>
                    <input className='form-input' type='password' ref={passwordRef} required />
                </Form.Group>
                <Form.Group id='passwordConfirm'>
                    <label className='form-label'>Password Confirmation</label>
                    <input className='form-input' type='password' ref={passwordConfirmRef} required />
                </Form.Group>
                <br/>
                <div className='form-bottom'>
                    <button disable={loading} className='button-form' type='submit'>Sign Up</button>
                    <br/>
                    <p>
                        Already have an account? 
                        <Link className='link' to='/login'> Log In Here!</Link>
                    </p>
                </div>
            </form>
        </div>
      </>
  )
}
