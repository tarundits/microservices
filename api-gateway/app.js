const express = require('express');
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// define routes and their ports
const routes = {
	"/api/users": "http://localhost:3000",
	"/api/products": "http://localhost:3001"
}

// create a proxy for each route
for(const route in routes) {
	const target = routes[route];
	app.use(route, createProxyMiddleware({ target }));
}

const  PORT = 8000;

app.listen(PORT, () => {
	console.log('API gateway started.');
});