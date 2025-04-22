import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (!userId) {
        setLoading(false);
        alert("You must be logged in to view your cart.");
        return;
      }

      try {
        console.log("Fetching cart for user:", userId); 
        const res = await axios.get(`https://food-delivery-gj0r.onrender.com/api/cart/${userId}`);
        console.log("Cart API response:", res.data);
        setCartItems(res.data?.items || []); // ✅ set only items
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId?.costForTwo || 0) * item.quantity,
    0
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.wrapper}>
  <div style={styles.container}>
    <h2 style={styles.heading}>Your Cart</h2>
    <ul style={styles.itemList}>
      {cartItems.map((item) => {
        const productId = item.productId?._id || item._id; // Use item._id as fallback key
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
    <Link to="/checkout" style={{ textDecoration: "none" }}>
      <button style={styles.button}>Proceed to Checkout</button>
    </Link>
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

export default Cart;
