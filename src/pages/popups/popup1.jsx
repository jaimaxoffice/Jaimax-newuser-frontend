// popup1.jsx (PriceRiseAlertStyle1)
import React from 'react';

const PriceRiseAlertStyle1 = ({ data, onClose, imageUrl }) => {

  return (
    <div className="popup-overlay" style={styles.overlay}>
      <div className="popup-container" style={styles.container}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        <div className="popup-content">
          <img src={imageUrl} alt={data.title || "Promotion"} style={styles.image} />
        
        </div>
      </div>
    </div>
  );
};
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    borderRadius: '4px',
    marginBottom: '15px'
  },
  title: {
    fontSize: '22px',
    marginBottom: '10px',
    color: '#333'
  },
  description: {
    fontSize: '16px',
    marginBottom: '15px',
    color: '#666'
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#4a90e2',
    color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default PriceRiseAlertStyle1;