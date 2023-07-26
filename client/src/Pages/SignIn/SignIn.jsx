import React from 'react'
import { Link } from 'react-router-dom'
import './SignIn.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/apicall';

const SignIn = () => {
  const user = useSelector((state) => state.user.user?.status);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
  });
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ resolver: yupResolver(loginSchema) });
  const onSubmit = (data) => {
    loginUser(dispatch, data);
    reset();
    if (user == 'success') {
      navigate('/')
    } else {
      navigate('/login')
    }
  }
  return (
    <div className='signin'>
      <div className='details'>
        <div className='banner'>
          <h1 className='title'>Let's talk</h1>
          <p className='content'>Best social media application,enjoy real time messaging with friends and
            group chats also not forgetting video calls
          </p>
          <span>Not having an account?</span>
          <button>
            <Link to='/register'>
              Register
            </Link>
          </button>
        </div>
        <div className='maincontent'>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='username' required name='username' {...register("username")} />
            <p style={{ color: "red" }}>{errors.username?.message}</p>
            <input type="password" placeholder='password' required name='password' {...register("password")} />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <button type='submit'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn