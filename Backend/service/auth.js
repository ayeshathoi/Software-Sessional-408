const bcryptjs = require('bcryptjs');
const repository = require('../Repository/user')

const login = async (username, password) => {
    const user = await repository.GET_USER_DETAIL(username);

    if (!user.username)
        throw '404 : user not found'
    if (await bcryptjs.compare(password, user.password))
        return user
    else
        throw '401 : Auth Error'
}

module.exports = {
    login
}