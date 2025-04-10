import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/payment");
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
            style={styles.input}
          />

          <label style={styles.label}>Address:</label>
          <textarea
            placeholder="123, Food Street"
            required
            style={styles.textarea}
          ></textarea>

          <label style={styles.label}>Phone:</label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            required
            style={styles.input}
          />

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
};

export default Checkout;
