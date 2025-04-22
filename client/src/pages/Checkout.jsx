import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
      alert("You must be logged in to proceed to checkout.");
      navigate("/login");
      return;
    }

    setUser(user);
    const userId = user._id;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`https://food-delivery-gj0r.onrender.com/api/cart/${userId}`);
        setCartItems(res.data?.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        alert("Failed to load your cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId?.costForTwo || 0) * item.quantity,
    0
  );

  if (loading) return <p>Loading...</p>;

  const handlePlaceOrder = async () => {
    if (!user || !user._id) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!address || !phone) {
      alert("Please provide a valid address and phone number.");
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        userInfo: { name: user.name, address, phone },
        totalAmount: total,
      };

      const res = await axios.post("https://food-delivery-gj0r.onrender.com/api/orders/create", orderData);
      alert("Order placed successfully!");
      navigate("/payment");
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place the order. Please try again later.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Checkout</h2>

        <div style={styles.userInfo}>
          <h3>Delivery Information</h3>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
        </div>

        <ul style={styles.itemList}>
          {cartItems.map((item) => {
            const productId = item.productId?._id || item._id;
            return (
              <li key={productId} style={styles.item}>
                <img
                  src={item.productId?.imageUrl || "https://via.placeholder.com/80"}
                  alt={item.productId?.name}
                  style={styles.image}
                />
                <div style={styles.details}>
                  <span style={styles.itemName}>{item.productId?.name}</span>
                  <div style={styles.qtyAndPrice}>
                    <span style={styles.itemQty}>× {item.quantity}</span>
                    <span style={styles.itemPrice}>
                      ₹{item.quantity * (item.productId?.costForTwo || 0)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <h3 style={styles.total}>Total: ₹{total}</h3>

        <button style={styles.button} onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  userInfo: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  itemList: {
    listStyleType: "none",
    padding: 0,
    marginBottom: "20px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
    gap: "10px",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333",
  },
  qtyAndPrice: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "5px",
  },
  itemQty: {
    fontSize: "14px",
    color: "#555",
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
    textAlign: "right",
    paddingRight: "5px",
  },
  total: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "18px",
    color: "#333",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "16px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
};

export default Checkout;
