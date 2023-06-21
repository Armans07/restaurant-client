import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../../Pages/Shared/SocialLogin/SocialLogin';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('User Profile info update');
                        reset()
                        const savedUser = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire(
                                        {
                                            position: "top",
                                            icon: 'Success',
                                            title: 'Sign Up Done',
                                            showConfirmButton: false,
                                            timer: 1500
                                        }
                                    )
                                    navigate('/')
                                }
                            })

                    })
                    .catch(error => { console.log(error); })
            })

    };


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Here!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Your name" className="input input-bordered" {...register("name", { required: true })} />
                                {errors.name && <span className='text-red-600'>Name must required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="photoURL" className="input input-bordered" {...register("photoURL", { required: true })} />
                                {errors.photoURL && <span className='text-red-600'>Name must required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                                {errors.email && <span className='text-red-600'>Email must required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" {...register("password", { required: true, minLength: 6, maxLength: 20 }, { pattern: /^[A-Za-z]+$/i })} />
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password must less then 20 characters</span>}
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <div className="form-control mt-6">
                                <input className='btn btn-primary' type="submit" value="Sign Up" />
                                <p><small>Have an account ? <Link to="/login">Pleaser login</Link></small></p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;