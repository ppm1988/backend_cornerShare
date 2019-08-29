const db = require('_helpers/db');
const CTemplate = db.CTemplate;

module.exports = {
    createTemplate,
    getAll,
    getAllActiveTemplates,
    getArchive,
    getById,
    update,
    delete: _delete
};

async function getAll () {
	if ( !CTemplate ) {
		return { message: 'No templates exists' };
	}

  // TO DO: GET ONLY SUMMARY
    return await CTemplate.find({type: 'post'}).select('-hash');
}

async function getById (id) {
	if ( !CTemplate ) {
		return { message: 'No templates exists' };
	}

  return await CTemplate.findById(id).select('-hash');
}

async function getArchive () {
	if ( !CTemplate ) {
		return { message: 'No templates exists' };
	}

  return await CTemplate.find({type: 'archive'}).select('-hash');
}

// TO DO: GET ONLY DATA TEMPLATES

async function getAllActiveTemplates () {
	if ( !CTemplate ) {
		return { message: 'No templates exists' };
	}

  return await CTemplate.find({ $nor: {type: 'archive'} }).select('-hash');
}

async function createTemplate (inpParam) {
	// validate
	if (await CTemplate.findOne({ name: inpParam.name })) {
			throw 'Template name "' + inpParam.name + '" is already taken';
	}

	const template = new CTemplate(inpParam);

	// save template
	await template.save();
}

async function update(id, inpParam) {
	if ( !CTemplate ) {
		return { message: 'No templates exists' };
	}

	const CTemplate = await CTemplate.findById(id);

	// validate
	if (!CTemplate) throw 'Template not found';
	if (CTemplate.name !== inpParam.name && await CTemplate.findOne({ name: inpParam.name })) {
			throw 'Template name "' + inpParam.name + '" is already taken';
	}

	// copy inpParam properties to CTemplate
	Object.assign(CTemplate, inpParam);

	await CTemplate.save();
}

async function _delete(id) {
	if ( !CTemplate ) {
		return { message: 'No templates exists' };
	}

  await CTemplate.findByIdAndRemove(id);
}