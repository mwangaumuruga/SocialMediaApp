import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../redux/apicall';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const user = useSelector((state) => state?.user?.user?.status);
    console.log(user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //resolver
    //schema
    const registerSchema = yup.object().shape({
        fullnames: yup.string().min(3).required(),
        username: yup.string().min(3).max(10).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        passwordConfirm: yup.string().oneOf([yup.ref("password"), null]),
    });
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ resolver: yupResolver(registerSchema) });
    const onSubmit = (data) => {
        registerUser(dispatch, data)
        reset();
        if (user == 'success') {
            navigate('/login')
        } else {
            navigate('/register')
        }
        console.log(user);
    }
    return (
        <div className='register'>
            <div className='details'>
                <div className='right'>
                    <h1>Sign up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='credit'>
                            <input type="text" placeholder='username' required name='username' {...register("username")} />
                            <p style={{ color: "red" }}>{errors.username?.message}</p>
                            <input type="email" placeholder='email' required name='email' {...register("email")} />
                            <p style={{ color: "red" }}>{errors.email?.message}</p>
                        </div>
                        <div className='credit'>
                            <input type="password" placeholder='password' required name='password' {...register("password")} />
                            <p style={{ color: "red" }}>{errors.password?.message}</p>
                            <div className='passwordConfirm'>
                                <input type="password" placeholder='passwordConfirm' required name='passwordConfirm'  {...register("passwordConfirm")} />
                                <p style={{ color: "red" }}>{errors.passwordConfirm?.message}</p>
                            </div>
                        </div>
                        <div className='credit'>
                            <div className='fullnames'>
                                <input type="text" placeholder='fullnames' required name='fullnames' {...register("fullnames")} />
                                <p style={{ color: "red" }}>{errors.fullnames?.message}</p>
                            </div>
                            {/* <div className='city'>
                                <input type="text" placeholder='city' required />
                            </div> */}
                        </div>
                        {/* <div className='credit'>
                            <div className='coverpic'>
                                <label htmlFor="coverpic">Cover Pic</label>
                                <input type="file" placeholder='cover pic' required />
                            </div>
                            <div className='profilePic'>
                                <label htmlFor="profilepic">Profile Pic</label>
                                <input type="file" placeholder='profile Pic' required />
                            </div>
                        </div>
                        <div className="website">
                            <input type="text" placeholder='Your website url' />
                        </div> */}
                        <div className='policy'>
                            <input type="checkbox" />
                            <span>
                                Accept terms  and conditions for the policy
                            </span>
                        </div>
                        <div className='accountLogin'>
                            <h4>Already having an account?</h4>
                            <Link to='/login'>Login</Link>
                        </div>
                        <button type='submit'>Register</button>
                    </form>
                </div>
                <div className='left'>
                </div>
            </div>
        </div>
    )
}

export default Register
