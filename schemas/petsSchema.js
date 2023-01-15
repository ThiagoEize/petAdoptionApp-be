const petsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        userId: {
            type: "integer",
            nullable: true
        },
        breedId: { type: "integer" },
        petName: { type: "string", minLength: 3, maxLength: 18 },
        adoptionStatus: {
            type: "string",
            enum: ["Adopted", "Fostered", "Available"]
        },
        picture: { type: "string" },
        petAge: { type: "number" },
        height: { type: "number" },
        weight: { type: "number" },
        color: { type: "string" },
        petBio: { type: "string", minLength: 6, maxLength: 1000 },
        dateCreated: { type: "string" }
    },
    required: ["breedId", "petName", "adoptionStatus", "picture", "petAge", "height", "weight", "color", "petBio"],
    additionalProperties: false
};

module.exports = { petsSchema };