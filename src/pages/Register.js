import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import "../styles/register/register.css"
import {Link} from "react-router-dom"

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function Register(props) {

    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(
          _,
          {
            data: { register: userData }
          }
        ) {
          context.login(userData);
          props.history.push('/');
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
      });

    function registerUser() {
        addUser();
      }

      console.log(errors, loading)

    return (
        <div className="register">
            <h1>Organise Your Gaming Events With Ease</h1>
            <img src="./shapes.png" alt="hero icons"/>
            <form>
                <h2>Register</h2>
                <div className="register__input">
                    <input
                    placeholder="Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </div>
                <div className="register__input">
                    
                    <input 
                    placeholder="Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange} 
                    type="email"/>
                </div>
                <div className="register__input">
                    
                    <input 
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <div className="register__input">
                    
                    <input 
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <button onClick={onSubmit}>Create Account</button>
                <p>Got an account already? <Link to="/login">Sign In</Link></p>
            </form>
        </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register
