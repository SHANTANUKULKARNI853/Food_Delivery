import React, { useState } from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.successBox}>
          <h2 style={styles.successHeading}>Payment Successful!</h2>
          <p style={styles.successText}>Thank you for your order.</p>
          <Link to="/track-order" style={styles.trackLink}>
            Track Your Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Select Payment Method</h2>

        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Card
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="gpay"
              onChange={() => setPaymentMethod("gpay")}
            />
            Google Pay
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="phonepe"
              onChange={() => setPaymentMethod("phonepe")}
            />
            PhonePe
          </label>
        </div>

        <form onSubmit={handlePayment} style={styles.form}>
          {paymentMethod === "card" && (
            <>
              <label style={styles.label}>Card Number:</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                required
                style={styles.input}
              />

              <label style={styles.label}>Expiry Date:</label>
              <input
                type="text"
                placeholder="MM/YY"
                required
                style={styles.input}
              />

              <label style={styles.label}>CVV:</label>
              <input
                type="password"
                placeholder="123"
                required
                style={styles.input}
              />
            </>
          )}

          {paymentMethod === "gpay" && (
            <div style={styles.walletOption}>
              <img
                src="https://www.cdnlogo.com/logos/g/93/google.svg"
                alt="Google Pay"
                style={styles.logo}
              />
              <p style={styles.walletText}>Pay using Google Pay UPI</p>
            </div>
          )}

          {paymentMethod === "phonepe" && (
            <div style={styles.walletOption}>
              <img
                src="https://i.pinimg.com/736x/2a/cf/b6/2acfb6fb41f7fcb82c3230afdecff714.jpg"
                alt="PhonePe"
                style={styles.logo}
              />
              <p style={styles.walletText}>Pay using PhonePe UPI</p>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Pay Now
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
    marginBottom: "15px",
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
  button: {
    padding: "14px",
    backgroundColor: "#52c41a",
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
  radioGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  radioLabel: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  walletOption: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  logo: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
  walletText: {
    fontSize: "14px",
    color: "#333",
  },
  successBox: {
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#f6ffed",
    border: "1px solid #b7eb8f",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  successHeading: {
    fontSize: "24px",
    color: "#389e0d",
    marginBottom: "10px",
  },
  successText: {
    fontSize: "16px",
    color: "#333",
  },
  trackLink: {
    marginTop: "12px",
    display: "inline-block",
    color: "#1890ff",
    fontSize: "14px",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Payment;
