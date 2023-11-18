import React from 'react';
import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const loginFormFields = {
  loginEmail: '',
};

export const LoginPage = () => {
  const { login, user } = useAuthStore();

  const {
    loginEmail,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const handleLoginSubmit = (e) => {
    e.preventDefault();


    login({ email: loginEmail });

    if (user) {
      window.location.href = '/calendar';
    }
  };

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
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
