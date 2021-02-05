const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const {userRouter} = require('./router');
const port = 2000;

app.use(bodyParser());
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>Express API</h1>');
});

app.use('/users', userRouter);

app.listen(port, () => console.log(`API active at port ${port}`));