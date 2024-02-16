const Comment = require('../models/Comment');

exports.create = (text) => Comment.create(text);