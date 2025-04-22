import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return toast.error('Email and password are required');
        }

        try {
            const url = "https://food-delivery-gj0r.onrender.com/api/users/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Login failed:', errorMessage);
                return toast.error('Login failed');
            }

            const result = await response.json();
            const { success, message, token } = result;

            console.log('Login result:', result);

            if (result.message === 'Login successful') {
                toast.success(result.message);
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                setTimeout(() => navigate('/'));
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (err) {
            console.error('Server error:', err);
            toast.error('Server error');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <button 
  type="submit" 
  style={{
    display: 'inline-block',
    padding: '12px 20px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease, transform 0.2s ease'
  }} 
  onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
  onClick={() => console.log('Login clicked')}
>
  Login
</button>
                <p style={{ marginTop: '10px', textAlign: 'center' }}>
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
