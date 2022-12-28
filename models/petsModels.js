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

function readUserPetsModel(userId) {
    const allPets = readAllPetsModel();
    const selectedPets = allPets.filter((pet) => pet.userId === userId);
    return selectedPets;
}

function addPetsModel(newPet) {
    try {
        const allPets = readAllPetsModel();
        allPets.push(newPet);
        fs.writeFileSync(pathToPetsDb, JSON.stringify(allPets));
        return allPets;
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

function doesPetExistModel(typeId, breedId, petName, color, petBio) {
    const allPets = readAllPetsModel();
    const foundPet = allPets.find(pet => (
        pet.typeId === typeId &&
        pet.petName === petName &&
        pet.breedId === breedId &&
        pet.color === color &&
        pet.petBio === petBio
    )
    )
    console.log(foundPet)
    return foundPet
}

module.exports = { readAllPetsModel, readPetModel, addPetsModel, doesPetExistModel, readUserPetsModel, deletePetModel };