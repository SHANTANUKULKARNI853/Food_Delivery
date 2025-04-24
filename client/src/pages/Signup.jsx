import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return toast.error('All fields are required');
        }

        try {
            const url = "https://food-delivery-gj0r.onrender.com/api/users/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();

            if (response.ok && result.message === 'User registered successfully') {
                toast.success('Signup successful. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(result.message || 'Signup failed');
            }
        } catch (err) {
            console.error('Server error:', err);
            toast.error('Server error');
        }
    };

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
                <h2>First Time on Zomato?</h2>
<p>Join the foodies’ club — it’s tastier on the inside 🍜</p>

                </div>
                <div style={styles.loginRight}>
                    <form onSubmit={handleSignup} style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column' }}>
                        <input
                            type="text"
                            name="name"
                            value={signupInfo.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            style={styles.input}
                        />
                        <input
                            type="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            value={signupInfo.password}
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
                            Signup
                        </button>
                        <p style={styles.link}>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
