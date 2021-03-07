import React, { useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import { motion } from "framer-motion"
import "../styles/login/login.css"
import {LOGIN_USER} from "../utils/queries"
import {fadeInUpMin, stagger, fadeIn} from "../utils/animations"

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
      console.log(err)
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
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} className="login">
            <div className="access__header">
            <img src="./bp-logo.svg" alt="app logo"/>
            <h1>Clash Generator</h1>
            </div>
            <motion.form variants={stagger}>
                <motion.h2 variants={fadeInUpMin}>Sign In</motion.h2>
                <motion.p variants={fadeInUpMin}>Continue with your username and password</motion.p>
                <motion.div variants={fadeInUpMin} className="login__input">
                    <input
                    placeholder="  Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </motion.div>
                <motion.div variants={fadeInUpMin} className="login__input">
                    <input 
                    placeholder="  Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </motion.div>
                <motion.button whileTap={{ scale: 0.95 }} variants={fadeInUpMin} onClick={onSubmit}>Sign In</motion.button>
            </motion.form>
            <motion.div variants={fadeIn} className="toggle__access">
            <p>New to clash generator?</p>
            <Link to="/register">Create an account</Link>
            </motion.div>
            <div className="access__footer">
              <p>Privacy & Terms</p>
              <p>Created by Benjamin Taylor</p>
            </div>
            <img src="./main-char.svg" alt="char logo"/>
        </motion.div>
    )
}

export default Login
