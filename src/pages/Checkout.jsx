import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);  // Initialize cartItems state
  const [userInfo, setUserInfo] = useState({ name: "", address: "", phone: "" });
  
  // Retrieve JWT token from local storage
  const token = localStorage.getItem("token"); // Assuming JWT token is stored under the key "token"

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Send token in the Authorization header
        const response = await axios.get("https://food-delivery-gj0r.onrender.com/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token to authenticate the user
          },
        });
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    
    fetchCart();
  }, [token]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handleContinue = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        items: cartItems.map(item => ({
          foodItem: item.productId?.name,
          quantity: item.quantity,
          price: item.productId?.price
        })),
        totalAmount,
      };

      // Send the order data to the server
      await axios.post("https://food-delivery-gj0r.onrender.com/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token for authentication
        },
      });

      // Redirect to payment page after successful order placement
      navigate("/payment");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Checkout</h2>
        <form onSubmit={handleContinue} style={styles.form}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            style={styles.input}
          />

          <label style={styles.label}>Address:</label>
          <textarea
            placeholder="123, Food Street"
            required
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            style={styles.textarea}
          ></textarea>

          <label style={styles.label}>Phone:</label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            required
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            style={styles.input}
          />

          <h3 style={styles.total}>Total: ₹{totalAmount}</h3>

          <button type="submit" style={styles.button}>
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 70px)",
    paddingTop: "70px",            
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  container: {
    padding: "20px",
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "14px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    resize: "vertical",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "14px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    width: "100%",
  },
  total: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "18px",
    color: "#333",
  },
};

export default Checkout;
