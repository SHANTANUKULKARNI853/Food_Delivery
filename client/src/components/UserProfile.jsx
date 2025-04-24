import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // at the top

function UserProfile() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        profilePicture: '',
    });

    const navigate = useNavigate(); // initialize useNavigate

    useEffect(() => {
        // Fetch user data from localStorage or backend API on component mount
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserInfo({
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture || 'https://via.placeholder.com/150',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        // Simulate backend update here
        toast.success('Profile updated successfully');
    };

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('user'); // Remove user info from localStorage
        localStorage.removeItem('token'); // Remove auth token if stored
        // window.location.reload(); // Optional: Force a full page reload to reset app state
        navigate('/'); // Redirect to the home page or login page
    };

    // CSS-in-JS styles
    const styles = {
        profilePage: {
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f0edee, #75b0f5)',
        },
        profileContainer: {
            display: 'flex',
            width: '80%',
            height: '80vh',
            background: 'white',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid #ddd',
            justifyContent: 'center',
        },
        profileLeft: {
            width: '35%',
            background: 'linear-gradient(135deg, #1ABC9C, #FF6347)',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px',
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
        },
        profileRight: {
            width: '65%',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        profileImage: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '20px',
        },
        input: {
            padding: '12px',
            margin: '10px 0',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1rem',
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
            transition: '0.3s ease-in-out',
        },
        buttonDisabled: {
            background: '#ddd',
            cursor: 'not-allowed',
        },
        link: {
            marginTop: '15px',
            fontSize: '0.9rem',
            color: '#6200ea',
            cursor: 'pointer',
            textAlign: 'center',
        },
        cardTitle: {
            fontSize: '1.5rem',
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        profileDetails: {
            fontSize: '1rem',
            color: '#333',
            marginBottom: '10px',
        },
        logoutButton: {
            backgroundColor: '#ff4d4d',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s ease-in-out',
            marginTop: '20px',
        }
    };

    return (
        <div style={styles.profilePage}>
            <div style={styles.profileContainer}>
                <div style={styles.profileLeft}>
                <h2>Welcome Back, Hungry Explorer!</h2>
<p>Your taste adventure awaits!</p>

                </div>
                <div style={styles.profileRight}>
                    <h2 style={styles.cardTitle}>Edit Profile</h2>
                    <form onSubmit={handleUpdateProfile} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={styles.profileDetails}>
                            <label style={{ fontWeight: 'bold' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                placeholder="Update name"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.profileDetails}>
                            <label style={{ fontWeight: 'bold' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                placeholder="Update email"
                                style={styles.input}
                            />
                        </div>
                        <button
                            type="submit"
                            style={userInfo.name && userInfo.email ? styles.button : { ...styles.button, ...styles.buttonDisabled }}
                            disabled={!userInfo.name || !userInfo.email}
                        >
                            Update Profile
                        </button>
                    </form>
                    <p style={styles.link}>
                        <a href="/">Go to Dashboard</a>
                    </p>
                    
                    <button
                        onClick={handleLogout}
                        style={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserProfile;
