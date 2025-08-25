import axios from "axios";
import defaultUrl from "./defaultUrl";

const url = defaultUrl + "/normalusers";

const login = async (email, password, saveLogin) => {
	const data = { email: email, password: password };
	try {
		const response = await axios.post(`${url}/login`, data);		
		localStorage.setItem("userId", response.data.id);

		if (saveLogin) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}

		return response.data;
	} catch (error) {
		return null;
	}
};

const signup = async (name, email, password) => {
	try {
		const data = {
			name: name,
			email: email,
			password: password,
		};
		const response = await axios.post(`${url}/signup`, data);
		return response.data;
	} catch (error) {
		return null;
	}
};

export { login, signup };
