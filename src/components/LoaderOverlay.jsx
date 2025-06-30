import { Spinner } from "react-bootstrap";

const LoaderOverlay = ({ show }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        animation="border"
        style={{ width: 70, height: 70, color: "#ff8800" }}
        variant="warning"
      />
    </div>
  );
};

export default LoaderOverlay;
