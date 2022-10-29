import React, {useRef, useState} from 'react';
import {db} from '../../Firebase';
import { addDoc, collection} from 'firebase/firestore';

function Contact() {
  const [info, setInfo] = useState('')
  const nameRef = useRef()
  const emailRef = useRef()
  const messageRef = useRef()

  async function formSubmit(e) {
    e.preventDefault()
    var name = nameRef.current.value
    var email = emailRef.current.value
    var message = messageRef.current.value
    try {
      await addDoc(collection(db, 'contact'), {
        name: {name},
        email: {email},
        message: {message}
      })
      setInfo('Form submitted with succes')
    } catch (err) {
      console.log(err)
      setInfo('Something went wrong')
    }
  }

  return (
    <div className='contact-container'>
      <div className='form-container'>
        <h2 className='contact-title'>
          Contact Me
        </h2>
        <div className='divider'></div>
        <form onSubmit={formSubmit} className='contact-form'>
          {info && <h3>{info}</h3>}
          <label className='form-label'>Name:</label>
          <input ref={nameRef} type='text' className='contact-input name' placeholder='Name' required />
          <label className='form-label'>E-mail:</label>
          <input ref={emailRef} type='text' className='contact-input name' placeholder='E-mail' required />
          <label className='form-label'>Message:</label>
          <input ref={messageRef} type='text' className='contact-input message' placeholder='Message' required />
          <button type='submit' className='form-btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Contact