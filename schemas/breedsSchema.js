const breedsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        specieId: { type: "integer" },
        breedName: { type: "string" },
        isHypoallergenic: { type: "boolean" },
        dateCreated: { type: "string" }
    },
    required: ["specieId", "breedName"],
    additionalProperties: false
};

module.exports = { breedsSchema };