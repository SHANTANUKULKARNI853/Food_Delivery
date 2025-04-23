import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notifySuccess, notifyError } from '../utils/utils';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) return notifyError('All fields are required');

        try {
            const res = await fetch("https://food-delivery-gj0r.onrender.com/api/users/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });
            const result = await res.json();

            if (result.success) {
                notifySuccess('Signup successful. Redirecting to login page...');
                setTimeout(() => navigate('/login'), 2000); // 2 second delay
            }
             else {
                notifyError(result?.error?.details?.[0]?.message || result.message);
            }
        } catch (err) {
            notifyError('Something went wrong!');
        }
    };

    return (

        <div className='container'>
                    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px' }}>

        <h2 style={{ textAlign: 'center' }}>signup</h2>
        <form onSubmit={handleSignup}>
                <div>
                    <label>Name</label>
                    <input type='text' name='name' placeholder='Enter your name' value={signupInfo.name} onChange={handleChange}
                                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                                            />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' name='email' placeholder='Enter your email' value={signupInfo.email} onChange={handleChange} 
                                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' placeholder='Enter your password' value={signupInfo.password} onChange={handleChange} 
                                            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
/>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'black', border: 'none' ,marginTop:'20px', fontSize:'20px'}}>SIGNUP</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
            <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
