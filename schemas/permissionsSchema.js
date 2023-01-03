const permissionsSchema = {
    type: "object",
    properties: {
        permissionName: { type: "string" },
        canEditCreateAdmins: { type: "boolean" },
        canEditUsersPermissions: { type: "boolean" },
        canAcceptAdoptionRequests: { type: "boolean" },
        canAdoptFosterPets: { type: "boolean" },
        canAdoptPets: { type: "boolean" },
        dateCreated: { type: "string", format: "date-time" }
    },
    required: ["permissionName", "canEditCreateAdmins", "canEditUsersPermissions", "canAcceptAdoptionRequests", "canAdoptFosterPets", "canAdoptPets"],
    additionalProperties: false
};

module.exports = { permissionsSchema };