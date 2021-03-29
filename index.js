const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//const dbURI = "mongodb://127.0.0.1:27017/microjobDB";
const dbURI = "mongodb://nipun_aluthge:Mon45GH78e@cluster0-shard-00-00.mdvbb.mongodb.net:27017,cluster0-shard-00-01.mdvbb.mongodb.net:27017,cluster0-shard-00-02.mdvbb.mongodb.net:27017/microjobDB?ssl=true&replicaSet=atlas-o59h6q-shard-0&authSource=admin&retryWrites=true&w=majority"
const app = express();

app.use(express.json());
app.use(cors({ 
  credentials: true, 
  origin: true
}));
app.use(cookieParser());

//Import router
const userRoutes = require('./routes/userRoutes/basicUserRoutes');
const roleRoutes = require('./routes/roleRoutes/roleRoutes');
const permissionRoutes = require('./routes/roleRoutes/permissionRoutes');
const adminControlledUserRoutes = require('./routes/userRoutes/adminUserRoutes');
const categoryRoutes = require('./routes/categoryRoutes/categoryRoutes');
const timeCategory = require('./routes/categoryRoutes/TimeBaseCategoryRoutes')
//const { createAdmin } = require('./Controllers/roleControllers/roleController');

app.use('/user', userRoutes);
app.use('/adm_user', adminControlledUserRoutes);
app.use('/role', roleRoutes);
app.use('/permission', permissionRoutes);
app.use('/category', categoryRoutes);
app.use('/timecategory', timeCategory);


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



