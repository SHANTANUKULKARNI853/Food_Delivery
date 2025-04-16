import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '', phone: '', profilePic: '' });
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const email = 'user@example.com'; // Replace with actual user's email

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${email}`)
      .then(res => setUser(res.data))
      .catch(console.error);
  }, []);

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    axios.put('http://localhost:5000/api/user', user)
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

    axios.post('http://localhost:5000/api/user/upload', formData)
      .then(res => {
        setUser(res.data);
        setPreview(null);
        setImage(null);
      })
      .catch(console.error);
  };

  const fetchOrders = () => {
    axios.get(`http://localhost:5000/api/orders/${email}`)
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
    alert('Logged out successfully!');
    // Add actual logout logic here
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
      <div className="text-center">
  <img
    src={
      preview
        ? preview
        : user.profilePic
        ? `http://localhost:5000${user.profilePic}`
        : 'https://via.placeholder.com/120?text=User'
    }
    alt="Profile"
    className="rounded-circle mb-2"
    width="120"
    height="120"
    style={{ objectFit: 'cover', border: '3px solid #6f42c1' }}
  />
  <h4 className="mb-3">{user.name || 'Your Name'}</h4>
  <div className="mb-2">
    <input
      type="file"
      accept="image/*"
      className="form-control"
      onChange={handleImageChange}
    />
    <button
      className="btn btn-link text-primary mt-2"
      onClick={handlePictureChange}
      disabled={!image}
    >
      {image ? 'Upload Picture' : 'Choose Picture'}
    </button>
  </div>
</div>


        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            disabled={!editing}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            disabled={!editing}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>


        <div className="mb-4">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={user.phone}
            disabled={!editing}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>

        <div className="d-flex justify-content-between">
          {!editing ? (
            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          ) : (
            <button className="btn btn-success" onClick={handleSave}>Save</button>
          )}

          <button className="btn btn-info text-white" onClick={fetchOrders}>See Orders</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>

        {orders.length > 0 && (
          <div className="mt-4">
            <h5>Past Orders</h5>
            <ul className="list-group">
              {orders.map((order, i) => (
                <li key={i} className="list-group-item">
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

export default UserProfile;
