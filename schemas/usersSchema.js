const usersSchema = {
    type: "object",
    properties: {
        permissionId: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
        userName: { type: "string" },
        userLastName: { type: "string" },
        phoneNumber: { type: "string" },
        userBio: { type: "string" },
        dateCreated: { type: "string" }
    },
    required: ["permissionId", "email", "password", "userName", "userLastName", "phoneNumber", "userBio"],
    additionalProperties: false
};

module.exports = { usersSchema };