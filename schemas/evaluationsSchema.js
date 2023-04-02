const evaluationSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        adoptionHouseId: { type: 'integer' },
        userId: { type: 'integer' },
        score: { type: 'integer' },
        description: { type: 'string' },
        dateCreated: { type: 'string' },
    },
    required: ['adoptionHouseId', 'userId', 'score'],
    additionalProperties: false,
};

module.exports = { evaluationSchema };