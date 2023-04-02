const addressSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        addressLine1: { type: 'string' },
        addressLine2: { type: 'string' },
        city: { type: 'string' },
        stateProvince: { type: 'string' },
        postalCode: { type: 'string' },
        country: { type: 'string' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        dateCreated: { type: 'string' },
    },
    required: ['addressLine1', 'city', 'stateProvince', 'postalCode', 'country', 'latitude', 'longitude'],
    additionalProperties: false,
};

module.exports = { addressSchema };