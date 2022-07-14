import { createRouter, createWebHistory } from "vue-router";

// Define some routes
// Each route should map to a component.
const routes = [
  { path: "/", component: () => import("../views/brands") },
  { path: "/bookmarks", component: () => import("../views/bookmarks") },
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
