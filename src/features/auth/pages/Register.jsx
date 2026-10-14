import React from 'react'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/login")
    }

    if (loading) {
        return (<main className="loading-screen">
            <div className="loading-content">
                <LoaderCircle className="loading-spinner" size={42} />
                <h2>Creating Account...</h2>
                <p>Please wait while creating your account.</p>
            </div>
        </main>)
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type='text' id='username' name='username' placeholder='Enter username' />
                    </div>

                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type='email' id='email' name='email' placeholder='Enter email Address' />
                    </div>

                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>

                        <div className='password-wrapper'>
                            <input onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                id='password' name='password'
                                placeholder='Enter password' />
                            <span className='password-toggle'
                                onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                    </div>

                    <button className='button primary-button'>Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register
