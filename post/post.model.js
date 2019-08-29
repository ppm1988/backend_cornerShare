const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String, default: 'post' }, // { post, archive, data }
    templateName: { type: String, required: true },
    viewName: { type: String, required: true },
    description: { type: String },
    dateRange: { type: {
        from: { type: Date, required: true },
        till: { type: Date, required: true }
    }, required: true },
    values: { type: [ {} ], required: true },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    priority: { type: String, default: 'medium'}, // { top, high, medium, low }
    showGroup: { type: [String], default: ['public'] } // { self, public, admin }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CPost', schema);