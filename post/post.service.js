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
  if ( !CPost ) {
    return { message: 'No new posts exists' };
  }

  // TO DO: GET ONLY SUMMARY
  return await CPost.find({ type: 'post' }).select('-hash');
}

async function getById (id) {
  if ( !CPost ) {
    return { message: 'No posts exists' };
  }

  return await CPost.findById(id).select('-hash');
}

async function getArchive () {
  if ( !CPost ) {
    return { message: 'No posts exists' };
  }

  return await CPost.find({type: 'archive'}).select('-hash');
}

async function getDataPost () {
  if ( !CPost ) {
    return { message: 'No posts exists' };
  }

  return await CPost.find({type: 'data'}).select('-hash');
}

async function getAllActivePosts () {
  if ( !CPost ) {
    return { message: 'No posts exists' };
  }

  return await CPost.find({$nor: {type: 'archive'} }).select('-hash');
}

async function createPost (inpParam) {
  const CPost = new CPost(inpParam);

  // save post
  await CPost.save();
}

async function update(id, inpParam) {
  if ( !CPost ) {
    return { message: 'No posts exists' };
  }

  const CPost = await CPost.findById(id);

  // copy inpParam properties to CPost
  Object.assign(CPost, inpParam);

  await CPost.save();
  return { message: 'Post save successful' };
}

async function _delete(id) {
  if ( !CPost ) {
    return { message: 'No posts exists' };
  }

  await CPost.findByIdAndRemove(id);
  return { message: 'Post delete successful' };
}