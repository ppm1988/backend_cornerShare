// const config = require('config.json');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const CTemplate = db.CTemplate;

module.exports = {
    createTemplate,
    getAll,
    getAllTemplates,
    getArchive,
    getById,
    update,
    delete: _delete
};

async function getAll () {
  // TO DO: GET ONLY SUMMARY
    return await CTemplate.find().select('-hash');
}

async function getById (id) {
    return await CTemplate.findById(id).select('-hash');
}

async function getArchive () {
  return await CTemplate.find({type: 'archive'}).select('-hash');
}

// TO DO: GET ONLY DATA TEMPLATES

async function getAllTemplates () {
  return await CTemplate.find({ $nor: {type: 'archive'} }).select('-hash');
}

async function createTemplate (inpParam) {
    // validate
    if (await CTemplate.findOne({ name: inpParam.name })) {
        throw 'Template name "' + inpParam.name + '" is already taken';
    }

    const CTemplate = new CTemplate(inpParam);

    // // hash password
    // if (inpParam.password) {
    //     CTemplate.hash = bcrypt.hashSync(inpParam.password, 10);
    // }

    // save template
    await CTemplate.save();
}

async function update(id, inpParam) {
    const CTemplate = await CTemplate.findById(id);

    // validate
    if (!CTemplate) throw 'Template not found';
    if (CTemplate.name !== inpParam.name && await CTemplate.findOne({ name: inpParam.name })) {
        throw 'Template name "' + inpParam.name + '" is already taken';
    }

    // // hash password if it was entered
    // if (inpParam.password) {
    //     inpParam.hash = bcrypt.hashSync(inpParam.password, 10);
    // }

    // copy inpParam properties to CTemplate
    Object.assign(CTemplate, inpParam);

    await CTemplate.save();
}

async function _delete(id) {
    await CTemplate.findByIdAndRemove(id);
}