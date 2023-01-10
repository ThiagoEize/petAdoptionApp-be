const Ajv = require('ajv');
const ajv = new Ajv();
const jwt = require('jsonwebtoken');

function validateBody(schema) {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send(ajv.errors[0].message);
            return;
        }
        next();
    };
}

const auth = (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        res.status(401).send('Authorization headers required');
        return;
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // console.log(res)
            res.status(401).send('Unauthorized');
            return;
        }

        if (decoded) {
            // req.body.userId = decoded.id;
            // console.log('testGlobalMid');
            next();
        }
    });
};

// const auth = (req, res, next) => {
//     if (!req.cookies.token) {
//         res.status(401).send('Must have access token')
//         return
//     }

//     jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             res.status(401).send('Unauthorized');
//             return;
//         }

//         if (decoded) {
//             req.body.userId = decoded.id;
//             next();
//             return
//         }
//     });
// };

module.exports = { validateBody, auth };