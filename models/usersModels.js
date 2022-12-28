const fs = require('fs');
const path = require('path');
const pathToUsersDb = path.resolve(__dirname, '../databases/usersDb.json');

function readAllUsersModel() {
    const allUsers = fs.readFileSync(pathToUsersDb);
    return JSON.parse(allUsers);
}

function readUserModel(userId) {
    const allUsers = readAllUsersModel();
    const selectedUser = allUsers.filter((user) => user.id === userId);
    console.log(selectedUser)
    return selectedUser;
}

function addUsersModel(newUser) {
    try {
        const allCounties = readAllUsersModel();
        allCounties.push(newUser);
        fs.writeFileSync(pathToUsersDb, JSON.stringify(allCounties));
        return allCounties;
    } catch (err) {
        console.log(err);
    }
}

// function updateUserModel(userId, updatedData) {
//     try {
//         const allUsers = readAllUsersModel();
//         const updatedArray = allUsers.filter((user) => user.id === userId);
//         fs.writeFileSync(pathToUsersDb, JSON.stringify(updatedArray));
//         return true;
//     } catch (err) {
//         console.log(err);
//     }
// }

function deleteUserModel(userId) {
    try {
        const allUsers = readAllUsersModel();
        const updatedArray = allUsers.filter((user) => user.id !== userId);
        fs.writeFileSync(pathToUsersDb, JSON.stringify(updatedArray));
        return true;
    } catch (err) {
        console.log(err);
    }
}

function doesUserExistModel(userName, userLastName) {
    const allUsers = readAllUsersModel();
    const foundUser = allUsers.find(user => (user.userName === userName && user.userLastName === userLastName))
    return foundUser
}

module.exports = { readAllUsersModel, readUserModel, addUsersModel, doesUserExistModel, deleteUserModel };