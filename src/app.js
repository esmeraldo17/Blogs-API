const express = require('express');

// ...

const routes = require('./route');

const app = express();

app.use(express.json());
app.use(routes.userRoute);
app.use(routes.categoriesRoute);
app.use(routes.postRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
