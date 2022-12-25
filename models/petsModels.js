const fs = require('fs');
const path = require('path');
const pathToPetsDb = path.resolve(__dirname, '../databases/petsDb.json');

function readAllPetsModel() {
    const allPets = fs.readFileSync(pathToPetsDb);
    return JSON.parse(allPets);
}

function readPetModel(petId) {
    const allPets = readAllPetsModel();
    const selectedPet = allPets.filter((pet) => pet.id === petId);
    console.log(selectedPet)
    return selectedPet;
}

function addPetsModel(newPet) {
    try {
        const allCounties = readAllPetsModel();
        allCounties.push(newPet);
        fs.writeFileSync(pathToPetsDb, JSON.stringify(allCounties));
        return allCounties;
    } catch (err) {
        console.log(err);
    }
}

// function updatePetModel(petId, updatedData) {
//     try {
//         const allPets = readAllPetsModel();
//         const updatedArray = allPets.filter((pet) => pet.id === petId);
//         fs.writeFileSync(pathToPetsDb, JSON.stringify(updatedArray));
//         return true;
//     } catch (err) {
//         console.log(err);
//     }
// }

function deletePetModel(petId) {
    try {
        const allPets = readAllPetsModel();
        const updatedArray = allPets.filter((pet) => pet.id !== petId);
        fs.writeFileSync(pathToPetsDb, JSON.stringify(updatedArray));
        return true;
    } catch (err) {
        console.log(err);
    }
}

function doesPetExistModel(petName) {
    const allPets = readAllPetsModel();
    const foundPet = allPets.find(pet => pet.name === petName)
    return foundPet
}

module.exports = { readAllPetsModel, readPetModel, addPetsModel, doesPetExistModel, deletePetModel };