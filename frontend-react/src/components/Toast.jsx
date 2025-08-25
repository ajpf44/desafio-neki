import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Toast({ open, message, onClose, severity = "success" }) {
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		onClose();
	};

	const getBackgroundColor = () => {
		switch (severity) {
			case "error":
				return "#f44336";
			case "success":
			default:
				return "#4caf50";
		}
	};

	const getIcon = () => {
		switch (severity) {
			case "error":
				return null; // Let Material-UI use default error icon
			case "success":
			default:
				return <CheckCircleIcon />;
		}
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				variant="filled"
				icon={getIcon()}
				sx={{
					width: "100%",
					backgroundColor: getBackgroundColor(),
					color: "white",
					"& .MuiAlert-icon": {
						color: "white",
					},
					"& .MuiAlert-message": {
						color: "white",
					},
				}}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default Toast;
