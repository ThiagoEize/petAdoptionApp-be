const DietaryRestrictionsModel = require('../models/dietaryRestrictionsModel');

const getDietaryRestrictions = async (req, res) => {
    try {
        const query = req.query;
        const allDietaryRestrictions = await DietaryRestrictionsModel.readAllDietaryRestrictionsModel(query);

        res.send({
            success: true,
            data: allDietaryRestrictions
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getDietaryRestriction = async (req, res) => {
    try {
        const { dietaryRestrictionId } = req.params;
        const dietaryRestriction = await DietaryRestrictionsModel.readDietaryRestrictionModel(dietaryRestrictionId);

        res.send({
            success: true,
            data: dietaryRestriction
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const addDietaryRestriction = async (req, res) => {
    try {
        const newDietaryRestriction = req.body;
        const dietaryRestrictionAdded = await DietaryRestrictionsModel.addDietaryRestrictionModel(newDietaryRestriction);
        if (dietaryRestrictionAdded) {
            res.send({
                success: true,
                data: dietaryRestrictionAdded
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const editDietaryRestriction = async (req, res) => {
    try {
        const updatedDietaryRestriction = req.body;
        const updated = await DietaryRestrictionsModel.editDietaryRestrictionModel(req.params.dietaryRestrictionId, updatedDietaryRestriction);

        res.send({
            success: true,
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteDietaryRestriction(req, res) {
    const { dietaryRestrictionId } = req.params;
    const deleted = await DietaryRestrictionsModel.deleteDietaryRestrictionModel(dietaryRestrictionId);
    if (deleted) {
        res.send({ ok: true, deletedId: dietaryRestrictionId });
    }
}

module.exports = { addDietaryRestriction, getDietaryRestrictions, getDietaryRestriction, editDietaryRestriction, deleteDietaryRestriction }