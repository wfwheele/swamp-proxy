const express = require('express');
const app = express();
const fetch = require('node-fetch');

function proxy(req) {
	const headers = req.headers;
	headers.host = 'httpbin.org';
	const res = {
		headers: {}
	};
	console.log('path', req.path);
	console.log('query', req.query);
	return fetch('http://httpbin.org/get', {
		method: req.method,
		headers: headers
	}).then(response => {
		console.log('got reponse');
		res.status = response.status;
		response.headers.forEach((value, name) => {
			res.headers[name] = value;
		});
		return response.text();
	}).then(bodyText => {
		console.log('got text', bodyText);
		res.body = bodyText;
		return res;
	});
}

function start(options) {

	app.all('*', function (req, res) {
		setTimeout(function () {
			proxy(req, options.target).then(proxyRes => {
				res.set(proxyRes.headers);
				res.status(proxyRes.status);
				res.send(proxyRes.body);
			}).catch(e => {
				console.error('error', e);
			});
		}, options.delay);
	});

	app.listen(9999, function () {
		console.log('swamping it up');
	});
}

module.exports = {
	start: start
};