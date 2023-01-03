const dietaryRestrictionsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        petId: { type: "integer" },
        adoptionRequestMessage: { type: "string" },
        requestStatus: { type: "string" },

        dateCreated: { type: "string", format: "date-time" }
    },
    required: ["userId", "petId", "requestStatus"],
    additionalProperties: false
};

module.exports = { dietaryRestrictionsSchema };