const express = require('express');
const router = express.Router();
const templateService = require('./template.service');

// routes
router.post('/create', createTemplate);
router.get('/', getAll);
router.get('/all', getAllActiveTemplates);
router.get('/archive', getArchive);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createTemplate (req, res, next) {
    templateService.createTemplate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll (req, res, next) {
    // all public templates - only summary
    templateService.getAll()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getAllActiveTemplates (req, res, next) {
    templateService.getAllActiveTemplates()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function getArchive (req, res, next) {
    templateService.getArchive(req.user.sub)
        .then(templateData => templateData ? res.json(templateData) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById (req, res, next) {
    if ( req.params && req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        templateService.getById(req.params.id)
            .then(templateData => templateData ? res.json(templateData) : res.sendStatus(404))
            .catch(err => next(err));
    } else {
        res.sendStatus(404);
    }
}

function update (req, res, next) {
    templateService.update(req.params.id, req.body)
        .then((successRes) => res.json(successRes))
        .catch(err => next(err));
}

function _delete (req, res, next) {
    templateService.delete(req.params.id)
        .then(successRes => res.json(successRes))
        .catch(err => next(err));
}