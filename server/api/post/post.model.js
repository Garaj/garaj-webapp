'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  content: String,
  tags: Array,
  by: {
    type : Schema.ObjectId,
    ref: 'User'
  },
  created_at: Date
});

PostSchema.virtual('tagsString').get(function () {
  return this.tags.toString();
});

PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);