import { createApp } from "vue";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"; // FastAPI backend

axios.interceptors.response.use(undefined, function (error) {
	if (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
		}
	}
});

createApp(App).use(store).use(router).mount("#app");
