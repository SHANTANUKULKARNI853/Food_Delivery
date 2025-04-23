import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // at the top
import { Link } from "react-router-dom";



function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '', phone: '', profilePic: '' });
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); // inside your component


  const userInfo = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
  const email = userInfo ? userInfo.email : ''; // Assuming email is stored in localStorage

  useEffect(() => {
    if (email) {
      axios.get(`https://food-delivery-gj0r.onrender.com/api/users/${email}`)
        .then(res => setUser(res.data))
        .catch(console.error);
    }
  }, [email]);

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    axios.put('https://food-delivery-gj0r.onrender.com/api/users', user)
      .then(res => {
        setUser(res.data);
        setEditing(false);
      })
      .catch(console.error);
  };

  const handlePictureChange = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('profilePic', image);

    axios.post('https://food-delivery-gj0r.onrender.com/api/users/upload', formData)
      .then(res => {
        setUser(res.data);
        setPreview(null);
        setImage(null);
      })
      .catch(console.error);
  };

  const fetchOrders = () => {
    axios.get(`https://food-delivery-gj0r.onrender.com/api/orders/${email}`)
      .then(res => setOrders(res.data))
      .catch(console.error);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user'); // Remove user info from localStorage
    localStorage.removeItem('token'); // Remove auth token if stored
    // window.location.reload(); // Optional: Force a full page reload to reset app state
    navigate('/'); // Redirect to the home page or login page
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
        <img
  src={
    preview
      ? preview
      : user.profilePic
      ? `https://food-delivery-gj0r.onrender.com${user.profilePic}`
      : 'https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
  }
  alt="Profile"
  style={styles.image}
/>

          <h4 style={styles.userName}>{user.name || 'Your Name'}</h4>
          <div style={styles.imageUpload}>
            <input
              type="file"
              accept="image/*"
              style={styles.fileInput}
              onChange={handleImageChange}
            />
            <button
              onClick={handlePictureChange}
              disabled={!image}
              style={styles.uploadButton}
            >
              {image ? 'Upload Picture' : 'Choose Picture'}
            </button>
          </div>
        </div>

        <div style={styles.details}>
          <div style={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              value={user.name || ''}
              disabled={!editing}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              style={styles.inputField}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={user.email || ''}
              disabled={!editing}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={styles.inputField}
            />
          </div>

          {/* <div style={styles.inputGroup}>
            <label>Phone</label>
            <input
              type="text"
              value={user.phone || ''}
              disabled={!editing}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              style={styles.inputField}
            />
          </div> */}

          <div style={styles.buttonGroup}>
            {!editing ? (
              <button
                onClick={handleEdit}
                style={styles.editButton}
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                style={styles.saveButton}
              >
                Save
              </button>
            )}

<Link to="/cart">
  <button style={styles.ordersButton}>
    See Orders
  </button>
</Link>

            <button
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>

        {orders.length > 0 && (
          <div style={styles.ordersSection}>
            <h5>Past Orders</h5>
            <ul style={styles.orderList}>
              {orders.map((order, i) => (
                <li key={i} style={styles.orderItem}>
                  <strong>{order.items.join(', ')}</strong> – {new Date(order.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f4f7fc',
    padding: '20px',
    },
  
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    padding: '30px',
    transition: 'all 0.3s ease-in-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  image: {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    border: '3px solid #6f42c1',
    marginBottom: '15px',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
    marginBottom: '15px',
  },
  imageUpload: {
    marginTop: '10px',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    backgroundColor: '#6f42c1',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  details: {
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    color: '#333',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
  },
  saveButton: {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  ordersButton: {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#17a2b8',
    color: 'white',
  },
  logoutButton: {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#dc3545',
    color: 'white',
  },
  ordersSection: {
    marginTop: '20px',
  },
  orderList: {
    listStyle: 'none',
    padding: '0',
  },
  orderItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    color: '#555',
  },
};

export default UserProfile;
