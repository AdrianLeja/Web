export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem',
            marginTop: 'auto',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-color)'
        }}>
            <div className="container">
                <p>&copy; {year} TravelPlan. Built for explorers.</p>
            </div>
        </footer>
    );
}
