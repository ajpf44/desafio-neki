import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import AppTheme from "../theme/AppTheme";
import ColorModeSelect from "../theme/ColorModeSelect";
import { createEvent, editEvent, getEvents, deleteEvent } from "../services/events";
import Toast from "../components/Toast";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	maxWidth: "350px",
	margin: theme.spacing(1),
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

const Container = styled(Stack)(({ theme }) => ({
	minHeight: "100vh",
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

const AddButton = styled(Fab)(({ theme }) => ({
	position: "fixed",
	bottom: theme.spacing(3),
	right: theme.spacing(3),
	zIndex: 1000,
}));

function HomePage(props) {
	const [events, setEvents] = React.useState([]);

	React.useEffect(() => {
		const fetchEvents = async () => {
			const events = await getEvents();
			setEvents(events);
		};
		fetchEvents();
	}, []);

	const [openAddModal, setOpenAddModal] = React.useState(false);
	const [openEditModal, setOpenEditModal] = React.useState(false);
	const [editingEvent, setEditingEvent] = React.useState(null);
	const [newEvent, setNewEvent] = React.useState({
		title: "",
		date: "",
		location: "",
		img: "",
	});
	const [showToast, setShowToast] = React.useState(false);
	const [toastMessage, setToastMessage] = React.useState("");
	const [toastSeverity, setToastSeverity] = React.useState("success");

	const handleOpenAddModal = () => {
		setOpenAddModal(true);
	};

	const handleCloseAddModal = () => {
		setOpenAddModal(false);
		setNewEvent({ title: "", date: "", location: "", img: "" });
	};

	const showToastMessage = (message, severity = "success") => {
		setToastMessage(message);
		setToastSeverity(severity);
		setShowToast(true);
	};

	const handleOpenEditModal = (event) => {
		setEditingEvent(event);
		setOpenEditModal(true);
	};

	const handleCloseEditModal = () => {
		setOpenEditModal(false);
		setEditingEvent(null);
	};

	const handleAddEvent = async () => {
		if (newEvent.title && newEvent.date && newEvent.location) {
			const event = {
				id: Date.now(),
				...newEvent,
				img:
					newEvent.img ||
					"https://via.placeholder.com/300x200/95a5a6/ffffff?text=Evento",
			};
		}

		const resultCreateEvent = await createEvent(newEvent);
		if (resultCreateEvent) {
			setEvents([...events, resultCreateEvent]);
			handleCloseAddModal();
			showToastMessage("Evento criado com sucesso!", "success");
		} else {
			showToastMessage("Erro ao criar evento", "error");
		}
	};

	const handleEditEvent = async () => {
		if (
			editingEvent &&
			editingEvent.title &&
			editingEvent.date &&
			editingEvent.location
		) {
			const resultEditEvent = await editEvent(editingEvent);

			if (resultEditEvent) {
				setEvents(
					events.map((event) =>
						event.id === editingEvent.id ? editingEvent : event
					)
				);
				handleCloseEditModal();
				showToastMessage("Evento editado com sucesso!", "success");
			} else {
				showToastMessage("Erro ao editar evento", "error");
			}
		}
	};

	const handleDeleteEvent = async (eventId) => {
		const wasSuccess = await deleteEvent(eventId);

		if (wasSuccess) {
			showToastMessage("Evento deletado com sucesso!", "success");
			setEvents(events.filter((event) => event.id !== eventId));
		} else {
			showToastMessage("Erro ao deletar evento", "error");
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("pt-BR");
	};

	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />
			<Container direction="column">
				<ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

				<Typography
					component="h1"
					variant="h3"
					sx={{
						width: "100%",
						fontSize: "clamp(2rem, 10vw, 2.5rem)",
						textAlign: "center",
						mb: 4,
						mt: 2,
					}}
				>
					Eventos
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: 2,
						maxWidth: "1200px",
						mx: "auto",
					}}
				>
					{events.map((event) => (
						<Card key={event.id} variant="outlined">
							<CardMedia
								component="img"
								height="200"
								image={event.img}
								alt={event.title}
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography gutterBottom variant="h5" component="h2">
									{event.title}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 1 }}
								>
									📅 {formatDate(event.date)}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									📍 {event.location}
								</Typography>
							</CardContent>
							<CardActions
								sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
							>
								<IconButton
									size="small"
									color="primary"
									onClick={() => handleOpenEditModal(event)}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									size="small"
									color="error"
									onClick={() => handleDeleteEvent(event.id)}
								>
									<DeleteIcon />
								</IconButton>
							</CardActions>
						</Card>
					))}
				</Box>

				<AddButton color="primary" aria-label="add" onClick={handleOpenAddModal}>
					<AddIcon />
				</AddButton>

				{/* Add Event Modal */}
				<Dialog
					open={openAddModal}
					onClose={handleCloseAddModal}
					maxWidth="sm"
					fullWidth
				>
					<DialogTitle>Criar Novo Evento</DialogTitle>
					<DialogContent>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
								pt: 1,
							}}
						>
							<FormControl>
								<FormLabel htmlFor="title">Nome do Evento</FormLabel>
								<TextField
									id="title"
									value={newEvent.title}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											title: e.target.value,
										})
									}
									placeholder="Digite o nome do evento"
									fullWidth
									variant="outlined"
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="date">Data</FormLabel>
								<TextField
									id="date"
									type="date"
									value={newEvent.date}
									onChange={(e) =>
										setNewEvent({ ...newEvent, date: e.target.value })
									}
									fullWidth
									variant="outlined"
									required
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="location">Localização</FormLabel>
								<TextField
									id="location"
									value={newEvent.location}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											location: e.target.value,
										})
									}
									placeholder="Digite a localização"
									fullWidth
									variant="outlined"
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="image">
									Imagem do Evento (opcional)
								</FormLabel>
								<input
									accept="image/*"
									id="image"
									type="file"
									onChange={(e) => {
										const file = e.target.files[0];
										if (file) {
											const reader = new FileReader();
											reader.onload = (event) => {
												setNewEvent({
													...newEvent,
													img: event.target.result,
												});
											};
											reader.readAsDataURL(file);
										}
									}}
									style={{ display: "none" }}
								/>
								<label htmlFor="image">
									<Button
										variant="outlined"
										component="span"
										fullWidth
										sx={{
											height: "56px",
											border: "1px solid rgba(0, 0, 0, 0.23)",
											borderRadius: "4px",
											"&:hover": {
												border: "1px solid rgba(0, 0, 0, 0.87)",
											},
										}}
									>
										{newEvent.img
											? "Imagem selecionada"
											: "Selecionar imagem"}
									</Button>
								</label>
								{newEvent.img && (
									<Box sx={{ mt: 1, textAlign: "center" }}>
										<img
											src={newEvent.img}
											alt="Preview"
											style={{
												maxWidth: "100%",
												maxHeight: "100px",
												borderRadius: "4px",
											}}
										/>
									</Box>
								)}
							</FormControl>
						</Box>
					</DialogContent>
					<DialogActions sx={{ pb: 3, px: 3 }}>
						<Button onClick={handleCloseAddModal}>Cancelar</Button>
						<Button variant="contained" onClick={handleAddEvent}>
							Salvar
						</Button>
					</DialogActions>
				</Dialog>

				{/* Edit Event Modal */}
				<Dialog
					open={openEditModal}
					onClose={handleCloseEditModal}
					maxWidth="sm"
					fullWidth
				>
					<DialogTitle>Editar Evento</DialogTitle>
					<DialogContent>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
								pt: 1,
							}}
						>
							<FormControl>
								<FormLabel htmlFor="edit-title">Nome do Evento</FormLabel>
								<TextField
									id="edit-title"
									value={editingEvent?.title || ""}
									onChange={(e) =>
										setEditingEvent({
											...editingEvent,
											title: e.target.value,
										})
									}
									placeholder="Digite o nome do evento"
									fullWidth
									variant="outlined"
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="edit-date">Data</FormLabel>
								<TextField
									id="edit-date"
									type="date"
									value={editingEvent?.date || ""}
									onChange={(e) =>
										setEditingEvent({
											...editingEvent,
											date: e.target.value,
										})
									}
									fullWidth
									variant="outlined"
									required
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="edit-location">Localização</FormLabel>
								<TextField
									id="edit-location"
									value={editingEvent?.location || ""}
									onChange={(e) =>
										setEditingEvent({
											...editingEvent,
											location: e.target.value,
										})
									}
									placeholder="Digite a localização"
									fullWidth
									variant="outlined"
									required
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="edit-image">
									Imagem do Evento (opcional)
								</FormLabel>
								<input
									accept="image/*"
									id="edit-image"
									type="file"
									onChange={(e) => {
										const file = e.target.files[0];
										if (file) {
											const reader = new FileReader();
											reader.onload = (event) => {
												setEditingEvent({
													...editingEvent,
													img: event.target.result,
												});
											};
											reader.readAsDataURL(file);
										}
									}}
									style={{ display: "none" }}
								/>
								<label htmlFor="edit-image">
									<Button
										variant="outlined"
										component="span"
										fullWidth
										sx={{
											height: "56px",
											border: "1px solid rgba(0, 0, 0, 0.23)",
											borderRadius: "4px",
											"&:hover": {
												border: "1px solid rgba(0, 0, 0, 0.87)",
											},
										}}
									>
										{editingEvent?.img
											? "Imagem selecionada"
											: "Selecionar imagem"}
									</Button>
								</label>
								{editingEvent?.img && (
									<Box sx={{ mt: 1, textAlign: "center" }}>
										<img
											src={editingEvent.img}
											alt="Preview"
											style={{
												maxWidth: "100%",
												maxHeight: "100px",
												borderRadius: "4px",
											}}
										/>
									</Box>
								)}
							</FormControl>
						</Box>
					</DialogContent>
					<DialogActions sx={{ pb: 3, px: 3 }}>
						<Button onClick={handleCloseEditModal}>Cancelar</Button>
						<Button variant="contained" onClick={handleEditEvent}>
							Salvar
						</Button>
					</DialogActions>
				</Dialog>
			</Container>

			<Toast
				open={showToast}
				message={toastMessage}
				severity={toastSeverity}
				onClose={() => setShowToast(false)}
			/>
		</AppTheme>
	);
}

export default HomePage;
