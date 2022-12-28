const petsSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        typeId: { type: "string" },
        breedId: { type: "string" },
        petName: { type: "string", "minLength": 2, "maxLength": 18 },
        adoptionStatus: { type: "string" },
        picture: { type: "string" },
        height: { type: "string" },
        weight: { type: "string" },
        color: { type: "string", "minLength": 3, "maxLength": 18 },
        petAge: { type: "string" },
        petBio: { type: "string", "minLength": 6, "maxLength": 120 }
    },
    required: ["typeId", "breedId", "adoptionStatus", "picture", "height", "weight", "color", "petBio", "petAge"],
    additionalProperties: false,
};

module.exports = { petsSchema }