import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TripCard from "../components/TripCard";
import { Link } from "react-router-dom";

export default function Plan() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(stored);
  }, []);

  const removeTrip = (tripToRemove) => {
    const updated = trips.filter((t) => t.city !== tripToRemove.city);
    setTrips(updated);
    localStorage.setItem("trips", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem' }}>My Trips <span className="text-muted" style={{ fontSize: '1rem' }}>({trips.length})</span></h2>
        <Link to="/" className="btn btn-primary">
          + Add Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No trips planned yet.</p>
          <Link to="/" className="btn btn-secondary">Find a destination</Link>
        </div>
      ) : (
        <div className="grid-auto">
          {trips.map((trip, i) => (
            <TripCard key={i} trip={trip} onDelete={removeTrip} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
