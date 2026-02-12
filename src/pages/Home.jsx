import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    navigate(`/weather/${city}`);
  };

  const popularDestinations = ["Paris", "Tokyo", "New York", "London"];

  return (
    <div className="container">
      <motion.div
        className="hero glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginTop: '2rem', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '2rem' }}
      >
        <h2 style={{ fontSize: '3rem', margin: 0 }} className="text-gradient">
          Explore the World
        </h2>
        <p style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          Plan your next adventure with ease. Check weather, organize trips, and discover new places.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Where do you want to go?"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ width: '300px' }}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </motion.div>

      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Popular Destinations</h3>
        <div className="grid-auto">
          {popularDestinations.map((dest, i) => (
            <motion.div
              key={dest}
              className="glass-panel"
              whileHover={{ y: -5 }}
              style={{ padding: '1.5rem', cursor: 'pointer' }}
              onClick={() => navigate(`/weather/${dest}`)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 style={{ fontSize: '1.25rem' }}>{dest}</h4>
              <p style={{ color: 'var(--text-muted)' }}>Tap to explore</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
