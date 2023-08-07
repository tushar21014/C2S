import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import "../Css/Login.css"
import 'aos/dist/aos.css'; // You can also use <link> for styles
// import { auth, provider } from './Config_Firebase'
// import { signInWithPopup } from 'firebase/auth';
// import a from '../Context/Create';



function Login() {
    const [value, setValue] = useState('')
    // const context = useContext(a);
    // const { alert, showAlert } = context;

    // const handleClickk = async (e) => {
    //     try {
    //         const data = await signInWithPopup(auth, provider);
    //         console.log(data);
    //         setValue(data.user.email);
    //         localStorage.setItem("email", data.user.email);

    //         const response = await fetch('http://localhost:5000/api/auth/google_signup', {
    //             method: "POST",
    //             headers: {
    //                 "Content-type": 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: data.user.email,
    //                 name: data.user.displayName,
    //                 phone: data.user.phoneNumber,
    //                 id: data.user.uid
    //             })
    //         });

    //         const json = await response.json();
    //         localStorage.setItem('auth-Token', json.authToken)
    //         // window.location.reload(false);
    //         console.log(json);
    //         if (!json.success) {
    //             // showAlert('Danger', 'Invalid Credentials')
    //             // alert('Invalid Credentials');
    //         }

    //         else {
    //             // showAlert('success', 'Logged in Successfully');
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    useEffect(() => {
        setValue(localStorage.getItem('email'))

    }, [])


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", pass: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5004/api/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: credentials.username, pass: credentials.pass })
            });

            const json = await response.json();
            console.log(json);
            if (!json.success) {
                // alert('Invaid Credentials')
            }

            if (json.success) {
                localStorage.setItem('auth-Token', json.authToken)
                localStorage.setItem('username', credentials.username);
                if(json.adminId){
                    localStorage.setItem('admin',json.adminId);
                }
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }

    }

    const showPass = () => {
        const cont = document.getElementById('exampleCheck1');
        const passCont = document.getElementById('pass');
        if (cont.checked)
            passCont.type = 'text';
        else
            passCont.type = 'password'
    }

    useEffect(() => {
        AOS.init({ duration: 1000, });
    }, [])
    return (
        <>
            {alert && <div style={{ display: 'none' }}>{alert.msg}</div>}
            <div className='login-grandfather-cont'>
                <div className='login-container' data-aos='fade-right'>
                    <div className='container my-3 inner-login-container' >
                        <h2 className='my-4'>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" name='username' value={credentials.username} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="pass" value={credentials.pass} name='pass' onChange={onChange} placeholder="Password" />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input forgot" onClick={showPass} id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                                <Link to='/Forgotpassword' className='forgotpass'>Forgot Password?</Link>
                            </div>

                            <center>
                                <button type="submit" className="btn btn-primary mt-2">Log In</button>
                            </center>
                        </form>
                        <hr />
                        <div>

                            {/* {value ? navigate('/') : */}
                                {/* // <button onClick={handleClick}>Continue With Google</button> */}
                                {/* <div className='google-cont'> */}

                                    {/* <div className="google-btn" onClick={handleClickk}> */}
                                    {/* <div className="google-btn">
                                        <div className="google-icon-wrapper">
                                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='google-icon' />
                                        </div>
                                        <p className="btn-text text-right"><b>Sign in with google</b></p>
                                    </div> */}

                                {/* </div> */}
                            {/* } */}
                        </div>
                        <center>

                            <div className='form-caption my-4'>
                                <p style={{ marginTop: '0px' }}><b> Don't Have An Account?<Link to="/Signup" style={{ color: 'black' }}> Signup</Link></b></p>
                            </div>
                        </center>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Login