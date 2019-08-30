const express = require('express');
const router = express.Router();
const postService = require('./post.service');

// routes
router.post('/create', createPost);
router.get('/', getAll);
router.get('/all', getAllActivePosts);
router.get('/archive', getArchive);
router.get('/data', getDataPost);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createPost (req, res, next) {
    postService.createPost(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll (req, res, next) {
    // all public posts - only summary

    postService.getAll()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getAllActivePosts (req, res, next) {
    postService.getAllActivePosts()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getDataPost (req, res, next) {
    postService.getDataPost()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getArchive (req, res, next) {
    postService.getArchive(req.user.sub)
        .then(post => post ? res.json(post) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById (req, res, next) {
    if ( req.params && req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        postService.getById(req.params.id)
            .then(post => post ? res.json(post) : res.sendStatus(404))
            .catch(err => next(err));
    } else {
        res.sendStatus(404);
    }
}

function update (req, res, next) {
    postService.update(req.params.id, req.body)
        .then(successRes => res.json(successRes))
        .catch(err => next(err));
}

function _delete (req, res, next) {
    postService.delete(req.params.id)
        .then(successRes => res.json(successRes))
        .catch(err => next(err));
}