import React, { ReactNode, MouseEvent } from "react";
import { Button } from "react-bootstrap";

interface ActionButtonProps {
  variant: "success" | "outline-danger";
  icon: ReactNode;
  text: string;
  onClick?: (event: MouseEvent) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	variant,
	icon,
	text,
	onClick,
}) => (
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

export default ActionButton;
