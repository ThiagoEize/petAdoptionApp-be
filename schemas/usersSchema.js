const usersSchema = {
    type: 'object',
    properties: {
        permissionId: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        userName: { type: 'string', "minLength": 3, "maxLength": 18 },
        lastName: { type: 'string', "minLength": 3, "maxLength": 18 },
        phoneNumber: { type: 'string', "minLength": 7, "maxLength": 12 },
        bio: { type: 'string', "minLength": 6, "maxLength": 60 }
    },
    required: ['permissionId', 'email', 'password', 'userName', 'lastName', 'phoneNumber', 'bio'],
    additionalProperties: false,
};

module.exports = { usersSchema }