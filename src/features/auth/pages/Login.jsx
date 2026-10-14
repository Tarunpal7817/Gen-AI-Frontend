import React from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from "react"
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")

    }

    if (loading) {
        return (<main className="loading-screen">
            <div className="loading-content">
                <LoaderCircle className="loading-spinner" size={42} />
                <h2>Signing you in...</h2>
                <p>Please wait while we verify your account.</p>
            </div>
        </main>)
    }


    return (
        <main>
            <div className='form-container'>
                <div>
                    <h1>Welcome Back !</h1>
                    <p>Sign in to continue your AI interview journey.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type='email' id='email' name='email' placeholder='Enter email Address' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <div className='password-wrapper'>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? 'text' : 'password'}
                                id='password' name='password' placeholder='Enter password' />
                            <span className='password-toggle'
                                onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                    </div>

                    <button className='button primary-button'>Login</button>
                </form>

                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>

            </div>
        </main>
    )
}

export default Login

