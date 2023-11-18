import React from 'react';
import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'


const loginFormFields = {
    loginEmail:     '',
    loginPassword:  '',
}

const registerFormFields = {
    registerName:       '',
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
}

export const LoginPage = () => {

    const { startLogin , startRegister ,  errorMessage} = useAuthStore()

    const {
        loginEmail,
        loginPassword,
        formState: loginFormState,
        onInputChange : onLoginInputChange,
        onResetForm: onLoginResetForm,
        isFormValid : isLoginFormValid
    } = useForm(loginFormFields)
    
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        startLogin({email: loginEmail, password: loginPassword})
    }
    
    const {
        registerName,
        registerEmail,
        registerPassword,
        registerPassword2,
        formState: registerFormState,
        onInputChange : onRegisterInputChange,
        onResetForm: onRegisterResetForm,
        isFormValid : isregisterFormValid
    } = useForm(registerFormFields)
    
    const handleRegisterSubmit = (e) => {
        // TODO: Handle form validations
        e.preventDefault()

        if (registerPassword !== registerPassword2) return Swal.fire('Registration Error', 'Passwords not match', 'error')

        startRegister({name: registerName, email: registerEmail, password: registerPassword})
    }

    useEffect(() => {
        if (errorMessage !== undefined ) Swal.fire('Authentication Error', errorMessage, 'error')
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Log In</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                value={loginEmail}
                                className="form-control"
                                placeholder="Email"
                                onChange={onLoginInputChange}
                                name="loginEmail"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                value={loginPassword}
                                className="form-control"
                                placeholder="Password"
                                onChange={onLoginInputChange}
                                name="loginPassword"
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                
            </div>
        </div>
    )
}