const connect = require("./db");
const express = require("express");
const app = express();
const port = 5000;

connect();
app.use(express.json());
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
