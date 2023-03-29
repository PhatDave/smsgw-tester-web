const express = require('express');
const serveStatic = require('serve-static');

app = express();
console.log(`Using ${process.cwd()}/dist as the root directory for static files.`);
app.use(serveStatic(process.cwd() + "/dist"));
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
