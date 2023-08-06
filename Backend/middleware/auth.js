const { errorInfo } = require("../Controller/HTTPStatus");
const HttpStatus = require("../Controller/HTTPStatus");
const jwt = require('jsonwebtoken');
const constant = require("../Repository/constants");

const JWT_SECRET_KEY = 'i-do-not-care-what-the-key-is'

const addUserToRequest = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(HttpStatus.UNAUTHORIZED).json(errorInfo(`Invalid 'authorization' Token`, err));
            } else {
                req.user = user;
                next()
            }
        });
    } else {
        next()
    }
};

module.exports = {addUserToRequest}