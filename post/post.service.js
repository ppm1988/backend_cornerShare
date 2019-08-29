const db = require('_helpers/db');
const CPost = db.CPost;

module.exports = {
    createPost,
    getAll,
    getAllActivePosts,
    getArchive,
    getDataPost,
    getById,
    update,
    delete: _delete
};

async function getAll () {
  // TO DO: GET ONLY SUMMARY
    return await CPost.find({ type: 'post' }).select('-hash');
}

async function getById (id) {
    return await CPost.findById(id).select('-hash');
}

async function getArchive () {
  return await CPost.find({type: 'archive'}).select('-hash');
}

async function getDataPost () {
  return await CPost.find({type: 'data'}).select('-hash');
}

async function getAllActivePosts () {
  return await CPost.find({$nor: {type: 'archive'} }).select('-hash');
}

async function createPost (inpParam) {
    const CPost = new CPost(inpParam);

    // save post
    await CPost.save();
}

async function update(id, inpParam) {
    const CPost = await CPost.findById(id);

    // copy inpParam properties to CPost
    Object.assign(CPost, inpParam);

    await CPost.save();
}

async function _delete(id) {
    await CPost.findByIdAndRemove(id);
}