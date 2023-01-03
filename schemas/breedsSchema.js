const breedsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        specieId: { type: "integer" },
        breedName: { type: "string" },
        isHypoallergenic: { type: "boolean" },
        dateCreated: { type: "string", format: "date-time" }
    },
    required: ["specieId", "breedName", "isHypoallergenic"],
    additionalProperties: false
};

module.exports = { breedsSchema };