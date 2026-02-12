import { motion } from "framer-motion";

export default function TripCard({ trip, onDelete, index = 0 }) {
    return (
        <motion.div
            className="neo-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-card)' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{trip.city}</h3>
                    {trip.startDate && trip.endDate && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                    )}
                </div>
                <span style={{ fontSize: '1.5rem' }}>✈️</span>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <button
                    onClick={() => onDelete(trip)}
                    className="btn btn-danger"
                    style={{ width: '100%', padding: '0.5rem' }}
                >
                    Remove
                </button>
            </div>
        </motion.div>
    );
}
