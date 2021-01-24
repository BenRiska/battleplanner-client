import React, { useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import "../styles/login/login.css"
import {LOGIN_USER} from "../utils/queries"

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function Login(props) {

    const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      alert(
        err.graphQLErrors[0].extensions.exception.errors["general"],
        err.graphQLErrors[0].extensions.exception.errors["username"],
        err.graphQLErrors[0].extensions.exception.errors["password"],
       );
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

    return (
        <div className="login">
            <h1>Organise Your Gaming Events With Ease</h1>
            <img src="./shapes.svg" alt="hero icons"/>
            <form>
                <h2>Login</h2>
                <div className="login__input">
                    <input
                    placeholder="Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </div>
                <div className="login__input">
                    <input 
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <button onClick={onSubmit}>Login</button>
                <p>Haven't got an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login
