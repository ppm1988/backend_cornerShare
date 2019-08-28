const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'post' }, // { post, data }
    columns: { type : { } },
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    showGroup: { type: [String], default: ['public'] } // { self, public, admin }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CTemplates', schema);