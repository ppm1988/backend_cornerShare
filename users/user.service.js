const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const CUser = db.CUser;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate ({ username, password }) {
    const userData = await CUser.findOne({ username });
    if (userData && bcrypt.compareSync(password, userData.hash)) {
        const { hash, ...userWithoutHash } = userData.toObject();
        const token = jwt.sign({ sub: userData.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll () {
    return await CUser.find().select('-hash');
}

async function getById (id) {
    return await CUser.findById(id).select('-hash');
}

async function create (inpParam) {
    // validate
    if (await CUser.findOne({ username: inpParam.username })) {
        throw 'Username "' + inpParam.username + '" is already taken';
    }

    const newUser = new CUser(inpParam);

    // hash password
    if (inpParam.password) {
        newUser.hash = bcrypt.hashSync(inpParam.password, 10);
    }

    // save user
    await newUser.save();
}

async function update(id, inpParam) {
    const userData = await CUser.findById(id);

    // validate
    if (!userData) throw 'User not found';
    if (userData.username !== inpParam.username && await CUser.findOne({ username: inpParam.username })) {
        throw 'Username "' + inpParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (inpParam.password) {
        inpParam.hash = bcrypt.hashSync(inpParam.password, 10);
    }

    // copy inpParam properties to user
    Object.assign(userData, inpParam);

    await userData.save();
}

async function _delete(id) {
    await CUser.findByIdAndRemove(id);
}