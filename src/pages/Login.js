import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

    return (
        <div>
            <h1>Login</h1>
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
                    <label>Password</label>
                    <input 
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </div>
                <button onClick={onSubmit}>Login</button>
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
