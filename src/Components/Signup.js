import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import '../Css/Signup.css'
import { AiFillEye } from 'react-icons/ai'
// import a from '../Context/Create';
// import Alert from '../Screens/Alert';
// import emailjs from '@emailjs/browser';




function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useRef();
    // const context = useContext(a);
    // const { alert, showAlert, setAlert } = context;
    const [credentials, setCredentials] = useState({ salutation: "", first_name: "", middle_name: "", last_name: "", designation: "", department: "", email: "", pass: "", phone: "", org_name: "", address1: "", address2: "", city: "", zipCode: "", state: "", username: "" });
    let navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5004/api/auth/createuser", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ salutation: credentials.salutation, first_name: credentials.first_name, middle_name: credentials.middle_name, last_name: credentials.last_name, designation: credentials.designation, department: credentials.department, org_name: credentials.org_name, address1: credentials.address1, address2: credentials.address2, city: credentials.city, zipCode: credentials.zipCode, state: credentials.state, username: credentials.username, email: credentials.email, phone: credentials.phone, pass: credentials.pass })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                // alert('Enter Valid Credentials')
                // setAlert(true)
                // showAlert('danger', 'Enter Valid Credentials')
            }

            else {
                // setAlert(true)
                // showAlert('success', 'Account Created Successfully')
                navigate('/Login')

                // const sendEmail = (e) => {
                //     // e.preventDefault();
                //     emailjs.sendForm('service_4pet9at', 'template_t907vp4', form.current, 'p0WJz9TGSvB22SYaG')
                //       .then((result) => {
                //           console.log(result.text);
                //       }, (error) => {
                //           console.log(error.text);
                //       });
                //     }
                // sendEmail();
                // alert('Account Created Successfull')
            }


        } catch (error) {
            console.log(error);
        }
    }




    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        AOS.init({ duration: 1000, });
    }, [])
    return (
        <div>

        <h2 className='text-center' data-aos='slide-down' data-aos-duration="1500" style={{marginTop:'20px'}}>Sign Up</h2>
            <div className='grandfather' style={{backgroundColor:"beige"}}>
                <div className='form-container' data-aos="slide-down">
                    <div className='container inner-cont'>
                        <form method="post" ref={form} onSubmit={handleSubmit}>
                            <div className='container fields' style={{width:'65vw'}}>
                                <div className="form-group name-group">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="Salutation">Salutation</label>
                                            <select className="form-control" id="Salutation" aria-describedby="Salutation" name="salutation" onChange={handleChange} value={credentials.salutation} placeholder="Select Salutation">
                                                <option value="">Select Salutation</option>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Mrs.">Mrs.</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Prof.">Prof.</option>
                                                <option value="Dr.">Dr.</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" className="form-control" id="first_name" aria-describedby="first_name" name="first_name" onChange={handleChange} value={credentials.first_name} placeholder="Enter Name"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="middle_name">Middle Name</label>
                                            <input type="text" className="form-control" id="middle_name" aria-describedby="middle_name" name="middle_name" onChange={handleChange} value={credentials.middle_name} placeholder="Optional"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" className="form-control" id="last_name" aria-describedby="last_name" name="last_name" onChange={handleChange} value={credentials.last_name} placeholder="Optional" />
                                        </div>
                                    </div>
                                </div>
                                <div className='designation-group form-group'>
                                    <div className="row">

                                        <div className="col">
                                            <label htmlFor="Designation">Designation</label>
                                            <input type="text" className="form-control" id="designation" aria-describedby="Designation" required name='designation' onChange={handleChange} value={credentials.designation} placeholder="Enter Designation" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="Department">Department</label>
                                            <input type="text" className="form-control" id="department" aria-describedby="Department" required name='department' onChange={handleChange} value={credentials.department} placeholder="Enter Department" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group email-group">
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required name='email' onChange={handleChange} value={credentials.email} placeholder="Enter email" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="exampleInputPassword1">Phone</label>
                                            <input type="number" className="form-control" id="phone" name='phone' placeholder="Mobile Number" onChange={handleChange} value={credentials.phone} required maxLength={10} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="org_name">Organisation Name</label>
                                            <input type="text" className="form-control" id="org_name" name='org_name' placeholder="Organisation Name" onChange={handleChange} value={credentials.org_name} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="row">

                                        <div className="col">
                                            <label htmlFor="address1">Address 1</label>
                                            <input type="text" className="form-control" id="address1" name='address1' placeholder="Address" onChange={handleChange} value={credentials.address1} required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="address1">Address 2</label>
                                            <input type="text" className="form-control" id="address2" name='address2' placeholder="Optional" onChange={handleChange} value={credentials.address2} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className='row'>
                                        <div className='col'>
                                            <label htmlFor="city">City</label>
                                            <input type="text" className="form-control" id="city" name='city' placeholder="City" onChange={handleChange} value={credentials.city} required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="zipCode">Zip Code</label>
                                            <input type="text" className="form-control" id="zipCode" name='zipCode' placeholder="Zip Code || Postal Code" onChange={handleChange} value={credentials.zipCode} required />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="zipCode">State</label>
                                            <input type="text" className="form-control" id="state" name='state' placeholder="State" onChange={handleChange} value={credentials.state} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className='row'>
                                        <div className='col'>

                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username" name='username' placeholder="username" onChange={handleChange} value={credentials.username} required minLength={5} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <div className="input-icon">
                                                <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="pass" placeholder="Password" onChange={handleChange} value={credentials.pass} required minLength={5}
                                                />
                                                <AiFillEye
                                                    className="showPasswordIcon text-2xl"
                                                    onClick={togglePasswordVisibility}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <center><button type="submit" className="btn btn-primary signupbtn">Sign Up</button>
                                </center>
                            </div>
                            <center>

                                <div className='form-caption my-4'>
                                    <p style={{ marginTop: '0px' }}><b> Already Have An Account?<Link to="/Login" style={{ color: 'black' }}> Login</Link></b></p>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp