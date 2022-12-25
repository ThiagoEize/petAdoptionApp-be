// const { addPetModel, readAllPetsModel, deletePetModel } = require('../models/petsModels');
const { addPetsModel, readAllPetsModel, readPetModel, deletePetModel } = require('../models/petsModels');
const { v4: uuidv4 } = require('uuid');

const getPets = (req, res) => {
    try {
        // const {
        //     user, type, breed, name, adoptionStatus,
        //     minHeight, maxHeight, minWeight,
        //     maxWeight, color, minAge, maxAge
        // } = req.query;
        let where;

        function isNumeric(num) {
            return !isNaN(num)
        }

        for (const key in req.query) {
            where = where + req.query[key] && where ? 'where' : ' and';
            if (isNumeric(req.query[key])) {
                where += ` ${key} like '${req.query[key]}'`;
            } else {
                where += ` ${key} = '%${req.query[key]}%'`;
            }
        }

        const allPets = readAllPetsModel();
        res.send(allPets);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getPet = (req, res) => {
    try {
        const { petId } = req.params;
        const pet = readPetModel(petId);
        res.send(pet);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const addPet = (req, res) => {
    try {
        const newPet = {
            ...req.body,
            id: uuidv4(),
            date: new Date(),
        };
        const petAdded = addPetsModel(newPet);
        if (petAdded) {
            res.send(newPet);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// const updatePet = (req, res) => {
//     try {
//         const { petId } = req.params;
//         const petUpdated = addPetsModel(petId, ...req.body);
//         if (petUpdated) {
//             res.send(...req.body);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }

function deletePet(req, res) {
    const { petId } = req.params;
    const deleted = deletePetModel(petId);
    if (deleted) {
        res.send({ ok: true, deletedId: petId });
    }
}

module.exports = { addPet, getPets, getPet, deletePet }