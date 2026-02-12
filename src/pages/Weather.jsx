import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { motion } from "framer-motion";

const apiKey = "b0e971a11c49d34635335b80e54a75a2";

export default function Weather() {
  const { city } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== "200") return setError("City not found");
        setData(data);
      })
      .catch(() => setError("Failed to fetch weather data"));
  }, [city]);

  useEffect(() => {
    if (!data || !mapRef.current) return;

    const lat = data.city.coord.lat;
    const lon = data.city.coord.lon;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current).setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup(data.city.name)
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [data]);

  const saveTrip = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setToast(true); // Re-using toast is okay for now, ideally show specific error
      setTimeout(() => setToast(false), 2000);
      return;
    }

    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    // Check if trip already exists
    const exists = trips.some(t => t.city === city);

    if (!exists) {
      trips.push({
        city,
        startDate,
        endDate
      });

      localStorage.setItem("trips", JSON.stringify(trips));
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } else {
      // Optional: Notify user it's already there
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    }
  };

  if (error) return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2 className="text-gradient">Oops!</h2>
      <p>{error}</p>
    </div>
  );

  if (!data) return <Loader />;

  return (
    <div className="container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2.5rem' }}>{data.city.name}, {data.city.country}</h2>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Start Date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>End Date</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </label>
          </div>
          <button
            onClick={saveTrip}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          >
            + Add to Plan
          </button>
        </div>
      </div>

      <div className="grid-auto" style={{ marginBottom: '3rem' }}>
        {data.list.slice(0, 5).map((item, i) => (
          <motion.div
            className="glass-panel"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ padding: '1.5rem', textAlign: 'center' }}
          >
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              style={{ width: '60px', height: '60px' }}
            />
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{Math.round(item.main.temp)}°C</h3>
            <p style={{ textTransform: 'capitalize', color: 'var(--text-muted)' }}>
              {item.weather[0].description}
            </p>
          </motion.div>
        ))}
      </div>

      <div
        id="map"
        ref={mapRef}
        className="glass-panel"
        style={{ height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
      ></div>

      {toast && <Toast message="Trip saved to your plan!" />}
    </div>
  );
}
