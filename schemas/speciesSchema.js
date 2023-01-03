const speciesSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        specieName: { type: "string" },
        dateCreated: { type: "string" }
    },
    required: ["specieName"],
    additionalProperties: false
};

module.exports = { speciesSchema };