import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		meta: {
			title: "Home",
		},
		component: Home,
	},
	{
		path: "/addnote",
		name: "AddNote",
		meta: {
			title: "New Note",
		},
		component: () => import("../views/AddNote.vue"),
	},
	{
		path: "/public",
		name: "Public",
		meta: {
			title: "Public",
		},
		component: () => import("../views/Public.vue"),
	},
	{
		path: "/login",
		name: "Login",
		meta: {
			title: "Login",
		},
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/user/:username",
		name: "User",
		meta: {
			title: "User",
		},
		component: () => import("../views/User.vue"),
	},
	{
		path: "/note/:id",
		name: "Note",
		meta: {
			title: "Note",
		},
		component: () => import("../views/Note.vue"),
	},
	{
		path: "/settings",
		name: "Settings",
		meta: {
			title: "Settings",
		},
		component: () => import("../views/Settings.vue"),
	},
	{
		path: "/ChangePassword",
		name: "ChangePassword",
		meta: {
			title: "Change Password",
		},
		component: () => import("../views/ChangePassword.vue"),
	},
	{
		path: "/DeleteAccount",
		name: "DeleteAccount",
		meta: {
			title: "Delete Account",
		},
		component: () => import("../views/DeleteAccount.vue"),
	},
	{
		path: "/about",
		name: "About",
		meta: {
			title: "About",
		},
		component: () => import("../views/About.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("../views/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.title == "User") {
		document.title = `Neat - ${to.params.username} Notes`;
	} else {
		document.title = `Neat - ${to.meta.title}`;
	}
	next();
});

export default router;
