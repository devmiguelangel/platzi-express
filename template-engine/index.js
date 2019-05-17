const express = require("express");
const app = express();
const expressJsx = require('./express-jsx');

app.engine('jsx', expressJsx);
app.set('views', './views');
app.set('view engine', 'jsx');

app.get("/", (req, res, next) => {
  res.render('index', { hello: "Hola", world: 'mundo!!!' });
});

const server = app.listen(3000, () => {
  console.log(`Listening: http://127.0.0.1:${server.address().port}`)
});
