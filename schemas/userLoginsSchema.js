const userLoginsSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" }
    },
    required: ["email", "password"],
    additionalProperties: false
};

module.exports = { userLoginsSchema };