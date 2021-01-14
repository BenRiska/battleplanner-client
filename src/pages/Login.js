import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Link} from "react-router-dom"
import "../styles/login/login.css"

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function Login(props) {

    const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
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
      setErrors(err);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  console.log(errors, loading)

    return (
        <div className="login">
            <h1>Organise Your Gaming Events With Ease</h1>
            <img src="./shapes.png" alt="hero icons"/>
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login
