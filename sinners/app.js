const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: './config/.env' });
}
app.use(errorMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);
app.use(express.static(path.join(__dirname, "../saints/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../saints/build/index.html"));
})
module.exports = app;