import React, { useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';
import "../styles/register/register.css"
import {Link} from "react-router-dom"
import {REGISTER_USER} from "../utils/queries"

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function Register(props) {

    const context = useContext(AuthContext);

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser] = useMutation(REGISTER_USER, {
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
          alert(
            err.graphQLErrors[0].extensions.exception.errors["username"],
            err.graphQLErrors[0].extensions.exception.errors["password"],
           );
        },
        variables: values
      });

    function registerUser() {
        addUser();
      }

    return (
        <div className="register">
            <div className="access__header">
              <img src="./bp-logo.svg" alt="app logo"/>
              <h1>Clash Generator</h1>
            </div>
            <form>
                <h2>Create an account</h2>
                <div className="register__input">
                    <input
                    placeholder="  Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </div>
                <div className="register__input">
                    
                    <input 
                    placeholder="  Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange} 
                    type="email"/>
                </div>
                <div className="register__input">
                    
                    <input 
                    placeholder="  Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <div className="register__input">
                    
                    <input 
                    placeholder="  Confirm Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <button onClick={onSubmit}>Register</button>
            </form>
            <div className="toggle__access">
            <p>Already have an account?</p>
            <Link to="/login">Sign In</Link>
            </div>
            <div className="access__footer">
              <p>Privacy & Terms</p>
              <p>Created by Benjamin Taylor</p>
            </div>
            <img src="./char1.png" alt="char logo"/>
        </div>
    )
}


export default Register
