const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser());
env.config();

// mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.etyta.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Database Connected');
  });

// user router
const userRouter  = require('./route/userRouter');
app.use('/api', userRouter);

// book slot game router
const bookGameSlotRouter = require('./route/gameSlotRoute');
app.use('/api', bookGameSlotRouter);

// server
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
