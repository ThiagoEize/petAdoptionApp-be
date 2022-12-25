const express = require('express');
const fs = require('fs');
const app = express();
// const morgan = require('morgan');

const { petsSchema } = require('./schemas/petsSchema');

// const usersRoutes = require('./routes/usersRoutes')
const petsRoutes = require('./routes/petsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/users', usersRoutes);
// app.use('/user', usersRoutes);
app.use('/pets', petsRoutes);

app.listen(PORT, () => {
    console.log('App is Listening');
});
