const usersSchema = {
    type: "object",
    properties: {
        permissionId: {
            type: "integer",
            nullable: true
        },
        email: { type: "string" },
        password: { type: "string" },
        repassword: { type: "string" },
        userName: { type: "string" },
        userLastName: { type: "string" },
        phoneNumber: { type: "string" },
        userBio: { type: "string" },
        dateCreated: { type: "string" }
    },
    required: ["email", "password", "userName", "userLastName", "phoneNumber", "userBio"],
    additionalProperties: false
};

module.exports = { usersSchema };