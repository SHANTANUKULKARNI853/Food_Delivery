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
            if (result.message === 'Login successful') {
                toast.success('Login successful. Redirecting to homepage...');
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                setTimeout(() => navigate('/'), 2000);
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (err) {
            console.error('Server error:', err);
            toast.error('Server error');
        }
    };

    // CSS-in-JS styles
    const styles = {
        loginPage: {
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f0edee, #75b0f5)'
        },
        loginContainer: {
            display: 'flex',
            width: '60%',
            height: '70vh',
            background: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            overflow: 'hidden'
        },
        loginLeft: {
            width: '40%',
            background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px'
        },
        loginRight: {
            width: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '30px'
        },
        input: {
            padding: '12px',
            margin: '10px 0',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem'
        },
        button: {
            background: '#6200ea',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 'bold',
            padding: '12px',
            marginTop: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.3s ease-in-out'
        },
        link: {
            marginTop: '15px',
            fontSize: '0.9rem',
            color: '#6200ea',
            cursor: 'pointer',
            textAlign: 'center'
        }
    };

    return (
        <div style={styles.loginPage}>
            <div style={styles.loginContainer}>
                <div style={styles.loginLeft}>
                <h2>Welcome Back to Zomato!</h2>
<p>Your cravings called... let's satisfy them 🍕</p>

                </div>
                <div style={styles.loginRight}>
                    <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column' }}>
                        <input
                            type="email"
                            name="email"
                            value={loginInfo.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            value={loginInfo.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            style={styles.input}
                        />
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseOver={(e) => (e.target.style.background = '#3700b3')}
                            onMouseOut={(e) => (e.target.style.background = '#6200ea')}
                        >
                            Login
                        </button>
                        <p style={styles.link}>
                            Don't have an account? <Link to="/signup">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
