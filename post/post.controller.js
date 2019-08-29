const express = require('express');
const router = express.Router();
const postService = require('./post.service');

// routes
router.post('/create', createPost);
router.get('/', getAll);
router.get('/all', getAllPosts);
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
    postService.getAllActiveSummary()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getAllPosts (req, res, next) {
    postService.getAllActive()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getArchive (req, res, next) {
    postService.getArchive(req.user.sub)
        .then(post => post ? res.json(post) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById (req, res, next) {
    postService.getById(req.params.id)
        .then(post => post ? res.json(post) : res.sendStatus(404))
        .catch(err => next(err));
}

function update (req, res, next) {
    postService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete (req, res, next) {
    postService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}