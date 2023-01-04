const express = require('express');
const app = express();
// const morgan = require('morgan');
require('dotenv').config();

// const usersRoutes = require('./routes/usersRoutes')
const permissionsRoute = require('./routes/permissionsRoute')
const usersRoute = require('./routes/usersRoute')
const speciesRoute = require('./routes/speciesRoute')
const breedsRoute = require('./routes/breedsRoute')
const petsRoute = require('./routes/petsRoute')
const savedPetsRoute = require('./routes/savedPetsRoute')
const adoptionRequestsRoute = require('./routes/adoptionRequestsRoute')
const dietaryRestrictionsRoute = require('./routes/dietaryRestrictionsRoute')

const PORT = process.env.PORT || 8080;

const dbConnection = require('./knex/knex');

app.use(express.json());

app.use('/permissions', permissionsRoute);
app.use('/users', usersRoute);
app.use('/species', speciesRoute);
app.use('/breeds', breedsRoute);
app.use('/pets', petsRoute);
app.use('/savedPets', savedPetsRoute);
app.use('/adoptionRequests', adoptionRequestsRoute);
app.use('/dietaryRestrictions', dietaryRestrictionsRoute);

dbConnection.migrate.latest().then((migration) => {
    if (migration) {
        console.log('Connected to DB', migration);
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    }
});