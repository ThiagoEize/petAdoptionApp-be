const usersSchema = {
    type: "object",
    properties: {
        permissionId: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        userName: { type: "string", minLength: 3, maxLength: 18 },
        userLastName: { type: "string", minLength: 3, maxLength: 18 },
        phoneNumber: { type: "string", minLength: 7, maxLength: 12 },
        userBio: { type: "string", minLength: 6, maxLength: 60 }
    },
    required: ["permissionId", "email", "password", "userName", "userLastName", "phoneNumber", "userBio"],
    additionalProperties: false,
};

module.exports = { usersSchema }