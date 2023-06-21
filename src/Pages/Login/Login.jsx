import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {

    const [disabled, setDisabled] = useState(true)
    const { signIn } = useContext(AuthContext)
    // const navigate = useNavigate()
    // const location = useLocation()

    // const from = location.state?.pathname || "/"


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
    }


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login successfull',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true })
            })
    }
    return (
        <div>
            <form onClick={handleLogin} className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                    </div>
                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-primary' type="submit" value="Login" />
                                <p><small>New Here ? <Link to="/signup">Create an new account</Link></small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Login;