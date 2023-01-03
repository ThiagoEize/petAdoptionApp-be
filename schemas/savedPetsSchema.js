const savedPetsSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        petId: { type: "integer" },
        personalComentary: { type: "string" },
        dateCreated: { type: "string", format: "date-time" }
    },
    required: ["userId", "petId"],
    additionalProperties: false
};

module.exports = { savedPetsSchema };