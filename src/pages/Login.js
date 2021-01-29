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
            <div className="access__header">
            <img src="./bp-logo.svg" alt="app logo"/>
            <h1>Clash Generator</h1>
            </div>
            <form>
                <h2>Sign In</h2>
                <p>Continue with your username and password</p>
                <div className="login__input">
                    <input
                    placeholder="  Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </div>
                <div className="login__input">
                    <input 
                    placeholder="  Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <button onClick={onSubmit}>Sign In</button>
            </form>
            <div className="toggle__access">
            <p>New to clash generator?</p>
            <Link to="/register">Create an account</Link>
            </div>
            <div className="access__footer">
              <p>Privacy & Terms</p>
              <p>Created by Benjamin Taylor</p>
            </div>
            <img src="./char1.png" alt="char logo"/>
        </div>
    )
}

export default Login
