import React, { useContext} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { motion } from "framer-motion"
import "../styles/register/register.css"
import {Link} from "react-router-dom"
import {REGISTER_USER} from "../utils/queries"
import {fadeInUpMin, stagger, fadeIn} from "../utils/animations"

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
        <motion.div  initial="initial" animate="animate" exit={{ opacity: 0 }} className="register">
            <div className="access__header">
              <img src="./bp-logo.svg" alt="app logo"/>
              <h1>Clash Generator</h1>
            </div>
            <motion.form variants={stagger}>
                <motion.h2 variants={fadeInUpMin}>Create an account</motion.h2>
                <motion.div variants={fadeInUpMin} className="register__input">
                    <input
                    placeholder="  Username.."
                    name="username"
                    value={values.username}
                    onChange={onChange} 
                    type="text"/>
                </motion.div>
                <motion.div variants={fadeInUpMin} className="register__input">
                    
                    <input 
                    placeholder="  Email.."
                    name="email"
                    value={values.email}
                    onChange={onChange} 
                    type="email"/>
                </motion.div>
                <motion.div variants={fadeInUpMin} className="register__input">
                    
                    <input 
                    placeholder="  Password.."
                    name="password"
                    value={values.password}
                    onChange={onChange} 
                    type="password"/>
                </motion.div>
                <motion.div variants={fadeInUpMin} className="register__input">
                    
                    <input 
                    placeholder="  Confirm Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange} 
                    type="password"/>
                </motion.div>
                <motion.button whileTap={{ scale: 0.95 }} variants={fadeInUpMin} onClick={onSubmit}>Register</motion.button>
            </motion.form>
            <motion.div variants={fadeIn} className="toggle__access">
            <p>Already have an account?</p>
            <Link  to="/login">Sign In</Link>
            </motion.div>
            <div className="access__footer">
              <p>Privacy & Terms</p>
              <p>Created by Benjamin Taylor</p>
            </div>
            <img src="./main-char.svg" alt="char logo"/>
        </motion.div>
    )
}


export default Register
