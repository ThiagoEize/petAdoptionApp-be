const expenseSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        description: { type: 'string' },
        cost: { type: 'number' },
        dateCreated: { type: 'string' },
    },
    required: ['description', 'cost'],
    additionalProperties: false,
};

module.exports = { expenseSchema };