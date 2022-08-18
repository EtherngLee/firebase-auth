import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, UpdateEmail, UpdatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError("Passwords do not match")
        }

        const promises = []
        setError("")
        setLoading(true)
        if(emailRef.current.value !== currentUser.email){
            promises.push(UpdateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(UpdatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate.push("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })

    }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} placeholder="Leave blank to keep the same"></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password-Confirmation</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} placeholder="Leave blank to keep the same"></Form.Control>
                </Form.Group>
                <br></br>
                <Button disabled={loading} className='w-100' type="Submit">Sign Up</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>Already have an account? <Link to="/">Cancel</Link></div>
    </>
  )
}
