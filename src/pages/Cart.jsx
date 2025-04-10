import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const dummyCartItems = [
    {
      id: 1,
      name: "Pizza",
      price: 200,
      qty: 2,
      image:
        "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=",
    },
    {
      id: 2,
      name: "Burger",
      price: 100,
      qty: 1,
      image:
        "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=",
    },
  ];

  const total = dummyCartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Cart</h2>
        <ul style={styles.itemList}>
          {dummyCartItems.map((item) => (
            <li key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.details}>
                <span style={styles.itemName}>{item.name}</span>
                <div style={styles.qtyAndPrice}>
                  <span style={styles.itemQty}>× {item.qty}</span>
                  <span style={styles.itemPrice}>₹{item.qty * item.price}</span>
                </div>
              </div>
            </li>
          ))}
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
