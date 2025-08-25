import axios from "axios";
import defaultUrl from "./defaultUrl";

const url = defaultUrl + "/events";

const getEvents = async () => {
	console.log("url: " + url);
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		// console.error(error);
		return [];
	}
};

const getEventsByUserId = async (userId) => {
	try {
		const response = await axios.get(`${url}/user/${userId}`);
		return response.data;
	} catch (error) {
		return [];
	}
};
const createEvent = async (event) => {
	const data = {
		title: event.title,
		date: event.date,
		location: event.location,
		img: event.img,
		userId: event.userId,
	};

	try {
		const response = await axios.post(`${url}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const editEvent = async (event) => {
	console.log(event);
	const data = {
		title: event.title,
		date: event.date,
		location: event.location,
		img: event.img,
		userId: event.userDto.id,
	};

	try {
		const response = await axios.patch(`${url}/${event.id}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const deleteEvent = async (eventId) => {
	try {
		const response = await axios.delete(`${url}/${eventId}`);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export { getEvents, createEvent, editEvent, getEventsByUserId, deleteEvent };
