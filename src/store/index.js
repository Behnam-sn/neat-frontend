import { createStore } from "vuex";
import axios from "axios";

import router from "../router";

export default createStore({
	state: {
		isCollapse: false,
		theme: localStorage.theme,
		user: localStorage.user,
		token: localStorage.token,
		publicNotes: undefined,
		userNotes: undefined,
	},
	getters: {
		getTheme: (state) => state.theme,
		getCollapseStatus: (state) => state.isCollapse,
		getUser: (state) => state.user,
		getToken: (state) => state.token,
		getPublicNotes: (state) => state.publicNotes,
		getUserNotes: (state) => state.userNotes,
	},
	mutations: {
		initTheme(state) {
			localStorage.theme = "light";
			state.theme = "light";
		},
		changeTheme(state) {
			if (state.theme == "light") {
				localStorage.theme = "dark";
				state.theme = "dark";
				document.documentElement.classList.add("dark");
			} else {
				localStorage.theme = "light";
				state.theme = "light";
				document.documentElement.classList.remove("dark");
			}
		},
		collapse(state) {
			state.isCollapse = !state.isCollapse;
		},
		setUser(state, payload) {
			state.user = payload;
			localStorage.user = payload;
		},
		setToken(state, payload) {
			state.token = payload;
			localStorage.token = payload;
		},
		logout(state) {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			state.user = undefined;
			state.token = undefined;

			router.push("/");
		},
		setPublicNotes(state, payload) {
			state.publicNotes = payload;
		},
		setUserNotes(state, payload) {
			state.userNotes = payload;
		},
	},
	actions: {
		goBack() {
			window.history.length > 1 ? router.go(-1) : router.push("/");
		},
		login({ commit, dispatch }, payload) {
			const User = new FormData();
			User.append("username", payload.username);
			User.append("password", payload.password);

			axios
				.post("auth/login", User)
				.then((response) => {
					if (response.status == 200) {
						commit("setUser", payload.username);
						commit("setToken", response.data.access_token);
						dispatch("goBack");
						// router.push(`/u/${payload.username}`);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		signup({ dispatch }, payload) {
			const User = {
				username: payload.username,
				full_name: payload.fullname,
				password: payload.password,
			};

			axios
				.post("auth/signup", User)
				.then((response) => {
					if (response.status == 200) {
						dispatch("login", {
							username: payload.username,
							password: payload.password,
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		fetchPublicNotes({ commit }) {
			axios
				.get("notes/public-all")
				.then((response) => {
					commit("setPublicNotes", response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		fetchCurrentUserNotes({ state, commit }) {
			axios
				.get("notes/", {
					headers: {
						Authorization: "Bearer " + state.token,
					},
				})
				.then((response) => {
					commit("setUserNotes", response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		fetchPublicNotesByAuthor({ commit }, payload) {
			axios
				.get(`notes/public-author?author=${payload}`)
				.then((response) => {
					commit("setUserNotes", response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		createNote({ state }, payload) {
			const Note = {
				title: payload.title,
				content: payload.content,
				public: payload.public,
			};

			axios
				.post("notes/", Note, {
					headers: {
						Authorization: "Bearer " + state.token,
					},
				})
				.then((response) => {
					if (response.status == 200) {
						router.push(`/u/${state.user}`);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	modules: {},
});
