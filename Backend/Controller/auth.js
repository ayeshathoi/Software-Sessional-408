const bcryptjs = require('bcryptjs')
const user = require('../Repository/user')
const HttpStatus = require('./HTTPStatus')
const jwt = require("jsonwebtoken");
const { USER_TYPE_USER } = require('../Repository/constants');
const { validateEmail, validateUsername } = require('../Util/validation');
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, errorInfo, OK, FORBIDDEN } = require('./HTTPStatus');

//const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'i-do-not-care-what-the-key-is'
const JWT_SECRET_KEY =  'i-do-not-care-what-the-key-is'

const generate = (payload, expiresIn = '120h') => (
    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn})
)

const login = async (req, res) => {
    
    const {username, password} = req.body
    console.log(password)

    if (!username || !password) {
        res.status(HttpStatus.BAD_REQUEST).send(HttpStatus.errorInfo('Blank Username / Password'))
        return
    }

    const [user_data] = await user.GET_USER_DETAIL(username)
    
    if (!user_data)
        res.status(HttpStatus.NOT_FOUND).send(HttpStatus.errorInfo('User not found'))
    else if (!bcryptjs.compareSync(password, user_data.hashed_password))
        res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.errorInfo('Incorrect Password'))
}

const register = async (req, res) => {
    const {username, email, password, mobile_no, dob, gender} = req.body

    if (!validateEmail(email)) {
        res.status(BAD_REQUEST).json(errorInfo('Invalid Email Address'))
        return
    }

    if (!validateUsername(username)) {
        res.status(BAD_REQUEST).json(errorInfo('Username must be in lower case, greater than 4 characters, with a-z 0-9 _ only, starting with a-z'))
        return
    }

    if (!(await user.usernameAvailable(username))) {
        res.status(BAD_REQUEST).json(errorInfo('Username already in use'))
        return
    }

    if (!(await user.emailAvailable(email))) {
        res.status(BAD_REQUEST).json(errorInfo('Email already in use, try signing in'))
        return
    }

    try {
        const hashed_password = bcryptjs.hashSync(password)
        await user.create_user(username,email,hashed_password,mobile_no,dob,gender)
        res.status(CREATED).json(errorInfo('User Created'))
    } catch (e) {
        res.status(INTERNAL_SERVER_ERROR).json('Error executing query', e)
    }
}

const changePassword = async (req, res) => {
    const {oldPassword, password} = req.body

    if (! req.user) {
        res.status(FORBIDDEN).json(errorInfo('Sign In First!'))
        return
    }

    if (!password) {
        res.status(HttpStatus.BAD_REQUEST).send(HttpStatus.errorInfo('Blank Password'))
        return
    }

    const username = req.user.username

    const [user_data] = await user.GET_USER_DETAIL(username)
    if (!user_data)
        res.status(HttpStatus.NOT_FOUND).send(HttpStatus.errorInfo('User not found'))
    else if (!bcryptjs.compareSync(oldPassword, user_data.hashed_password))
        res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.errorInfo('Incorrect Password'))

    else {
        const hashed_password = bcryptjs.hashSync(password)
        await user.updatePassword(username, hashed_password)
        res.status(OK).json(HttpStatus.errorInfo('Updated!'))
    }
}

module.exports = { login, register, changePassword}