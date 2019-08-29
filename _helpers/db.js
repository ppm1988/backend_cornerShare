const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    CUser: require('../users/user.model'),
    CPost: require('../post/post.model'),
    CTemplate: require('../template/template.model')
};