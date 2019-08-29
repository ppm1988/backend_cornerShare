const express = require('express');
const router = express.Router();
const templateService = require('./user.service');

// routes
router.post('/create', createTemplate);
router.get('/', getAll);
router.get('/all', getAllActiveTemplates);
router.get('/archive', getArchive);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// function authenticate(req, res, next) {
//     postService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

function createTemplate (req, res, next) {
    postService.createTemplate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll (req, res, next) {
    // all public templates - only summary
    postService.getAll()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getAllActiveTemplates (req, res, next) {
    postService.getAllActiveTemplates()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getArchive (req, res, next) {
    postService.getArchive(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById (req, res, next) {
    postService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
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