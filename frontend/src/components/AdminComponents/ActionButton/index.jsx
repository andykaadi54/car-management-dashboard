import { Button } from "react-bootstrap";
import PropTypes from "prop-types"; //

const ActionButton = ({ variant, icon, text, onClick }) => (
  <Button
    variant={variant}
    style={{
      backgroundColor: variant === "success" ? "green" : "white",
      color: variant === "success" ? "white" : "red",
      border: variant === "outline-danger" ? "1px solid red" : "none",
      display: "flex",
      alignItems: "center",
    }}
    onClick={onClick}
  >
    {icon}
    {text}
  </Button>
);

ActionButton.propTypes = {
  variant: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
