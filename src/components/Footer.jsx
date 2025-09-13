// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Smriti — Powered by Open AI</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: 'auto',
    padding: '10px 20px',
    background: '#f5f5f5',
    textAlign: 'center',
    color: '#333',
    fontSize: '14px',
  }
};
