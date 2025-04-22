import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";


const TrackOrder = () => {
  const [routeCoords, setRouteCoords] = useState([]);

  const pickup = [13.024971649081763, 77.76129041102412]; // red rhino
  const delivery = [13.017320178056604, 77.7680021208343]; // home

  const deliveryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
    iconAnchor: [17, 34],
  });
  const pickupIcon = new L.Icon({
    iconUrl: "https://c8.alamy.com/comp/2E8Y63T/delivery-man-motorbike-logo-icon-scooter-bike-vector-icon-express-free-delivery-2E8Y63T.jpg",
    iconSize: [35, 35],
    iconAnchor: [17, 34],
  });

  useEffect(() => {
    const fetchRoute = async () => {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${pickup[1]},${pickup[0]};${delivery[1]},${delivery[0]}?overview=full&geometries=geojson`
      );
      const data = await res.json();
      const coords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
      setRouteCoords(coords);
    };

    fetchRoute();
  }, []);

  // Inline Styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      padding: "1.5rem",
      maxWidth: "1000px",
      margin: "auto",
      fontFamily: "'Segoe UI', sans-serif",
    },
    statusBox: {
      background: "#fff",
      padding: "1rem 1.5rem",
      borderRadius: "1rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    timeline: {
      display: "flex",
      justifyContent: "space-between",
      margin: "1rem 0",
      position: "relative",
    },
    status: (active) => ({
      flex: 1,
      textAlign: "center",
      position: "relative",
      color: active ? "#0aa357" : "#888",
      fontWeight: active ? "bold" : "normal",
    }),
    line: (active) => ({
      content: "''",
      position: "absolute",
      height: "4px",
      width: "100%",
      top: "50%",
      left: "-50%",
      backgroundColor: active ? "#0aa357" : "#ccc",
      zIndex: -1,
    }),
    mapBox: {
      height: "400px",
      width: "100%",
      borderRadius: "1rem",
      overflow: "hidden",
    },
    deliveryInfo: {
      marginTop: "0.5rem",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.statusBox}>
        <h2>Tracking Your Order</h2>

        <div style={styles.timeline}>
          {["🛒 Order Placed", "👨‍🍳 Preparing", "🏍️ On the Way", "📦 Delivered"].map((label, i) => {
            const active = i < 3; // simulate active progress
            return (
              <div key={i} style={styles.status(active)}>
                {i !== 0 && <div style={styles.line(active)} />}
                {label}
              </div>
            );
          })}
        </div>

        <div style={styles.deliveryInfo}>
          <p><strong>Delivery Partner:</strong> Rahul (2 km away)</p>
          <p><strong>ETA:</strong> 12 minutes</p>
          <Link to="/">
  <button>back to home</button>
</Link>
        </div>
      </div>

      <div style={styles.mapBox}>
        <MapContainer center={pickup} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pickup} icon={pickupIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
          <Marker position={delivery} icon={deliveryIcon}>
            <Popup>Delivery Location</Popup>
          </Marker>
          <Polyline positions={routeCoords} color="green" />
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackOrder;
