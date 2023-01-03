const dietaryRestrictionsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        petId: { type: "integer" },
        adoptionRequestMessage: { type: "string" },
        dateCreated: { type: "string", format: "date-time" }
    },
    required: ["petId"],
    additionalProperties: false
};

module.exports = { dietaryRestrictionsSchema };