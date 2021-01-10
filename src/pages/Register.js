import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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


    return (
        <div>
            <h1>Register</h1>
            <form>
                <div className="register__input">
                    <label>Username</label>
                    <input
                    placeholder="Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </div>
                <div className="register__input">
                    <label>Email</label>
                    <input 
                    placeholder="Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange} 
                    type="email"/>
                </div>
                <div className="register__input">
                    <label>Password</label>
                    <input 
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <div className="register__input">
                    <label>Confirm Password</label>
                    <input 
                    placeholder="Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <button onClick={onSubmit}>Create Account</button>
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
