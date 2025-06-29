import React from "react";

const ApprovalDetailsModal = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px"
      }}>
        <h2>Approval Details Modal Placeholder</h2>
        <pre>{JSON.stringify(details, null, 2)}</pre>
        <button onClick={onClose} style={{ marginTop: "1rem" }}>Close</button>
      </div>
    </div>
  );
};

export default ApprovalDetailsModal;