const dietaryRestrictionsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        petId: { type: "integer" },
        foodName: { type: "string" },
        description: { type: "string" },
        dateCreated: { type: "string" }
    },
    required: ["petId", "foodName"],
    additionalProperties: false
};

module.exports = { dietaryRestrictionsSchema };