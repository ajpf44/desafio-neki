import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";
import ColorModeSelect from "../theme/ColorModeSelect";
import { signup } from "../services/user";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: "auto",
	[theme.breakpoints.up("sm")]: {
		maxWidth: "450px",
	},
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

const Container = styled(Stack)(({ theme }) => ({
	height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
	minHeight: "100%",
	padding: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
	},
	"&::before": {
		content: '""',
		display: "block",
		position: "absolute",
		zIndex: -1,
		inset: 0,
		backgroundImage:
			"radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
		backgroundRepeat: "no-repeat",
		...theme.applyStyles("dark", {
			backgroundImage:
				"radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
		}),
	},
}));

function SignUpPage(props) {
	const [nameError, setNameError] = React.useState(false);
	const [nameErrorMessage, setNameErrorMessage] = React.useState("");
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
	const [confirmError, setConfirmError] = React.useState(false);
	const [confirmErrorMessage, setConfirmErrorMessage] = React.useState("");
	const [showToast, setShowToast] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!validateInputs()) {
			return;
		}

		setIsLoading(true);

		const data = new FormData(event.currentTarget);

		console.log({
			name: data.get("name"),
			email: data.get("email"),
			password: data.get("password"),
			confirmPassword: data.get("confirmPassword"),
		});

		try {
			const res = await signup(
				data.get("name"),
				data.get("email"),
				data.get("password")
			);

			if (res) {
				setShowToast(true);
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} else {
				setNameError(true);
				setNameErrorMessage("Erro ao criar conta.");
			}
		} catch (error) {
			setNameError(true);
			setNameErrorMessage("Erro ao criar conta.");
		} finally {
			setIsLoading(false);
		}
	};

	const validateInputs = () => {
		const name = document.getElementById("name");
		const email = document.getElementById("email");
		const password = document.getElementById("password");
		const confirmPassword = document.getElementById("confirmPassword");

		let isValid = true;

		if (!name.value || name.value.trim().length < 2) {
			setNameError(true);
			setNameErrorMessage("Informe seu nome.");
			isValid = false;
		} else {
			setNameError(false);
			setNameErrorMessage("");
		}

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage("Informe um email válido.");
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage("");
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage("A senha deve ter no mínimo 6 caracteres.");
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage("");
		}

		if (confirmPassword.value !== password.value) {
			setConfirmError(true);
			setConfirmErrorMessage("As senhas não coincidem.");
			isValid = false;
		} else if (!confirmPassword.value) {
			setConfirmError(true);
			setConfirmErrorMessage("Confirme sua senha.");
			isValid = false;
		} else {
			setConfirmError(false);
			setConfirmErrorMessage("");
		}

		return isValid;
	};

	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />
			<Container direction="column" justifyContent="space-between">
				<ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
				<Card variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
					>
						Criar conta
					</Typography>

					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="name">Nome</FormLabel>
							<TextField
								error={nameError}
								helperText={nameErrorMessage}
								id="name"
								name="name"
								placeholder="Seu nome"
								autoFocus
								required
								fullWidth
								variant="outlined"
								color={nameError ? "error" : "primary"}
							/>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<TextField
								error={emailError}
								helperText={emailErrorMessage}
								id="email"
								type="email"
								name="email"
								placeholder="fulano@email.com"
								autoComplete="email"
								required
								fullWidth
								variant="outlined"
								color={emailError ? "error" : "primary"}
							/>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="password">Senha</FormLabel>
							<TextField
								error={passwordError}
								helperText={passwordErrorMessage}
								name="password"
								placeholder="••••••"
								type="password"
								id="password"
								autoComplete="new-password"
								required
								fullWidth
								variant="outlined"
								color={passwordError ? "error" : "primary"}
							/>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="confirmPassword">
								Confirmar senha
							</FormLabel>
							<TextField
								error={confirmError}
								helperText={confirmErrorMessage}
								name="confirmPassword"
								placeholder="••••••"
								type="password"
								id="confirmPassword"
								autoComplete="new-password"
								required
								fullWidth
								variant="outlined"
								color={confirmError ? "error" : "primary"}
							/>
						</FormControl>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={validateInputs}
							disabled={isLoading}
							startIcon={
								isLoading ? (
									<CircularProgress size={20} color="inherit" />
								) : null
							}
						>
							{isLoading ? "Criando conta..." : "Cadastrar"}
						</Button>
					</Box>

					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<Typography sx={{ textAlign: "center" }}>
							Já tem uma conta?{" "}
							<Link
								href="/login"
								variant="body2"
								sx={{ alignSelf: "center" }}
							>
								Entrar
							</Link>
						</Typography>
					</Box>
				</Card>
			</Container>

			<Toast
				open={showToast}
				message="Conta criada com sucesso! Redirecionando para login..."
				onClose={() => setShowToast(false)}
			/>
		</AppTheme>
	);
}

export default SignUpPage;
