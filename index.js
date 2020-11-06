const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dbURI = "mongodb://127.0.0.1:27017/microjobDB";
const app = express();


app.use(express.json());
app.use(cors({ 
  credentials: true,
  origin: true
}));

//Import router
const userRoutes = require('./routes/userRoutes/basicUserRoutes');

app.use('/user', userRoutes);


mongoose.connect(dbURI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true,})
    .then((result) => {
      console.log("connected to the database");
      app.listen(3001, () => console.log("server started"));
    })
    .catch((err) => console.log(`${err.message} ${err.code}`));



