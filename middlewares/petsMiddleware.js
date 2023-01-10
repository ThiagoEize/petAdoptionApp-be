const Ajv = require('ajv');
const ajv = new Ajv();
const PetsModel = require('../models/petsModel');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: "dzjdn4n89",
    api_key: "718314933888419",
    api_secret: "MlNYxS87GAZkJmNc-KBd3SRVX-w",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const isValidId = async (req, res, next) => {
    const { petId } = req.params;
    const pet = await PetsModel.readPetModel(petId);
    if (!pet) {
        res.status(400).send('There is existing pet selected');
        return;
    }
    next();
}

const isNewPet = async (req, res, next) => {
    const { petId } = req.params;
    const { petName, breedId, color, petBio } = req.body;
    const pet = await PetsModel.isNewPetModel(breedId, petName, color, petBio, petId);
    if (pet) {
        res.status(400).send('Pet already exists');
        return;
    }
    next();
};


module.exports = { isNewPet, isValidId, upload };