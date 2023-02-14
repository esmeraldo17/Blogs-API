const express = require('express');

// ...

const routes = require('./route');

const app = express();

app.use(express.json());
app.use(routes.userRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
