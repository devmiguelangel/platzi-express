const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res, next) => res.send({'hello': 'World!!!'}));

const server = app.listen(port, () => {
  console.log(`Listening: http://127.0.0.1:${server.address().port}`);
});
