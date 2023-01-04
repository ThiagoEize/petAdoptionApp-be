const adoptionRequestsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        petId: { type: "integer" },
        adoptionRequestMessage: { type: "string" },
        requestStatus: { type: "string" },

        dateCreated: { type: "string" }
    },
    required: ["userId", "petId", "requestStatus"],
    additionalProperties: false
};

module.exports = { adoptionRequestsSchema };